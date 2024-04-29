/* For a permanent tooltip to analyze in the DOM, prepare this command in the console:

$(".token-tooltip-alt-tooltip-container").clone().appendTo("body")

... then hover over a tooltip and press enter. */
const TTA_CONFIG = {
  gmSettings: {
    default: {
      items: [
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff2828"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#2964c2",
        tokenDispositions: [
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    },
    pilot: {
      items: [
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff2828"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#ffb400",
        tokenDispositions: [
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    },
    npc: {
      items: [
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "return data.mm._classes[0].Name;",
              icon: "cci cci-npc-class",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 2 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn data.mm._templates[2].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn \"\";\n} else if (data.stress.max > 1 || data.structure.max > 1) {\n\treturn \" \";\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "return data.mm._classes[0].Name;",
              icon: "cci cci-npc-class",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 2 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn data.mm._templates[2].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn \"\";\n} else if (data.stress.max > 1 || data.structure.max > 1) {\n\treturn \" \";\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "return data.mm._classes[0].Name;",
              icon: "cci cci-npc-class",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff0000"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff2828"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 2 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn data.mm._templates[2].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn \"\";\n} else if (data.stress.max > 1 || data.structure.max > 1) {\n\treturn \" \";\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#b31414",
        tokenDispositions: [
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    },
    deployable: {
      items: [
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "if (data.overshield.value > 0) {\n\treturn data.overshield.value;\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-shield-star-outline",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "if (data.overshield.value == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "if (data.mm.Burn > 0) {\n\treturn data.mm.Burn;\n}\nreturn \"\";",
              icon: "cci cci-burn",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            },
            {
              value: "if (data.mm.Burn == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bfbfbf"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "if (data.overshield.value > 0) {\n\treturn data.overshield.value;\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-shield-star-outline",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "if (data.overshield.value == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm.Burn > 0) {\n\treturn data.mm.Burn;\n}\nreturn \"\";",
              icon: "cci cci-burn",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            },
            {
              value: "if (data.mm.Burn == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bfbfbf"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "if (data.overshield.value > 0) {\n\treturn data.overshield.value;\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-shield-star-outline",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "if (data.overshield.value == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm.Burn > 0) {\n\treturn data.mm.Burn;\n}\nreturn \"\";",
              icon: "cci cci-burn",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            },
            {
              value: "if (data.mm.Burn == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#cccccc",
        tokenDispositions: [
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    },
    mech: {
      items: [
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "return data.mm.Loadout.Frame.Name || \" \";",
              icon: "cci cci-frame",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "return data.mm.Pilot.Callsign || \" \";",
              icon: "cci cci-pilot",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffb400"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.mm.CurrentCoreEnergy) {\n\treturn \"\";\n} else {\n\treturn \"CORE\";\n}",
              icon: "mdi mdi-battery-10",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#999999"
            },
            {
              value: "if (data.mm.CurrentCoreEnergy) {\n\treturn \"CORE\";\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-battery",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#219900"
            },
            {
              value: "repairs",
              icon: "cci cci-repair",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#c60101"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff2828"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#2964c2",
        tokenDispositions: [
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    }
  },
  playerSettings: {
    default: {
      items: [
        {
          disposition: "OWNED",
          items: [
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "return \" \";",
              icon: "mdi mdi-circle-small",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\ntooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\ntooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#2964c2",
        tokenDispositions: [
          "OWNED",
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    },
    pilot: {
      items: [
        {
          disposition: "OWNED",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "?",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#ff4646"
            },
            {
              value: "?",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "?",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "?",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "?",
              icon: "cci cci-edef",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#2964c2",
        tokenDispositions: [
          "OWNED",
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    },
    npc: {
      items: [
        {
          disposition: "OWNED",
          items: [
            {
              value: "return data.mm._classes[0].Name;",
              icon: "cci cci-npc-class",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 2 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn data.mm._templates[2].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn \"\";\n} else if (data.stress.max > 1 || data.structure.max > 1) {\n\treturn \" \";\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "return data.mm._classes[0].Name;",
              icon: "cci cci-npc-class",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 2 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn data.mm._templates[2].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn \"\";\n} else if (data.stress.max > 1 || data.structure.max > 1) {\n\treturn \" \";\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return data.mm._classes[0].Name;",
              icon: "cci cci-npc-class",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff0000"
            },
            {
              value: "if (data.mm._templates.length >= 1) {\n\treturn data.mm._templates[0].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1d0f25"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 2) {\n\treturn data.mm._templates[1].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 2) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn data.mm._templates[2].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "return data.mm._classes[0].Name;",
              icon: "cci cci-npc-class",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff0000"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n} else {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn \"\";\n\t} else {\n\t\treturn \" \";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "?",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#ff2828"
            },
            {
              value: "?",
              icon: "cci cci-heat",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1 || data.stress.max > 1) {\n\tif (data.mm._templates.length >= 1) {\n\t\treturn data.mm._templates[0].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n} else {\n\tif (data.mm._templates.length >= 2) {\n\t\treturn data.mm._templates[1].Name;\n\t} else {\n\t\treturn \"\";\n\t}\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 2 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn data.mm._templates[2].Name;\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffc800"
            },
            {
              value: "if (data.mm._templates.length >= 3) {\n\treturn \"\";\n} else if (data.stress.max > 1 || data.structure.max > 1) {\n\treturn \" \";\n} else {\n\treturn \"\";\n}",
              icon: "cci cci-npc-template",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm._templates.length >= 3 || data.stress.max > 1 || data.structure.max > 1) {\n\treturn \"\";\n} else {\n\treturn \" \";\n}",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "?",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "?",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "?",
              icon: "cci cci-save",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "?",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "?",
              icon: "cci cci-edef",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "?",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#b31414",
        tokenDispositions: [
          "OWNED",
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    },
    deployable: {
      items: [
        {
          disposition: "OWNED",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#70ff2e"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "if (data.overshield.value > 0) {\n\treturn data.overshield.value;\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-shield-star-outline",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "if (data.overshield.value == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm.Burn > 0) {\n\treturn data.mm.Burn;\n}\nreturn \"\";",
              icon: "cci cci-burn",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            },
            {
              value: "if (data.mm.Burn == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            }
          ]
        },
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "if (data.overshield.value > 0) {\n\treturn data.overshield.value;\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-shield-star-outline",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "if (data.overshield.value == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm.Burn > 0) {\n\treturn data.mm.Burn;\n}\nreturn \"\";",
              icon: "cci cci-burn",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            },
            {
              value: "if (data.mm.Burn == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bfbfbf"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "if (data.overshield.value > 0) {\n\treturn data.overshield.value;\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-shield-star-outline",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "if (data.overshield.value == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm.Burn > 0) {\n\treturn data.mm.Burn;\n}\nreturn \"\";",
              icon: "cci cci-burn",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            },
            {
              value: "if (data.mm.Burn == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "?",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#ff2828"
            },
            {
              value: "?",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "if (data.overshield.value > 0) {\n\treturn data.overshield.value;\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-shield-star-outline",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "if (data.overshield.value == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.mm.Burn > 0) {\n\treturn data.mm.Burn;\n}\nreturn \"\";",
              icon: "cci cci-burn",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            },
            {
              value: "if (data.mm.Burn == 0) {\n\treturn \" \";\n}\nreturn \"\";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "?",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "?",
              icon: "cci cci-edef",
              isFunction: false,
              expression: true,
              isNumber: false,
              color: "#29e08b"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#c8c8c8",
        tokenDispositions: [
          "OWNED",
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    },
    mech: {
      items: [
        {
          disposition: "OWNED",
          items: [
            {
              value: "return data.mm.Loadout.Frame.Name || \" \";",
              icon: "cci cci-frame",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "return data.mm.Pilot.Callsign || \" \";",
              icon: "cci cci-pilot",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffb400"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.mm.CurrentCoreEnergy) {\n\treturn \"\";\n} else {\n\treturn \"CORE\";\n}",
              icon: "mdi mdi-battery-10",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#999999"
            },
            {
              value: "if (data.mm.CurrentCoreEnergy) {\n\treturn \"CORE\";\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-battery",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#219900"
            },
            {
              value: "repairs",
              icon: "cci cci-repair",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#c60101"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "FRIENDLY",
          items: [
            {
              value: "return data.mm.Loadout.Frame.Name || \" \";",
              icon: "cci cci-frame",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "return data.mm.Pilot.Callsign || \" \";",
              icon: "cci cci-pilot",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffb400"
            },
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.mm.CurrentCoreEnergy) {\n\treturn \"\";\n} else {\n\treturn \"CORE\";\n}",
              icon: "mdi mdi-battery-10",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#999999"
            },
            {
              value: "if (data.mm.CurrentCoreEnergy) {\n\treturn \"CORE\";\n} else {\n\treturn \"\";\n}",
              icon: "mdi mdi-battery",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#219900"
            },
            {
              value: "repairs",
              icon: "cci cci-repair",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#c60101"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "NEUTRAL",
          items: [
            {
              value: "hp",
              icon: "mdi mdi-heart",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "heat",
              icon: "cci cci-heat",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#1f9eff"
            },
            {
              value: "if (data.structure.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "if (data.stress.max > 1) {\n\tconst current = data.stress.value;\n\tconst damage = data.stress.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\n//tooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "return \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ffffff"
            },
            {
              value: "if (data.stress.max > 1) return \"\";\nreturn \" \";",
              icon: "",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#000000"
            },
            {
              value: "mm.Armor",
              icon: "mdi mdi-shield-half-full",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#caccce"
            },
            {
              value: "mm.Evasion",
              icon: "cci cci-evasion",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9cff38"
            },
            {
              value: "mm.SaveTarget",
              icon: "cci cci-save",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#bababa"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Speed",
              icon: "mdi mdi-arrow-right-bold-hexagon-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff1e1e"
            },
            {
              value: "mm.EDefense",
              icon: "cci cci-edef",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#29e08b"
            },
            {
              value: "mm.SensorRange",
              icon: "cci cci-sensor",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#b8ffb8"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        },
        {
          disposition: "HOSTILE",
          items: [
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\ntooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-structure",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff3232"
            },
            {
              value: "if (data.structure.max > 1) {\n\tconst current = data.structure.value;\n\tconst damage = data.structure.max - current;\n\treturn \"▱\".repeat(damage) + \"▰\".repeat(current);\n}\ntooltip._maxRows = 3;\nreturn \"\";",
              icon: "cci cci-reactor",
              isFunction: true,
              expression: false,
              isNumber: false,
              color: "#ff7b00"
            },
            {
              value: "overshield.value",
              icon: "mdi mdi-shield-star-outline",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#9f6bff"
            },
            {
              value: "mm.Burn",
              icon: "cci cci-burn",
              isFunction: false,
              expression: false,
              isNumber: false,
              color: "#ff6432"
            }
          ]
        }
      ],
      static: {
        displayNameInTooltip: true,
        useAccentEverywhere: false,
        accentColor: "#2964c2",
        tokenDispositions: [
          "OWNED",
          "FRIENDLY",
          "NEUTRAL",
          "HOSTILE"
        ],
        useAccentColorForEverything: false
      }
    }
  }
};

const TTA_SETTINGS = {
  "token-tooltip-alt": {
    dataSource: "actor.data.data.derived",
    maxRows: 4,
    fontSize: 1,
    tooltipPosition: "top",
    actors: [
      {
          id: "default",
          enable: true,
          custom: true,
          isDefault: true
      },
      {
          id: "pilot",
          enable: true,
          custom: true
      },
      {
          id: "mech",
          enable: true,
          custom: true
      },
      {
          id: "npc",
          enable: true,
          custom: true
      },
      {
          id: "deployable",
          enable: true,
          custom: true
      }
    ],
    ...TTA_CONFIG,
    darkTheme: true
  }
};



declare global {

}

export default class Hack_TokenTooltipAlt {

  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return game.modules.get("token-tooltip-alt")?.active ?? false;
  }
  static get isEnabled(): boolean {
    return this.canEnable && ELH.Settings.IsSubmenuEnabled("tokenTooltipAlt");
  }
  // #endregion

  // #region *** INITIALIZATION *** ~
  static async Initialize() {

    // Register settings related to this component
    this.RegisterSettings();

    if (!this.isEnabled) { return; }

    // Register hooks related to this component
    this.RegisterHooks();

    await ELH.Settings.SafeUpdate(TTA_SETTINGS);
  }

  static RegisterSettings() {
    if (!game.user?.isGM) { return; }
    ELH.Settings.RegisterSettingsMenu(
      "tokenTooltipAlt",
      {
        name: "Token Tooltips",
        hint: "Apply customized settings to Token Tooltip Alt tooltips.",
        icon: "fa-duotone fa-chat",
        dependencies: [
          {type: "module", id: "token-tooltip-alt", display: "Token Tooltip Alt"}
        ],
        hasSubmenu: false,
        toggleDefault: true,
        async onEnable() {
          ui.notifications.info("Updating Token Tooltip Alt settings...");
          await ELH.Settings.SafeUpdate(TTA_SETTINGS);
          ui.notifications.info("Token Tooltip Alt settings updated successfully.");
        },
        async onRefresh() { return this?.onEnable?.(); }
      },
      {},
      [
        ["token-tooltip-alt", "dataSource"],
        ["token-tooltip-alt", "maxRows"],
        ["token-tooltip-alt", "fontSize"],
        ["token-tooltip-alt", "tooltipPosition"],
        ["token-tooltip-alt", "actors"],
        ["token-tooltip-alt", "gmSettings"],
        ["token-tooltip-alt", "playerSettings"],
        ["token-tooltip-alt", "darkTheme"]
      ]
    );
  }

  static RegisterHooks() {
    return true;
  }
}
