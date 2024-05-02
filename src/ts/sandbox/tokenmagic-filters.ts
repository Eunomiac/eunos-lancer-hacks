/* eslint-disable no-multi-spaces, func-names */
// @ts-nocheck

globalThis.configDefaults = {
  // 'true' for player mechs and bosses
  isPrimary: false,
  // must be 'friendly', 'neutral', or 'hostile'
  disposition: "hostile",
  // defines the base colors for primary token outlines for each disposition
  dispositionColors: {
    friendly: 0x00FF00,
    neutral: 0xFFFF00,
    hostile: 0xFF0000
  },
  numShadows: 1,
  shadowRotation: 45,
  shadowDistance: 5,
  shadowColor: 0x000000,
  shadowAlpha: 0.8,
  // shadowKernels: null,
  shadowBlur: 2,
  shadowQuality: 3,
  primaryBrightness: 1,
  nonPrimaryBrightness: 0.75,
  outlinePulseTime: 1800,
  primaryOutlineThicknessRange: 2,
  nonPrimaryOutlineThicknessRange: 1
};

globalThis.TOKENMAGIC_CONFIGS = {
  get Hostile_Primary_Walker_Size3() {
    return {
      isPrimary: true,
      disposition: "hostile",
      shadowRotation: 140,
      shadowBlur: 5,
      shadowQuality: 5,
      shadowDistance: -40,
      shadowAlpha: 1,
      primaryBrightness: 1.25,
      primaryOutlineThicknessRange: 2
    };
  },
  get Hostile_Secondary_Walker_Size3() {
    return {
      ...this.Hostile_Primary_Walker_Size3,
      isPrimary: false,
      secondaryBrightness: 0.75,
      secondaryOutlineThicknessRange: 1
    };
  },
  get Hostile_Primary_Flying_Size3() {
    return {
      ...this.Hostile_Primary_Walker_Size3,
      shadowRotation: -90,
      shadowDistance: this.Hostile_Primary_Walker_Size3.shadowDistance * 2
    };
  },
  get Hostile_Secondary_Flying_Size3() {
    return {
      ...this.Hostile_Secondary_Walker_Size3,
      shadowRotation: -90,
      shadowDistance: this.Hostile_Secondary_Walker_Size3.shadowDistance * 2
    };
  },
  get Friendly_Primary_Walker_Size3() {
    return {
      ...this.Hostile_Primary_Walker_Size3,
      disposition: "friendly"
    };
  },
  get Friendly_Secondary_Walker_Size3() {
    return {
      ...this.Hostile_Secondary_Walker_Size3,
      disposition: "friendly"
    };
  },
  get Friendly_Primary_Flying_Size3() {
    return {
      ...this.Hostile_Primary_Flying_Size3,
      disposition: "friendly"
    };
  },
  get Friendly_Secondary_Flying_Size3() {
    return {
      ...this.Hostile_Secondary_Flying_Size3,
      disposition: "friendly"
    };
  },
  get Hostile_Primary_Walker_Size2() {
    return {
      ...this.Hostile_Primary_Walker_Size3,
      shadowDistance: -20
    };
  },
  get Hostile_Secondary_Walker_Size2() {
    return {
      ...this.Hostile_Secondary_Walker_Size3,
      shadowDistance: -20
    };
  },
  get Hostile_Primary_Flying_Size2() {
    return {
      ...this.Hostile_Primary_Walker_Size2,
      shadowRotation: -90,
      shadowDistance: this.Hostile_Primary_Walker_Size2.shadowDistance * 2
    };
  },
  get Hostile_Secondary_Flying_Size2() {
    return {
      ...this.Hostile_Secondary_Walker_Size2,
      shadowRotation: -90,
      shadowDistance: this.Hostile_Secondary_Walker_Size2.shadowDistance * 2
    };
  },
  get Friendly_Primary_Walker_Size2() {
    return {
      ...this.Hostile_Primary_Walker_Size2,
      disposition: "friendly"
    };
  },
  get Friendly_Secondary_Walker_Size2() {
    return {
      ...this.Hostile_Secondary_Walker_Size2,
      disposition: "friendly"
    };
  },
  get Friendly_Primary_Flying_Size2() {
    return {
      ...this.Hostile_Primary_Flying_Size2,
      disposition: "friendly"
    };
  },
  get Friendly_Secondary_Flying_Size2() {
    return {
      ...this.Hostile_Secondary_Flying_Size2,
      disposition: "friendly"
    };
  },
  get Hostile_Primary_Walker_Size1() {
    return {
      ...this.Hostile_Primary_Walker_Size2,
      shadowBlur: 3,
      shadowDistance: -10
    };
  },
  get Hostile_Secondary_Walker_Size1() {
    return {
      ...this.Hostile_Secondary_Walker_Size2,
      shadowBlur: 3,
      shadowDistance: -10
    };
  },
  get Hostile_Primary_Flying_Size1() {
    return {
      ...this.Hostile_Primary_Walker_Size1,
      shadowRotation: -90,
      shadowDistance: this.Hostile_Primary_Walker_Size1.shadowDistance * 6
    };
  },
  get Hostile_Secondary_Flying_Size1() {
    return {
      ...this.Hostile_Secondary_Walker_Size1,
      shadowRotation: -90,
      shadowDistance: this.Hostile_Secondary_Walker_Size1.shadowDistance * 6
    };
  },
  get Friendly_Primary_Walker_Size1() {
    return {
      ...this.Hostile_Primary_Walker_Size1,
      disposition: "friendly"
    };
  },
  get Friendly_Secondary_Walker_Size1() {
    return {
      ...this.Hostile_Secondary_Walker_Size1,
      disposition: "friendly"
    };
  },
  get Friendly_Primary_Flying_Size1() {
    return {
      ...this.Hostile_Primary_Flying_Size1,
      disposition: "friendly"
    };
  },
  get Friendly_Secondary_Flying_Size1() {
    return {
      ...this.Hostile_Secondary_Flying_Size1,
      disposition: "friendly"
    };
  }
};


