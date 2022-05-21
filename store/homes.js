export const namespaced = true;

export const state = () => {
  return {
    homeList: [],
  };
};

export const mutations = {
  SET_HOMELIST(state, home) {
    state.homeList.push(home);
  },
  DELETE_HOME(state, index) {
    state.homeList.splice(index, 1);
  },
};

export const actions = {
  setHome({ commit }, home) {
    commit("SET_HOMELIST", home);
  },
  deleteHome({ commit }, index) {
    commit("DELETE_HOME", index);
  },
};

export const getters = {
  getHomes(state) {
    return state.homeList;
  },
};
