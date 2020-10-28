export const state = () => ({
  name: '',
  vacations: [],
})

export const mutations = {
  updateName(state, text) {
    state.name = text
    for (let i = 0; i < state.vacations.length; i++) {
      state.vacations[i].title = text
    }
  },
  addVacation(state, { vacation }) {
    state.vacations.push(vacation)
  },
  removeVacation(state, idx) {
    state.vacations.splice(idx, 1)
  },
}