globalThis.setConfig = function setConfig(disp, isPrimary, size, isFlying) {
  const configKey = (`${disp.slice(0,1).toUpperCase()}${disp.slice(1)}_${isPrimary ? "Primary" : "Secondary"}_${isFlying ? "Flying" : "Walker"}_Size${size}`);
  console.log(`Setting Config to Key: '${configKey}'`, TOKENMAGIC_CONFIGS[configKey]);
  globalThis.config = {
    ...globalThis.configDefaults,
    ...globalThis.TOKENMAGIC_CONFIGS[configKey]
  };
};

globalThis.changeBrightness = function changeBrightness(color, factor) {

  // Extract the RGB components from the hexadecimal color
  const red = (color >> 16) & 0xFF;
  const green = (color >> 8) & 0xFF;
  const blue = color & 0xFF;

  // Calculate the new RGB values
  const newRed = Math.min(Math.round(red * factor), 255);
  const newGreen = Math.min(Math.round(green * factor), 255);
  const newBlue = Math.min(Math.round(blue * factor), 255);

  // Calculate the maximum value among the new RGB values
  const maxColor = Math.max(newRed, newGreen, newBlue);

  // Calculate the scaling factor to maintain proportionality
  const scalingFactor = maxColor / 255;

  // Scale the RGB values based on the scaling factor
  const scaledRed = Math.round(newRed / scalingFactor);
  const scaledGreen = Math.round(newGreen / scalingFactor);
  const scaledBlue = Math.round(newBlue / scalingFactor);

  // Combine the scaled RGB values back into a single hexadecimal value
  return (scaledRed << 16) | (scaledGreen << 8) | scaledBlue;
};

