export const namespaced = true

export const state = () => ({
  dogs: {},
  breeds: [],
})

export const mutations = {
  SET_DOGS(state, dogs) {
    state.dogs = dogs
  },
  SET_BREEDS(state, breeds) {
    state.breeds = breeds
  },
}
export const actions = {
  //to get all breeds of dogs and set it in breeds state
  fetchDogs({ commit }) {
    return this.$axios
      .get('/breeds/list/all')
      .then(async (response) => {
        let constructData = { ...response.data.message }
        let listBreeds = []
        for (const breed in constructData) {
          listBreeds.push(breed)
        }
        commit('SET_DOGS', constructData)
        commit('SET_BREEDS', listBreeds)
      })
      .catch((error) => {
        console.log('There was an error:', error)
      })
  },
  //to get dog pictures of dogs filtred by breed
  fetchDogByBreed({ commit }, payload) {
    let { breed, number } = payload
    return this.$axios
      .get(`/breed/${breed}/images/random/${number}`)
      .then((response) => {
        if (number !== '') {
          let constructData = {}
          constructData[breed] = {}
          constructData[breed]['img'] = response.data.message
          commit('SET_DOGS', constructData)
        }
        return response.data.message
      })
      .catch((error) => {
        console.log('There was an error:', error)
      })
  },
}
export const getters = {
  getDogs: (state) => state.dogs,
  getBreeds: (state) => state.breeds,
}
