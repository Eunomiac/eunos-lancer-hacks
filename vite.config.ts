// Importing necessary functions and types from the Vite package and the path module from Node.js
import {defineConfig, type Plugin, type UserConfig} from "vite";
import path from "path";
import fs from "fs";
import checker from "vite-plugin-checker";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import {visualizer} from "rollup-plugin-visualizer";
import commonjs from "@rollup/plugin-commonjs";
import {exec} from "child_process";

/** *** CHECK: *** https://vitejs.dev/guide/performance
 *
 * TypeScript: Enable:
 * - "moduleResolution": "bundler",
 * - "allowImportingTsExtensions": true
 * ... in your tsconfig.json's compilerOptions to use .ts and .tsx extensions directly in your code.
 * */

/**
 * Custom plugin to open Chrome with specific flags when the Vite server starts.
 */

function openChromePlugin(): Plugin {
  return {
    name: "open-chrome",
    apply: "serve", // Only apply this plugin during development
    configResolved(chromeConfig) {
      if (chromeConfig.command === "serve") {
        // Command to open the first Chrome instance
        const command1 = `start chrome --start-maximized --remote-debugging-port=9222 --auto-open-devtools-for-tabs --user-data-dir="D:/Projects/.CODING/FoundryVTT/ChromeDevProfile_1" http://localhost:${chromeConfig.server.port}`;
        exec(command1, (error) => {
          if (error) {
            console.error("Failed to open first Chrome instance:", error);
          }
        });

        // Command to open the second Chrome instance with a different profile
        const command2 = `start chrome --start-maximized --remote-debugging-port=9223 --auto-open-devtools-for-tabs --user-data-dir="D:/Projects/.CODING/FoundryVTT/ChromeDevProfile_2" http://localhost:${chromeConfig.server.port}`;
        exec(command2, (error) => {
          if (error) {
            console.error("Failed to open second Chrome instance:", error);
          }
        });
      }
    }
  };
}

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
        const regex = /--elh-([a-z]+-)+nums:\s*(\d+),\s*(\d+),\s*(\d+)\s*;/g;
        let match: RegExpExecArray | null;

        type brightness = "brightest"|"bright"|"normal"|"dark"|"darkest"|"black";
        const colorDefs: Record<string, Partial<Record<brightness, number[]>>> = {};

        while ((match = regex.exec(scssVariables)) !== null) {
          const varName: string = match[0]
            .split(":")[0].trim()
            .replace(/^--elh-/, "")
            .replace(/-nums$/, "")
            .replace(/-/g, "_");
          const [hue, brightness] = varName.split(/_/);
          const brightnessValue = brightness || "normal";
          colorDefs[hue] ??= {};
          colorDefs[hue][brightnessValue] = [parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10)];
        }

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
const config: UserConfig = defineConfig({
  // Setting the root directory for the project to the "src" folder
  root:      "src",
  // Setting the base URL for the project when deployed
  base:      "/modules/eunos-lancer-hacks/",
  // Specifying the directory where static assets are located
  publicDir: path.resolve(__dirname, "public"),
  // Configuration for the development server
  server:    {
    // Setting the port number for the development server
    port:  31001,
    // Automatically open the project in the browser when the server starts
    open:  false,
    // Configuring proxy rules for certain URLs
    proxy: {
      // Redirecting requests that do not start with "/eunos-lancer-hacks" to localhost:31000
      "^(?!/modules/eunos-lancer-hacks)": "http://localhost:31000/",
      // Special proxy configuration for WebSocket connections used by socket.io
      "/socket.io":                       {
        target: "ws://localhost:31000", // Target server for the proxy
        ws:     true // Enable WebSocket support
      }
    }
  },
  resolve: {
    // preserveSymlinks: true,
    alias: [
      {
        find: "gsap/all",
        replacement: "scripts/greensock/esm/all.js"
      },
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser"
      }
    ]
  },
  optimizeDeps: {
    exclude: ["machine-mind"], // machine-mind triggers https://github.com/evanw/esbuild/issues/1433
    include: ["lancer-data", "jszip", "axios", "readonly-proxy"] // machine-mind's cjs dependencies
  },
  // Configuration for the build process
  build: {
    // Directory where the build output will be placed
    outDir:       path.resolve(__dirname, "dist"),
    // Clear the output directory before building
    emptyOutDir:   true,
    // Generate source maps for the build
    sourcemap:     true,
    // Configuration for the Terser minifier
    minify: "terser",
    terserOptions: {
      mangle:          false, // Disable mangling of variable and function names
      keep_classnames: true, // Preserve class names
      keep_fnames:     true // Preserve function names
    },
    // Temporarily disable minification for output checking
    // minify: false,
    // Configuration for building a library
    lib: {
      name:     "eunos-lancer-hacks", // Name of the library
      entry:    path.resolve(__dirname, "src/ts/eunos-lancer-hacks.ts"), // Entry point for the library
      formats:  ["es"], // Output format(s) for the library
      fileName: "index" // Name for the output file(s)
    }
  },
  plugins: [
    commonjs(),
    svelte({configFile: "../svelte.config.cjs"}),

    foundryPlugin(),
    checker({typescript: true}),
    // scssVariablesToJsPlugin(),
    visualizer({
      gzipSize: true,
      template: "treemap"
    }),
    openChromePlugin()
  ]
});

// Exporting the configuration object to be used by Vite
export default config;
