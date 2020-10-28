<template>
  <div class="container-fluid">
    <div class="row">
      <div class="colxl-4 col-lg-6 col-md-8 mx-auto mt-4">
        <b-form-input
          v-if="$store.state.profile.name"
          class="mb-4 mt-4"
          v-model="name.value"
          :state="nameStated"
          placeholder="Enter your name"
          trim
          readonly
        ></b-form-input>
        <b-button
          v-if="!$store.state.profile.name"
          @click="$router.push({ path: 'profile' })"
          block
          size="sm"
          class="mb-4 mt-4"
          variant="outline-primary"
          >Edit Profile</b-button
        >
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <FullCalendar
          class="pt-3 pb-3"
          style="width: 100%"
          :options="calendarOptions"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div style="position: fixed; bottom: 1rem; z-index: 1035; right: 1rem">
          <b-button-toolbar key-nav aria-label="Toolbar with button groups">
            <b-button-group class="mx-1">
              <b-button
                :disabled="!(nameStated && calendarOptions.events.length > 0)"
                @click="onSave"
                variant="success"
              >
                <b-icon icon="check-circle-fill" class="mr-2"></b-icon
                >Save</b-button
              >
            </b-button-group>
            <b-button-group class="mx-1">
              <b-button
                :disabled="!(nameStated && calendarOptions.events.length > 0)"
                @click="onClear"
                variant="danger"
              >
                <b-icon icon="x-circle-fill" class="mr-2"></b-icon
                >Clear</b-button
              >
            </b-button-group>
          </b-button-toolbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  computed: {
    nameStated() {
      if (this.name.value) {
        return true
      } else if (this.name.invalid) {
        return false
      } else {
        return null
      }
    },
  },
  mounted() {
    this.name.value = this.$store.state.profile.name
    this.calendarOptions.events = this.$store.state.profile.vacations
  },
  data() {
    return {
      name: {
        value: null,
        invalid: false,
      },
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [],
      },
    }
  },
  methods: {
    onSave() {
      this.$swal({
        title: 'Are you sure ?',
        html: 'Please confirm your action.',
        showConfirmButton: true,
        showDenyButton: true,
      }).then((result) => {
        if (result.value) {
          localStorage.setItem(
            'profile',
            JSON.stringify(this.$store.state.profile)
          )
        }
      })
    },
    onClear() {
      this.$swal({
        title: 'Are you sure ?',
        html: 'Please confirm your action.',
        showConfirmButton: true,
        showDenyButton: true,
      }).then((result) => {
        if (result.value) {
          const len = this.$store.state.profile.vacations.length
          for (let i = 0; i < len; i++) {
            this.$store.commit('profile/removeVacation', 0)
          }
        }
      })
    },
    async handleDateClick(arg) {
      const month = parseInt(arg.dateStr.split('-')[1], 10)
      const currentMonth = new Date().getMonth() + 1
      let dateStr = arg.dateStr
      let result = null
      const toastOpts = {
        title: 'Notification',
        autoHideDelay: 1000,
        appendToast: true,
        variant: 'success',
        noCloseButton: true,
        toaster: 'b-toaster-top-left',
      }

      if (month == currentMonth) {
        const idx = this.calendarOptions.events.findIndex(
          (o) =>
            o.title == this.name.value &&
            (o.date == arg.dateStr ||
              (o.start && o.start.search(arg.dateStr) > -1))
        )
        if (idx > -1) {
          this.$bvToast.toast(`Removed date: ${dateStr}`, {
            ...toastOpts,
            ...{
              variant: 'danger',
            },
          })
          // this.calendarOptions.events.splice(idx, 1)
          this.$store.commit('profile/removeVacation', idx)
        } else {
          result = await this.$swal({
            title: 'FULL or HALF day ? ',
            html: 'Please confirm your action.',
            confirmButtonText: 'FULL',
            cancelButtonText: 'CANCEL',
            denyButtonText: 'HALF',
            showConfirmButton: true,
            showCancelButton: true,
            showDenyButton: true,
          })
          // when full day
          if (result.isConfirmed) {
            // when exist vacation in calendar
            this.$bvToast.toast(`Added date: ${dateStr}`, toastOpts)
            const event = {
              title: this.name.value,
              date: dateStr,
            }
            this.$store.commit('profile/addVacation', {
              vacation: event,
            })
          } else if (result.isDenied) {
            // when half day and another question
            result = await this.$swal({
              title: 'AM or PM ? ',
              html: 'Please confirm your action.',
              confirmButtonText: 'AM',
              cancelButtonText: 'CANCEL',
              denyButtonText: 'PM',
              showConfirmButton: true,
              showCancelButton: true,
              showDenyButton: true,
            })
            let startStr = `${dateStr}T00:00:00`
            let endStr = `${dateStr}T23:59:59`
            if (result.isConfirmed) {
              // when half AM
              startStr = `${dateStr}T00:00:00`
              endStr = `${dateStr}T12:00:00`
              this.$bvToast.toast(
                `Added date: ${startStr} - ${endStr}`,
                toastOpts
              )
              const event = {
                title: this.name.value,
                start: startStr,
                end: endStr,
                allDay: false,
              }
              this.$store.commit('profile/addVacation', {
                vacation: event,
              })
            } else if (result.isDenied) {
              // when half PM
              startStr = `${dateStr}T12:00:01`
              endStr = `${dateStr}T23:59:59`
              this.$bvToast.toast(
                `Added date: ${startStr} - ${endStr}`,
                toastOpts
              )
              const event = {
                title: this.name.value,
                start: startStr,
                end: endStr,
                allDay: false,
              }
              this.$store.commit('profile/addVacation', {
                vacation: event,
              })
            }
          }
        }
      }
    },
  },
}
</script>

<style></style>
