import Cookies from 'js-cookie';

const user = {
  state: {
    adminInfo: {
      token: window.sessionStorage.getItem('token') || '',
      admin_name: window.sessionStorage.getItem('admin_name') || '',
      admin_id: window.sessionStorage.getItem('admin_id') || ''
    }
  },
  getters: {
    getAdminInfo: state => state.adminInfo
  },
  mutations: {
    saveAdminInfo: (state, data) => {
      state.adminInfo.token = data.token;
      state.adminInfo.admin_name = data.admin_name;
      state.adminInfo.admin_id = data.admin_id;

      window.sessionStorage.setItem('token', data.token);
      window.sessionStorage.setItem('admin_name', data.admin_name);
      window.sessionStorage.setItem('admin_id', data.admin_id);
    },
    logout: (state) => {
      state.adminInfo.token = '';
      state.adminInfo.admin_name = '';
      state.adminInfo.admin_id = '';

      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('admin_name');
      window.sessionStorage.removeItem('admin_id');

      // 恢复默认样式
      let themeLink = document.querySelector('link[name="theme"]');
      themeLink.setAttribute('href', '');
      // 清空打开的页面等数据，但是保存主题数据
      let theme = '';
      if (localStorage.theme) {
        theme = localStorage.theme;
      }
      localStorage.clear();
      if (theme) {
        localStorage.theme = theme;
      }
    },
    /*logout(state, vm) {
      Cookies.remove('user');
      Cookies.remove('password');
      Cookies.remove('access');
      // 恢复默认样式
      let themeLink = document.querySelector('link[name="theme"]');
      themeLink.setAttribute('href', '');
      // 清空打开的页面等数据，但是保存主题数据
      let theme = '';
      if (localStorage.theme) {
        theme = localStorage.theme;
      }
      localStorage.clear();
      if (theme) {
        localStorage.theme = theme;
      }
    }*/
  }
};

export default user;