globalThis.buildShadowFilter = function buildShadowFilter(index = 0) {
  const id = `dropShadow${index}`;
  const shadowFilter = {
    filterType: "shadow",
    filterId: id,
    quality: config.shadowQuality,
    shadowOnly: false,
    // kernels: config.shadowKernels,
    color: config.shadowColor,
    padding: 100,
    zOrder: 6000,
    rotation: Array.isArray(config.shadowRotation)
      ? config.shadowRotation[index]
      : config.shadowRotation,
    blur: Array.isArray(config.shadowBlur)
      ? config.shadowBlur[index]
      : config.shadowBlur,
    distance: Array.isArray(config.shadowDistance)
      ? config.shadowDistance[index]
      : config.shadowDistance,
    alpha: Array.isArray(config.shadowAlpha)
      ? config.shadowAlpha[index]
      : config.shadowAlpha
  };
  console.log(`[Shadow Filter] ID: ${shadowFilter.filterId}`, shadowFilter);
  return shadowFilter;
};

globalThis.buildOutlineFilter = function buildOutlineFilter() {
  const baseColor = config.dispositionColors[config.disposition];
  const outlineThicknessRange = config.isPrimary
    ? [config.primaryOutlineThicknessRange].flat()
    : [config.nonPrimaryOutlineThicknessRange].flat();
  const brightnessMultiplier = config.isPrimary
    ? config.primaryBrightness
    : config.nonPrimaryBrightness;
  const filterParams = {
    filterType: "outline",
    filterId: "dispositionOutline",
    padding: 100,
    color: changeBrightness(baseColor, brightnessMultiplier),
    thickness: outlineThicknessRange[0],
    quality: 1,
    zOrder: 9
  };
  if (outlineThicknessRange.length > 1) {
    filterParams.animated = {
      thickness: {
        active: true,
        loopDuration: config.outlinePulseTime,
        animType: "syncCosOscillation",
        val1: outlineThicknessRange[0],
        val2: outlineThicknessRange[1]
      }
    };
  }
  console.log(`[Outline Filter] ID: ${filterParams.filterId}`, filterParams);
  return filterParams;
};

globalThis.applyFilters = (disp = "hostile", isPrimary = false, size = 1, isFlying = false) => {
  setConfig(disp, isPrimary, size, isFlying);
  // Delete pre-applied filters on the selected tokens/tiles
  Promise.all([
    TokenMagic.deleteFiltersOnSelected("dropShadow"),
    TokenMagic.deleteFiltersOnSelected("dropShadow0"),
    TokenMagic.deleteFiltersOnSelected("dropShadow1"),
    TokenMagic.deleteFiltersOnSelected("dropShadow2"),
    TokenMagic.deleteFiltersOnSelected("dropShadow3"),
    TokenMagic.deleteFiltersOnSelected("dispositionOutline")
  ]);
  setTimeout(() => {
    // Apply the new filters on the selected tokens/tiles
    TokenMagic.addUpdateFiltersOnSelected([
      buildOutlineFilter(),
      ...Array(config.numShadows).fill(0).map((_, i) => buildShadowFilter(i))
    ]);
  }, 1000);
};


