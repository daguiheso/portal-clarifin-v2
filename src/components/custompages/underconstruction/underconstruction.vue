<template>
  <div class="page main-signin-wrapper bg-primary construction">
    <div class="d-flex header-setting-icon demo-icon fa-spin" data-bs-toggle="offcanvas"
      data-bs-target="#switcher-canvas"><a class="nav-link icon text-white" href="javascript:;"><i
          class="fe fe-settings settings-icon"></i></a>
    </div>
    <div class="container">
      <div class="construction1 text-center details text-fixed-white pt-3 pt-sm-0" v-on:click="Removebutton">
        <div class="">
          <router-link :to="`${url}dashboard`">
            <img src="/images/brand-logos/desktop-white.png" class="mb-5" alt="logo" />
          </router-link>
          <h4 class="text-center text-fixed-white fs-30 fw-bold">
            We are Coming soon
          </h4>
          <p class="text-white-50 fs-15">
            We're making the system more awesome.we'll be back shortly.
          </p>

          <div>
            <vue-countdown id="launch_date" class="row mt-4 gy-xxl-0 gy-3 mb-5 justify-content-center"
              :time="2 * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
              <!-- Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, -->
              <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                <div class="p-3 under-maintenance-time rounded">
                  <p class="mb-1 fs-12 op-5">DAYS</p>
                  <h4 class="fw-semibold mb-0">{{ days }}</h4>
                </div>
              </div>
              <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                <div class="p-3 under-maintenance-time rounded">
                  <p class="mb-1 fs-12 op-5">HOURS</p>
                  <h4 class="fw-semibold mb-0">{{ hours }}</h4>
                </div>
              </div>
              <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                <div class="p-3 under-maintenance-time rounded">
                  <p class="mb-1 fs-12 op-5">MINUTES</p>
                  <h4 class="fw-semibold mb-0">{{ minutes }}</h4>
                </div>
              </div>
              <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                <div class="p-3 under-maintenance-time rounded">
                  <p class="mb-1 fs-12 op-5">SECOUNDS</p>
                  <h4 class="fw-semibold mb-0">{{ seconds }}</h4>
                </div>
              </div>
            </vue-countdown>
          </div>
        </div>
        <div class="text-center">
          © 2020 <a href="https://www.spruko.com/" class="text-white-50">Spruko</a> All
          rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: import.meta.env.BASE_URL,
    }
  },
};
</script>

<style scoped></style>
