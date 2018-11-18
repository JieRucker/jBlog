import BaseModule from "./BaseModule";

class MainInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.commonUrl
  }

  /*获取音乐列表*/
  getAudioList() {
    return this.get(`https://api.i-meto.com/meting/api?server=netease&type=playlist&id=35798529`);
  }
}

export default new MainInterface()
