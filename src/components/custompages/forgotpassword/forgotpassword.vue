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
            <div class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">
              <div class="mt-3 pt-3 p-2 position-absolute">
                <router-link  :to="`${url}dashboard`">
                  <img src="/images/brand-logos/desktop-white.png" class="header-brand-img mb-4" alt="logo" />
                </router-link>
                <div class="clearfix"></div>
                <img src="/images/svgs/user.svg" class="ht-100 mb-0" alt="user" />
                <h5 class="mt-4 text-fixed-white">Reset Your Password</h5>
                <span class="fs-white-6 fs-13 mb-5 mt-xl-0">Signup to create, discover and connect with the global
                  community</span>
              </div>
            </div>
            <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form">
              <div class="main-container container-fluid">
                <div class="row row-sm">
                  <div class="card-body mt-2 mb-2">
                    <div class="clearfix"></div>
                    <h5 class="text-start mb-2">Forgot Password</h5>
                    <p class="mb-4 text-muted fs-13 ms-0 text-start">
                      It's free to signup and only takes a minute.
                    </p>
                    <form>
                      <div class="form-group text-start">
                        <label>Email</label>
                        <input class="form-control" placeholder="Enter your email" type="text" value="" />
                        <button class="btn ripple btn-primary w-100 mt-2">
                          Request reset link
                        </button>
                      </div>
                    </form>

                    <div class="card-footer border-top-0 ps-0 mt-3 text-start">
                      <p>Did you remembered your password?</p>
                      <p class="mb-0">
                        Try to <router-link :to="`${url}custompages/signin`">Signin</router-link>
                      </p>
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
