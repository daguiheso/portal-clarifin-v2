<template>
  <div class="page main-signin-wrapper">
    <div class="d-flex header-setting-icon demo-icon fa-spin" data-bs-toggle="offcanvas"
      data-bs-target="#switcher-canvas"><a class="nav-link icon" href="javascript:;"><i
          class="fe fe-settings settings-icon text-dark"></i></a>
    </div>

    <!-- Row -->
    <div class="row signpages text-center" v-on:click="Removebutton">
      <div class="col-md-12 my-auto">
        <div class="card">
          <div class="row row-sm">
            <div class="col-lg-6 col-xl-5 d-none d-lg-block bg-primary details">
              <div class="mt-4 pt-4 px-5 ms-3 position-absolute">
                <router-link :to="`${url}dashboard`">
                  <img src="/images/brand-logos/desktop-white.png" class="header-brand-img mb-4" alt="logo" />
                </router-link>
                <div class="clearfix"></div>
                <img src="/images/svgs/user.svg" class="ht-100 mb-0" alt="user" />
                <h5 class="mt-4 text-fixed-white">Unlock</h5>
                <span class="fs-white-6 fs-13 mb-5 mt-xl-0">Enter your password to access the admin.</span>
              </div>
            </div>
            <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form">
              <div class="main-container container-fluid">
                <div class="row row-sm">
                  <div class="card-body main-profile-overview mt-3 mb-3">
                    <div class="clearfix"></div>
                    <h5 class="text-start mb-2">Lockscreen</h5>
                    <p class="mb-4 text-muted fs-13 ms-0 text-start">
                      Unlock your screen by entering password
                    </p>
                    <div>
                      <div class="text-start d-flex float-start mb-4 user-lock">
                        <img alt="avatar avatar-sm" class="rounded-circle mb-0" src="/images/faces/1.jpg" />
                        <div class="my-auto">
                          <p class="fw-semibold my-auto ms-2 text-uppercase">
                            Sonia Taylor
                          </p>
                        </div>
                      </div>
                      <div class="form-group">
                        <input class="form-control" placeholder="Enter your password" type="password" />
                      </div>
                      <div class="text-start mb-2">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label ms-1" for="flexCheckDefault">
                          show password
                        </label>
                      </div>
                      <div class="d-grid">
                        <router-link :to="`${url}dashboard`" class="btn ripple btn-primary d-grid mt-4">
                          Unlock
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Row -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: import.meta.env.BASE_URL,
    };
  },
};
</script>

<style scoped></style>
