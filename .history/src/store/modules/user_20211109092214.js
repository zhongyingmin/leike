import { login,exit } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  getName,
  setName,
  removeName,
  getRole,
  setRole,
  removeRole,
} from "@/utils/auth";

const state = {
  token: getToken(),
  status: false,
  name: getName(),
  role: getRole(),
  avatar: "",
  introduction: "",
  roles: [],
  checkedArr: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_CHECKEDARR: (state, checkedArr) => {
    state.checkedArr = checkedArr;
  },
  SET_STATUS: (state, status) => {
    state.status = status;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, code } = userInfo;
    // console.log(username,password)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password,code })
        .then((response) => {
          // console.log(response);
          const data = response;
          commit("SET_TOKEN", data.token);
          commit("SET_ROLE", data.role);
          commit("SET_NAME", data.username);
          setName(data.username);
          setToken(data.token);
          setRole(data.role);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateChecked({ commit }, info) {
    commit("SET_CHECKEDARR", info);
  },
  updateStatus({ commit }, status) {
    commit("SET_STATUS", status);
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      exit({token:state.token})
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_NAME", "");
          commit("SET_ROLE", "");
          removeToken();
          removeName();
          removeRole();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          // dispatch("tagsView/delAllViews", null, { root: true });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_NAME", "");
      commit("SET_ROLE", "");
      removeToken();
      removeName();
      removeRole();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
