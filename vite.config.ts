// Importing necessary functions and types from the Vite package and the path module from Node.js
import {defineConfig, type UserConfig, type Plugin} from "vite";
import path from "path";
import fs from "fs";
import checker from "vite-plugin-checker";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-plugin-tsconfig-paths";
import {visualizer} from "rollup-plugin-visualizer";
import commonjs from "@rollup/plugin-commonjs";

/** *** CHECK: *** https://vitejs.dev/guide/performance
 *
 * TypeScript: Enable:
 * - "moduleResolution": "bundler",
 * - "allowImportingTsExtensions": true
 * ... in your tsconfig.json's compilerOptions to use .ts and .tsx extensions directly in your code.
 * */

function scssVariablesToJsPlugin(): Plugin {
  return {
    name: "scss-variables-to-js",
    // This function will tell Vite that "virtual:colors" is a virtual module
    resolveId(source) {
      if (source === "virtual:colors") {
        return source; // Recognize "virtual:colors" as a module ID
      }
      return null; // Other imports are handled normally
    },
    // This function will load the content for our virtual module
    load(id) {
      if (id === "virtual:colors") {
        const filePath = "src/scss/core/_colors.scss"; // Path to your SCSS variables file
        // console.log(`Processing SCSS file: ${filePath}`);
        const scssVariables: string = fs.readFileSync(filePath, "utf-8");
        const regex = /--blades-([a-z]+-)+nums:\s*(\d+),\s*(\d+),\s*(\d+)\s*;/g;
        let match: RegExpExecArray | null;

        type brightness = "brightest"|"bright"|"normal"|"dark"|"darkest"|"black";
        const colorDefs: Record<string, Partial<Record<brightness, number[]>>> = {};

        while ((match = regex.exec(scssVariables)) !== null) {
          // console.log(`Found match: ${match[0]}`);
          const varName: string = match[0]
            .split(":")[0].trim()
            .replace(/^--blades-/, "")
            .replace(/-nums$/, "")
            .replace(/-/g, "_");
          // eslint-disable-next-line prefer-const
          let [hue, brightness] = varName.split(/_/);
          brightness ??= "normal";
          colorDefs[hue] ??= {};
          colorDefs[hue][brightness] = [parseInt(match[2]), parseInt(match[3]), parseInt(match[4])];
        }

        // if (jsVariables.length > 0) {
        //   console.log("Generated JS variables:\n", `export const ColorNums = ${JSON.stringify(colorDefs, null, 2)};`);
        // } else {
        //   console.log("No matching SCSS variables found.");
        // }

        return {
          code: `export const ColorNums = ${JSON.stringify(colorDefs, null, 2)};\n`,
          map:  null
        };
      }
      return null; // Other modules are loaded normally
    }
  };
}

function foundryPlugin(): Plugin {
  const usesFoundryPlugin = Symbol("foundry-plugin");

  return {
    name: "foundry-plugin",

    async resolveId(source) {
      if (source === "gsap/all") {
        return {
          id: "scripts/greensock/esm/all.js",

          // This is used to make sure that there's no later transformations during production.
          external: "absolute",

          meta: {
            [usesFoundryPlugin]: true
          }
        };
      }

      return null;
    },
    async load(id) {
      const moduleInfo = this.getModuleInfo(id);

      if (moduleInfo == null) {
        return null;
      }

      // During a production build since all of the Foundry imports are external it never even gets here, like one might expect.
      // However development doesn't completely understand external, see https://github.com/vitejs/vite/issues/6582
      if (usesFoundryPlugin in moduleInfo.meta) {
        // By default all imports (or in this case a re-export) will get recursively handled by Vite.
        // The tag `/* @vite-ignore */` is used to avoid an error when trying to resolve `id` again.
        return `export * from /* @vite-ignore */ ${JSON.stringify(id)};`;
      }

      return null;
    }
  };
}



// Defining the Vite configuration object with specific settings for this project
const config = defineConfig({
  // Setting the root directory for the project to the "src" folder
  root:      "src/",
  // Setting the base URL for the project when deployed
  base:      "/modules/eunos-lancer-hacks/",
  // Specifying the directory where static assets are located
  publicDir: path.resolve(__dirname, "public"),
  // Configuration for the development server
  server:    {
    // Setting the port number for the development server
    port:  30001,
    // Automatically open the project in the browser when the server starts
    open:  true,
    // Configuring proxy rules for certain URLs
    proxy: {
      // Redirecting requests that do not start with "/modules/eunos-lancer-hacks" to localhost:30000
      "^(?!/modules/eunos-lancer-hacks)": "http://localhost:30000/",
      // Special proxy configuration for WebSocket connections used by socket.io
      "/socket.io":                       {
        target: "ws://localhost:30000", // Target server for the proxy
        ws:     true // Enable WebSocket support
      }
    }
  },
  // Configuration for the build process
  build: {
    // Directory where the build output will be placed
    outDir:        path.resolve(__dirname, "dist"),
    // Clear the output directory before building
    emptyOutDir:   true,
    // Generate source maps for the build
    sourcemap:     true,
    // Configuration for the Terser minifier
    terserOptions: {
      mangle:          false, // Disable mangling of variable and function names
      keep_classnames: true, // Preserve class names
      keep_fnames:     true // Preserve function names
    },
    // Temporarily disable minification for output checking
    // minify: false,
    // Configuration for Rollup (used by Vite under the hood)
    // rollupOptions: {
    //   // Specify external modules that shouldn't be bundled
    //   external: ["gsap/all"]
    // },
    // Configuration for building a library
    lib: {
      name:     "eunos-lancer-hacks", // Name of the library
      entry:    path.resolve(__dirname, "src/ts/eunos-lancer-hacks.ts"), // Entry point for the library
      formats:  ["es"], // Output format(s) for the library
      fileName: "eunos-lancer-hacks" // Name for the output file(s)
    }
  },
  optimizeDeps: {
    exclude: ["machine-mind"], // machine-mind triggers https://github.com/evanw/esbuild/issues/1433
    include: ["lancer-data", "jszip", "axios", "readonly-proxy"] // machine-mind's cjs dependencies
  },
  resolve: {
    alias: {
      "gsap/all": "scripts/greensock/esm/all.js",
      "eunosTypes": path.resolve(__dirname, "src/ts/@types")
    }
  },
  plugins: [
    commonjs(),
    tsconfigPaths(), // Automatically resolves TS path aliases
    svelte({
      configFile: "../svelte.config.cjs"
    }),
    foundryPlugin(),
    checker({typescript: true}),
    visualizer({
      gzipSize: true,
      template: "treemap"
    })
    // scssVariablesToJsPlugin()
  ]
});

// Exporting the configuration object to be used by Vite
export default config;