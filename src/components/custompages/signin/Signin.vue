<template>
  <div class="page main-signin-wrapper">
    <div
      class="d-flex header-setting-icon demo-icon fa-spin"
      data-bs-toggle="offcanvas"
      data-bs-target="#switcher-canvas">
      <a
        class="nav-link icon"
        href="javascript:;">
        <i
          class="fe fe-settings settings-icon text-dark" />
      </a>
    </div>
    <!-- Row -->
    <div class="row signpages text-center">
      <div class="col-md-12 my-auto">
        <div class="card">
          <div class="row row-sm">
            <div class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">
              <div class="mt-5 pt-4 p-2 position-absolute">
                <router-link to="/auth/">
                  <img
                    src="https://via.assets.so/img.jpg?w=400&h=150&tc=blue"
                    class="header-brand-img mb-4"
                    alt="logo">
                </router-link>
                <div class="clearfix" />
                <!-- <img src="https://via.assets.so/img.jpg?w=20&h=20&tc=blue" class="ht-100 mb-0" alt="user" /> -->
                <h5 class="mt-4 text-fixed-white">
                  Create Your Account
                </h5>
                <span class="fs-white-6 fs-13 mb-5 mt-xl-0">
                  Signup to create, discover and connect with the global
                  community
                </span>
              </div>
            </div>
            <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form">
              <div class="main-container container-fluid">
                <div class="row row-sm">
                  <div class="card-body mt-2 mb-2">
                    <div class="clearfix" />
                    <form>
                      <h5 class="text-start mb-2">
                        Signin to Your Account
                      </h5>
                      <p class="mb-4 text-muted fs-13 ms-0 text-start">
                        Signin to create, discover and connect with the global community
                      </p>
                      <div class="form-group text-start">
                        <label>Email</label>
                        <input
                          class="form-control"
                          placeholder="Enter your email"
                          type="text">
                      </div>
                      <div class="form-group text-start">
                        <label>Password</label>
                        <input
                          class="form-control"
                          placeholder="Enter your password"
                          type="password">
                      </div>
                      <router-link
                        :to="`/auth/dashboard`"
                        class="btn ripple btn-primary d-grid">
                        Sign In
                      </router-link>
                    </form>
                    <div class="text-start mt-5 ms-0">
                      <div class="mb-1">
                        <router-link :to="`/auth/forgotpassword`">
                          Forgot password?
                        </router-link>
                      </div>
                      <div>
                        Don't have an account?
                        <router-link :to="`/auth/signup`">
                          Register Here
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

