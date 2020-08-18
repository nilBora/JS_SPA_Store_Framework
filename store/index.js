export const state = () => ({
  fields: [],
  drawer: true
})

export const mutations = {
  addFields(state, fieldsData) {
    state.fields = fieldsData
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  }
}
