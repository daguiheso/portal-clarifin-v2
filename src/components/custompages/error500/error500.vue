<template>
  <div class="page main-signin-wrapper bg-primary construction">

    <!-- Start::container -->
    <div class="container">
      <div class="construction1 text-center details text-fixed-white">
        <div class="">
          <div class="col-lg-12">
            <h1 class="fs-140 mb-0">
              500
            </h1>
          </div>
          <div class="col-lg-12 ">
            <h1>Oops.The Page you are looking  for doesn't  exit..</h1>
            <h6 class="fs-15 mt-3 mb-4 text-white-50">
              You may have mistyped the address or the page may have moved. Try searching below.
            </h6>
            <router-link
              :to="`${url}dashboard`"
                  
              class="btn ripple btn-secondary text-center mb-2">
              Back to Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- End::container -->

  </div>
</template>

<script>
export default {

  data () {
    return {
      url: import.meta.env.BASE_URL,
    }
  },
}
</script>

<style></style>
