export const state = () => ({
    items: [],
    struct: [],
    mainFrame: []
  })
  
  export const mutations = {
    addItems(state, items) {
      state.items = items;
    },
    addStruct(state, struct) {
      state.struct = struct;
    },
    addMainFrame(state, mainFrame) {
      state.mainFrame = mainFrame;
    }
  }

  export const actions = {
    getData (context) {
      axios.get('http://api.v2.skimp.tk.local:8080/v1/shortener/')
      .then((res) => {
        store.commit('dgs/addItems', res.data.items)
        store.commit('dgs/addStruct', res.data.struct)
      })
    },
  }
  