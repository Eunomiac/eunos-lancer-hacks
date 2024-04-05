

export default class Hack_HexTokenSize {
  static get IsActive() {
    return game.modules.has("hex-size-support");
  }
  static async Initialize() {
    return true;
  }


}
