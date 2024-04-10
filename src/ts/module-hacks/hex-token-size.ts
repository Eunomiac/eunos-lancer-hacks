

export default class Hack_HexTokenSize {
  static get IsActive() {
    return game.modules.get("hex-size-support")?.active ?? false;
  }
  static async Initialize() {
    return true;
  }


}
