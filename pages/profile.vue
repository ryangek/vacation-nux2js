<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-xl-4 col-lg-6 col-md-8 col-10 mx-auto mt-4 mb-4 pt-4 text-center"
      >
        <b-avatar
          src="https://placekitten.com/300/300"
          class="mt-4 mb-4"
          size="10rem"
        ></b-avatar>
        <b-form-input
          class="mt-4 mb-4"
          type="text"
          v-model="name.value"
          placeholder="Enter your name"
        ></b-form-input>
        <b-button @click="onSave()">
          <b-icon icon="check-circle-fill" class="mr-2"></b-icon>Save
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.name.value = this.$store.state.profile.name
  },
  data() {
    return {
      name: {
        value: null,
        invalid: false,
      },
    }
  },
  methods: {
    onSave() {
      // current value
      let profile = this.$store.state.profile
      // new value
      profile = { ...profile, ...{ name: this.name.value } }
      // save to localStorage
      localStorage.setItem('profile', JSON.stringify(profile))
      // update store state
      this.$store.commit('profile/updateName', profile.name)
      // move to home page
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style></style>