const TOKENMAGIC_MACROS = {
  "[Outline] Enemy Basic": () => {

    const config = {
      isPrimary: false, // 'true' for player mechs and bosses
      disposition: "hostile", // must be 'friendly', 'neutral', or 'hostile'
      dispositionColors: { // defines the base colors for primary token outlines for each disposition
        friendly: 0x00FF00,
        neutral: 0xFFFF00,
        hostile: 0xFF0000
      },
      /* 0.5 */         dispositionDimming: 0.75,   // the multiple applied to brightness of outlines for non-primary tokens ('1' to disable)
      /* 2 */           numShadows:         2,      // describes the number of shadows that will be generated
      /* 100 */         shadowRotation:     [100],  // can be either a number or an array of numbers (applies to shadow rotation)
      /* [15, 2] */     shadowBlur:         [15],   // can be either a number or an array of numbers (applies to shadow blur)
      /* [-140, -40] */ shadowDistance:     [100],  // can be either a number or an array of numbers (applies to shadow distance)
      /* 0.8 */         shadowAlpha:        [0.8],  // can be either a number or an array of numbers (applies to shadow alpha)
      /* 1800 */        outlinePulseTime:   1800,   // only applies to primary tokens
      /* [1, 2] */      outlinePulseRange:  [1, 2] // defines the min and max thickness values for the outline pulse
    };

    const {disposition, dispositionColors, dispositionDimming, isPrimary, outlinePulseTime, numShadows, shadowRotation, shadowBlur, shadowDistance, shadowAlpha} = config;
    const baseColor = dispositionColors[disposition];

    /**
     * Changes the brightness of a given color.
     * @param color - The hexadecimal color value.
     * @param factor - The brightness factor to apply. Default is 0.75.
     * @returns The new color value after applying the brightness factor.
     */
    function changeBrightness(color, factor = dispositionDimming) {
      // Extract the RGB components from the hexadecimal color
      const red = (color >> 16) & 0xFF;
      const green = (color >> 8) & 0xFF;
      const blue = color & 0xFF;

      // Calculate the new RGB values
      const newRed = Math.min(Math.round(red * factor), 255);
      const newGreen = Math.min(Math.round(green * factor), 255);
      const newBlue = Math.min(Math.round(blue * factor), 255);

      // Calculate the maximum value among the new RGB values
      const maxColor = Math.max(newRed, newGreen, newBlue);

      // Calculate the scaling factor to maintain proportionality
      const scalingFactor = maxColor / 255;

      // Scale the RGB values based on the scaling factor
      const scaledRed = Math.round(newRed / scalingFactor);
      const scaledGreen = Math.round(newGreen / scalingFactor);
      const scaledBlue = Math.round(newBlue / scalingFactor);

      // Combine the scaled RGB values back into a single hexadecimal value
      return (scaledRed << 16) | (scaledGreen << 8) | scaledBlue;
    }

    /**
     * Builds a shadow filter object based on the provided index.
     * If index is not provided, it defaults to 0.
     * @param {number} index - The index used to retrieve the corresponding values for shadow rotation, blur, distance, and alpha.
     * @returns {object} - The shadow filter object.
     */
    function buildShadowFilter(index = 0) {
      const id = `dropShadow${index}`;
      const shadowFilter = {
        filterType: "shadow",
        filterId: id,
        quality: 1,
        shadowOnly: false,
        color: 0,
        padding: 100,
        zOrder: 6000,
        rotation: Array.isArray(shadowRotation)
          ? shadowRotation[index]
          : shadowRotation,
        blur: Array.isArray(shadowBlur)
          ? shadowBlur[index]
          : shadowBlur,
        distance: Array.isArray(shadowDistance)
          ? shadowDistance[index]
          : shadowDistance,
        alpha: Array.isArray(shadowAlpha)
          ? shadowAlpha[index]
          : shadowAlpha
      };

      return shadowFilter;
    }

    function buildOutlineFilter() {
      return {
        filterType: "outline",
        filterId: "dispositionOutline",
        padding: 100,
        color: isPrimary ? baseColor : changeBrightness(baseColor),
        thickness: isPrimary ? 2 : 1,
        quality: 1,
        zOrder: 9,
        animated: {
          thickness: {
            active: isPrimary,
            loopDuration: outlinePulseTime,
            animType: "syncCosOscillation",
            val1: 1,
            val2: 2
          }
        }
      };
    }

    // Apply the filters to the selected tokens/tiles asynchronously
    (async () => {
      // Delete pre-applied filters on the selected tokens/tiles
      await Promise.all([
        TokenMagic.deleteFiltersOnSelected("dropShadow0"),
        TokenMagic.deleteFiltersOnSelected("dropShadow1"),
        TokenMagic.deleteFiltersOnSelected("dropShadow2"),
        TokenMagic.deleteFiltersOnSelected("dropShadow3"),
        TokenMagic.deleteFiltersOnSelected("dispositionOutline")
      ]);
      // Apply the new filters on the selected tokens/tiles
      await TokenMagic.addUpdateFiltersOnSelected([
        buildOutlineFilter(),
        ...Array(config.numShadows).fill(0).map((_, i) => buildShadowFilter(i))
      ]);
    })();

  }
};