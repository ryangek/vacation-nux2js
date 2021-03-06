export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nux2js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // 'bootstrap-vue/nuxt',
    [
      'bootstrap-vue/nuxt',
      {
        icons: true,
      },
    ],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/device
    '@nuxtjs/device',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonText: 'Confirm',
        denyButtonText: 'Cancel',
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674',
        buttonsStyling: false,
        customClass: {
          closeButton: 'btn btn-success mx-1',
          confirmButton: 'btn btn-success mx-1',
          denyButton: 'btn btn-danger mx-1',
          cancelButton: 'btn btn-secondary mx-1',
        },
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // Server Configuration (https://nuxtjs.org/guides/configuration-glossary/configuration-server)
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false,
  },
}
