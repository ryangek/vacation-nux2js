<template>
  <div class="container-fluid" style="min-width: 860px">
    <div class="row">
      <div class="col-6 mx-auto">
        <b-form-input
          style="position: absolute; top: 1rem; z-index: 1059"
          v-model="name.value"
          :state="nameStated"
          placeholder="Enter your name"
          trim
        ></b-form-input>
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
        <div style="position: fixed; bottom: 1rem; z-index: 1059; right: 1rem">
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
      const data = {
        name: this.name.value,
        dates: this.calendarOptions.events.map((o) => o.date),
      }
      this.$swal({
        title: 'Are you sure ?',
        html: 'Please confirm your action.',
        showConfirmButton: true,
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          console.info('Data: ', data)
        }
      })
    },
    onClear() {
      this.$swal({
        title: 'Are you sure ?',
        html: 'Please confirm your action.',
        showConfirmButton: true,
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.name = {
            value: null,
            invalid: false,
          }
          this.calendarOptions.events = []
        }
      })
    },
    handleDateClick: function (arg) {
      if (this.name.value) {
        const idx = this.calendarOptions.events.findIndex(
          (o) => o.title == this.name.value && o.date == arg.dateStr
        )
        if (idx == -1) {
          this.$bvToast.toast(`Added date: ${arg.dateStr}`, {
            title: 'Notification',
            autoHideDelay: 1000,
            appendToast: true,
            variant: 'success',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-left',
          })
          this.calendarOptions.events.push({
            title: this.name.value,
            date: arg.dateStr,
          })
        } else {
          this.$bvToast.toast(`Removed date: ${arg.dateStr}`, {
            title: 'Notification',
            autoHideDelay: 1000,
            appendToast: true,
            variant: 'danger',
            noCloseButton: true,
            toaster: 'b-toaster-bottom-left',
          })
          this.calendarOptions.events.splice(idx, 1)
        }
      } else {
        this.name.invalid = true
      }
    },
  },
}
</script>

<style></style>
