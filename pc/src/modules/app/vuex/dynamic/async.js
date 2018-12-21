import * as types from '../mutation-types'

const state = {
  dataSourceFirstList: [],// 组件数据
  dataSourceSecondList: [],
};

const getters = {
  getDataSourceList: state => {
    return (compType = 'first') => {
      let a = null;
      switch (compType) {
        case 'first':
          a = state.dataSourceFirstList;
          return a;
        case 'second':
          a = state.dataSourceSecondList;
          return a;
      }
    }
  },
  getSource: state => {
    return (compName, compType = 'first') => {
      const changeComp = (() => {
        return (state, stateType) => {
          if (stateType === 'odd') {
            let a = null;
            [...state].forEach(m => (m.compName === compName) && (a = m));
            return a;
          } else if (stateType === 'even') {
            let a = [];
            [...state].forEach(m => {
              [...compName].forEach(k => (m.compName === k) && a.push(m));
              return a;
            });
          }
        }
      })();

      if (Object.prototype.toString.call(compName) === '[object Array]') {
        switch (compType) {
          case 'first':
            return changeComp(state.dataSourceFirstList, 'even');
          case 'second':
            return changeComp(state.dataSourceSecondList, 'even');
        }
      } else if (Object.prototype.toString.call(compName) === '[object String]') {
        switch (compType) {
          case 'first':
            return changeComp(state.dataSourceFirstList, 'odd');
          case 'second':
            return changeComp(state.dataSourceSecondList, 'odd');
        }
      }
    }
  }
};

const actions = {
  setDataSourceList({commit}, info) {
    commit(types.SET_DATA_SOURCE_LIST, info)
  },
  setDestroy({commit}, info) {
    commit(types.SET_DESTROY, info)
  }
};

const mutations = {
  [types.SET_DATA_SOURCE_LIST](state, data) {
    let param = Object.assign({}, {compType: 'first'}, data);

    if (Object.prototype.toString.call(param) === '[object Object]') {
      switch (param.compType) {
        case 'first':
          state.dataSourceFirstList.push(param);
          break;
        case 'second':
          state.dataSourceSecondList.push(param);
          break
      }
    }
  },
  [types.SET_DESTROY](state, data) {
    let param = Object.assign({}, {compType: 'first'}, data);

    const timeout = (() => {
      return (ms) => {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, ms, 'done');
        });
      }
    })();

    if (Object.prototype.toString.call(param) === '[object Object]') {
      const changeComp = (() => {
        return (param, state) => {
          if (param.compName.length) {
            [...state].forEach((m, i) => {
              [...param.compName].forEach(k => (m.compName === k) && state.splice(i, 1));
            });
          } else {
            state = [];
          }
        }
      })();

      timeout(500).then(() => {
        switch (param.compType) {
          case 'first':
            changeComp(param, state.dataSourceFirstList);
            break;
          case 'second':
            changeComp(param, state.dataSourceSecondList);
            break;
        }
      })
    } else {
      throw new Error('[Exception] Missing parameter {}')
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
