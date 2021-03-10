<template>
  <div id="app">
    <h1 class="title">Welcome to dogs Portal</h1>

    <div class="filter">
      <h2>Please choose a breed of dog</h2>
      <select
        v-model="filter"
        class="select"
        name="breeds"
        @change="filterByBreed"
      >
        <option value="all">--Please choose an option--</option>
        <option v-for="(breed, index) in getBreeds" :key="index" :value="breed">
          {{ breed }}
        </option>
      </select>
    </div>
    <div class="container">
      <div v-for="(dog, key, index) in getDogs" :key="index">
        <img v-for="(img, idx) in dog.img" :key="idx" :src="img" :alt="key" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      filter: 'all',
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('dog/fetchDogs')
    } catch (e) {
      error({
        statusCode: 503,
        message: e.message,
      })
    }
  },
  computed: {
    ...mapGetters('dog', ['getDogs', 'getBreeds']),
  },
  methods: {
    ...mapActions('dog', ['fetchDogs', 'fetchDogByBreed']),
    filterByBreed() {
      if (this.filter === 'all') {
        this.fetchDogs()
      } else {
        this.fetchDogByBreed({ breed: this.filter, number: 30 })
      }
    },
  },
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --select-border: #777;
  --select-focus: blue;
  --select-arrow: var(--select-border);
}

body {
  min-height: 100vh;
  display: grid;
  place-content: center;
  grid-gap: 0.5rem;
  font-family: 'Baloo 2', sans-serif;
  background-color: #e9f2fd;
  padding: 1rem;
}

#app {
  text-align: center;
}
.title {
  margin: 20px;
}

.filter {
  text-align: left;
}

.filter h2 {
  margin-left: 20px;
}

.container {
  line-height: 0;

  -webkit-column-count: 5;
  -webkit-column-gap: 0px;
  -moz-column-count: 5;
  -moz-column-gap: 0px;
  column-count: 5;
  column-gap: 0px;
}

.container img {
  width: 100% !important;
  height: auto !important;
  border-radius: 10px;
}

img:hover {
  -webkit-transform: scale(1.5, 1.5);
  transform: scale(1.5, 1.5);

  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

img:hover:after {
  color: red;
  content: attr(title);
  position: absolute;
  left: 50px;
}

select {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 20px 20px 40px 20px;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;

  z-index: 1;

  &::-ms-expand {
    display: none;
  }
  outline: none;
}

.select {
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;

  select,
  &::after {
    grid-area: select;
  }

  min-width: 15ch;
  max-width: 30ch;

  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;

  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;

  // remove for transparency
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

  // Custom arrow
  &:not(.select--multiple)::after {
    content: '';
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: var(--select-arrow);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
}

@media (max-width: 1200px) {
  .container {
    -moz-column-count: 4;
    -webkit-column-count: 4;
    column-count: 4;
  }
}
@media (max-width: 1000px) {
  .container {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
  }
}
@media (max-width: 800px) {
  .container {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}
@media (max-width: 400px) {
  .container {
    -moz-column-count: 1;
    -webkit-column-count: 1;
    column-count: 1;
  }
}
</style>
