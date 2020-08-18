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
  