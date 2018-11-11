/**
 * Created by JRucker on 2018/1/21.
 */

// TODO
class VueDB {
  constructor() {
  }

  setItem(key, value) {
    if (typeof value === 'object')
      value = JSON.stringify(value);

    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  }

  removeItem(key) {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  }

  getItem(key) {
    let now = '';
    if (window.localStorage) {
      now = window.localStorage.getItem(key);
    }

    return {
      toString() {
        return now;
      },
      toJson() {
        let tryObj = {};
        try {
          tryObj = JSON.parse(now)
        } catch (e) {
          tryObj = null;
        }
        return tryObj;
      },
      toNumber() {
        return parseFloat(now);
      }
    }

  }

  getItemOnce(key) {
    let now = this.getItem(key);
    this.removeItem(key);
    return {
      toString() {
        return now;
      },
      toJson() {
        let tryObj = {};
        try {
          tryObj = JSON.parse(now)
        } catch (e) {
          tryObj = null;
        }
        return tryObj;
      },
      toNumber() {
        return parseFloat(now);
      }
    }
  }
}


export default VueDB;
