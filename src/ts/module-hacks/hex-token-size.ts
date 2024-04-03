

export default class Hack_HexTokenSize {
  static RegisterSettings() {
    game.settings.register("eunos-lancer-hacks",
      "isSettingTokenBorder",
      {
        name: "Override Token Border",
        hint: "Update token borders to be wider.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
      }
    );
  }
  static get IsActive() {
    return game.modules.has("hex-size-support");
  }
  static async Initialize() {
    this.RegisterSettings();



    if (game.settings.get("eunos-lancer-hacks", "isSettingTokenBorder")) {
      await Promise.all([
        game.settings.set("hex-size-support", "borderWidth", 20),
        game.settings.set("hex-size-support", "controlledColor", "#FFFF00"),
        game.settings.set("hex-size-support", "partyColor", "#055076"),
        game.settings.set("hex-size-support", "friendlyColor", "#055076"),
        game.settings.set("hex-size-support", "neutralColor", "#b47e08"),
        game.settings.set("hex-size-support", "hostileColor", "#8c0d0f")
      ]);
    }

  }
}
