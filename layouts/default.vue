<template>
  <div>
    <!-- mobile -->
    <b-navbar toggleable v-if="!$device.isDesktop" type="light" variant="light">
      <b-navbar-brand
        class="mr-auto"
        @click="$router.push({ path: '/' })"
        href="#"
      >
        <b-icon
          v-b-toggle.sidebar-footer
          class="mr-3"
          @mouseenter="icon = 'layout-text-sidebar'"
          @mouseleave="icon = 'layout-sidebar-reverse'"
          :icon="icon"
        ></b-icon
        >{{ title }}</b-navbar-brand
      >

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-nav-form form-class="w-100 mt-2 mb-2">
          <b-input-group>
            <b-form-input type="text" placeholder="Search"></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-primary">
                <b-icon icon="search"
              /></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-nav-form>
      </b-collapse>
    </b-navbar>
    <!-- mobile -->

    <!-- desktop -->
    <b-navbar v-if="$device.isDesktop" sticky type="light" variant="light">
      <b-navbar-brand
        class="mr-auto"
        @click="$router.push({ path: '/' })"
        href="#"
        ><b-icon
          v-b-toggle.sidebar-footer
          class="mr-3"
          @mouseenter="icon = 'layout-text-sidebar'"
          @mouseleave="icon = 'layout-sidebar-reverse'"
          :icon="icon"
        ></b-icon
        >{{ title }}</b-navbar-brand
      >
      <b-nav-form class="ml-auto">
        <b-input-group>
          <b-form-input type="text" placeholder="Search"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-primary">
              <b-icon icon="search"
            /></b-button>
          </b-input-group-append>
        </b-input-group>
      </b-nav-form>
    </b-navbar>
    <!-- desktop -->

    <div class="content">
      <Nuxt />
    </div>
    <b-sidebar
      id="sidebar-footer"
      aria-label="Sidebar with custom footer"
      no-header
      shadow
      backdrop
      backdrop-variant="dark"
    >
      <template #footer="{ hide }">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
          <strong class="mr-auto"></strong>
          <b-button size="sm" @click="hide">Close</b-button>
        </div>
      </template>
      <div class="px-3 py-2">
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
        <b-button
          @click="$router.push({ path: 'profile' })"
          block
          size="sm"
          class="mt-3"
          variant="link"
          >Edit Profile</b-button
        >
        <!-- <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> -->
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {
  beforeMount() {
    const profileTxt = localStorage.getItem('profile')
    if (profileTxt) {
      const profile = JSON.parse(profileTxt)
      this.$store.commit('profile/updateName', profile.name)
      for (let i = 0; i < profile.vacations.length; i++) {
        this.$store.commit('profile/addVacation', {
          vacation: profile.vacations[i],
        })
      }
    }
  },
  data() {
    return {
      title: 'Plan Vaction Leave',
      icon: 'layout-sidebar-reverse',
    }
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.content {
  min-height: calc(100vh - 55.6px);
  background: #f1f1f1;
}
</style>
