export default class Hack_ErniesModernUI {
  static RegisterSettings() {
    game.settings.register("eunos-lancer-hacks",
      "isSettingUITheme",
      {
        name: "Override UI Theme",
        hint: "Update UI theme to subtle, compacy layout",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
      }
    );
  }
  static get IsActive() {
    return game.modules.has("ernies-modern-layout");
  }
  static async Initialize() {
    this.RegisterSettings();

    if (game.settings.get("eunos-lancer-hacks", "isSettingTokenBorder")) {
      await Promise.all([
        game.settings.set("ernies-modern-layout", "compactMode", true),
        game.settings.set("ernies-modern-layout", "subtleLayout", true),
        game.settings.set("ernies-modern-layout", "partyColor", "#055076"),
        game.settings.set("ernies-modern-layout", "friendlyColor", "#055076"),
        game.settings.set("ernies-modern-layout", "neutralColor", "#b47e08"),
        game.settings.set("ernies-modern-layout", "hostileColor", "#8c0d0f")
      ]);
    }

  }
}
