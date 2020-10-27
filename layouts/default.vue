<template>
  <div>
    <!-- mobile -->
    <b-navbar v-if="!$device.isDesktop" type="light" variant="light">
      <b-navbar-brand v-b-toggle.sidebar-footer href="#">NavBar</b-navbar-brand>
      <b-nav-form class="ml-auto">
        <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button variant="outline-success" class="my-2 my-sm-0" type="submit"
          >Search</b-button
        >
      </b-nav-form>
    </b-navbar>
    <!-- mobile -->

    <!-- desktop -->
    <b-navbar v-if="$device.isDesktop" sticky type="light" variant="light">
      <b-navbar-brand v-b-toggle.sidebar-footer href="#">NavBar</b-navbar-brand>
      <b-nav-form>
        <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button variant="outline-success" class="my-2 my-sm-0" type="submit"
          >Search</b-button
        >
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
          <strong class="mr-auto">Footer</strong>
          <b-button size="sm" @click="hide">Close</b-button>
        </div>
      </template>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

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
