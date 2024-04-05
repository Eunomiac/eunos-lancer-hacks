class ELHSettings {
    static RegisterSettings() {
        game.settings.register("eunos-lancer-hacks", "isLinkingFeelTremorToScanningRadius", {
            name: "Dynamic Scanning Radius",
            hint: "Automatically update the 'Feel Tremor' vision mode of tokens to match their Scanning range.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean
        });
        game.settings.register("eunos-lancer-hacks", "isShowingScanningRadius", {
            name: "Show Scanning Radius",
            hint: "Reveal the scanning range of tokens when they are selected.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean
        });
        game.settings.register("eunos-lancer-hacks", "scanningRadiusBrightness", {
            name: "Scanning Radius Brightness",
            hint: "Select the brightness of the scanning radius overlay.",
            scope: "world",
            config: true,
            type: Number,
            range: {
                min: 1,
                max: 10,
                step: 1
            },
            default: 3
        });
        game.settings.register("eunos-lancer-hacks", "isRevealingTokenBarsOnScan", {
            name: "Scans Reveal Token Display Bars",
            hint: "Immediately reveal token display bars when a token is scanned.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean
        });
    }
}
export default ELHSettings;
