<template>
  <!-- Page -->
  <div class="page main-signin-wrapper">
    <div class="d-flex header-setting-icon demo-icon fa-spin" data-bs-toggle="offcanvas"
      data-bs-target="#switcher-canvas"><a class="nav-link icon" href="javascript:;"><i
          class="fe fe-settings settings-icon text-dark"></i></a>
    </div>

    <!-- Row -->
    <div class="row signpages text-center">
      <div class="col-md-12 my-auto">
        <div class="card">
          <div class="row row-sm">
            <div class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">
              <div class="mt-5 pt-5 p-2 position-absolute">
                <router-link :to="'/auth/'">
                  <img src="https://via.assets.so/img.jpg?w=400&h=150&tc=blue" class="header-brand-img mb-4" alt="logo" />
                </router-link>
                <div class="clearfix"></div>
                <!-- <img src="/images/svgs/user.svg" class="ht-100 mb-0" alt="user" /> -->
                <h5 class="mt-4 text-fixed-white">Create Your Account</h5>
                <span class="fs-white-6 fs-13 mb-5 mt-xl-0">Signup to create, discover and connect with the global
                  community</span>
              </div>
            </div>
            <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form">
              <div class="main-container container-fluid">
                <div class="row row-sm">
                  <div class="card-body mt-2 mb-2">
                    <div class="clearfix"></div>
                    <h5 class="text-start mb-2">Signup for Free</h5>
                    <p class="mb-4 text-muted fs-13 ms-0 text-start">
                      It's free to signup and only takes a minute.
                    </p>
                    <form>
                      <div class="form-group text-start">
                        <label>Name</label>
                        <input class="form-control" placeholder="Enter your Name" type="text" />
                      </div>
                      <div class="form-group text-start">
                        <label>Email</label>
                        <input class="form-control" placeholder="Enter your email" type="text" />
                      </div>
                      <div class="form-group text-start">
                        <label>Password</label>
                        <input class="form-control" placeholder="Enter your password" type="password" />
                      </div>
                      <router-link :to="`/auth/signup`" class="btn ripple btn-primary d-grid">
                        Create Account
                      </router-link>
                    </form>
                    <div class="text-start mt-5 ms-0">
                      <p class="mb-0">
                        Already have an account?
                        <router-link :to="`/auth/signin`">Sign In</router-link>
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
  <!-- End Page -->
</template>

<style scoped></style>
