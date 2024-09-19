<template>
  <!-- Start Right-Sidebar -->
  <div
    id="right-sidebar-canvas"
    class="offcanvas offcanvas-end"
    tabindex="-1"
    aria-labelledby="offcanvasRightLabel1">
    <div class="offcanvas-header border-bottom">
      <h5
        id="offcanvasRightLabel1"
        class="offcanvas-title text-default">
        Todo
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close" />
    </div>
    <div class="offcanvas-body p-0 sidebar-right">
      <div class="d-flex p-3">
        <div class="form-check">
          <input
            id="checkebox-sm1"
            class="form-check-input"
            type="checkbox"
            value=""
            checked="false">
          <label
            class="form-check-label"
            for="checkebox-sm1">
            Hangout With friends
          </label>
        </div>
        <span class="ms-auto">
          <i
            class="fe fe-edit-2 text-primary me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Edit" />
          <i
            class="fe fe-trash-2 text-danger me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Delete" />
        </span>
      </div>
      <div class="d-flex p-3 border-top">
        <div class="form-check">
          <input
            id="checkebox-sm2"
            class="form-check-input"
            type="checkbox"
            value="">
          <label
            class="form-check-label"
            for="checkebox-sm2">
            Prepare for presentation
          </label>
        </div>
        <span class="ms-auto">
          <i
            class="fe fe-edit-2 text-primary me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Edit" />
          <i
            class="fe fe-trash-2 text-danger me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Delete" />
        </span>
      </div>
      <div class="d-flex p-3 border-top">
        <div class="form-check">
          <input
            id="checkebox-sm3"
            class="form-check-input"
            type="checkbox"
            value="">
          <label
            class="form-check-label"
            for="checkebox-sm3">
            Prepare for presentation
          </label>
        </div>
        <span class="ms-auto">
          <i
            class="fe fe-edit-2 text-primary me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Edit" />
          <i
            class="fe fe-trash-2 text-danger me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Delete" />
        </span>
      </div>
      <div class="d-flex p-3 border-top">
        <div class="form-check">
          <input
            id="checkebox-sm4"
            class="form-check-input"
            type="checkbox"
            value=""
            checked="false">
          <label
            class="form-check-label"
            for="checkebox-sm4">
            System Updated
          </label>
        </div>
        <span class="ms-auto">
          <i
            class="fe fe-edit-2 text-primary me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Edit" />
          <i
            class="fe fe-trash-2 text-danger me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Delete" />
        </span>
      </div>
      <div class="d-flex p-3 border-top">
        <div class="form-check">
          <input
            id="checkebox-sm5"
            class="form-check-input"
            type="checkbox"
            value="">
          <label
            class="form-check-label"
            for="checkebox-sm5">
            Do something more
          </label>
        </div>
        <span class="ms-auto">
          <i
            class="fe fe-edit-2 text-primary me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Edit" />
          <i
            class="fe fe-trash-2 text-danger me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Delete" />
        </span>
      </div>
      <div class="d-flex p-3 border-top">
        <div class="form-check">
          <input
            id="checkebox-sm6"
            class="form-check-input"
            type="checkbox"
            value="">
          <label
            class="form-check-label"
            for="checkebox-sm6">
            System Updated
          </label>
        </div>
        <span class="ms-auto">
          <i
            class="fe fe-edit-2 text-primary me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Edit" />
          <i
            class="fe fe-trash-2 text-danger me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Delete" />
        </span>
      </div>
      <div class="d-flex p-3 border-top">
        <div class="form-check">
          <input
            id="checkebox-sm7"
            class="form-check-input"
            type="checkbox"
            value=""
            checked="false">
          <label
            class="form-check-label"
            for="checkebox-sm7">
            Find an Idea
          </label>
        </div>
        <span class="ms-auto">
          <i
            class="fe fe-edit-2 text-primary me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Edit" />
          <i
            class="fe fe-trash-2 text-danger me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Delete" />
        </span>
      </div>
      <div class="d-flex p-3 border-top mb-0">
        <div class="form-check">
          <input
            id="checkebox-sm8"
            class="form-check-input"
            type="checkbox"
            value=""
            checked="false">
          <label
            class="form-check-label"
            for="checkebox-sm8">
            Project review
          </label>
        </div>
        <span class="ms-auto">
          <i
            class="fe fe-edit-2 text-primary me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Edit" />
          <i
            class="fe fe-trash-2 text-danger me-2"
            data-bs-toggle="tooltip"
            title=""
            data-bs-placement="top"
            data-bs-original-title="Delete" />
        </span>
      </div>
      <h5 class="px-4 Overviews">
        Overview
      </h5>
      <div class="p-4">
        <div class="main-traffic-detail-item">
          <div>
            <span>Founder &amp; CEO</span> <span>24</span>
          </div>
          <div
            class="progress mb-3 progress-sm progress-animate"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              class="progress-bar bg-primary"
              style="width: 25%" />
          </div><!-- progress -->
        </div>
        <div class="main-traffic-detail-item">
          <div>
            <span>UX Designer</span> <span>1</span>
          </div>
          <div
            class="progress mb-3 progress-sm progress-animate"
            role="progressbar"
            aria-valuenow="10"
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              class="progress-bar bg-secondary"
              style="width: 10%" />
          </div><!-- progress -->
        </div>
        <div class="main-traffic-detail-item">
          <div>
            <span>Recruitment</span> <span>87</span>
          </div>
          <div
            class="progress mb-3 progress-sm progress-animate"
            role="progressbar"
            aria-valuenow="45"
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              class="progress-bar bg-success"
              style="width: 45%" />
          </div><!-- progress -->
        </div>
        <div class="main-traffic-detail-item">
          <div>
            <span>Software Engineer</span> <span>32</span>
          </div>
          <div
            class="progress mb-3 progress-sm progress-animate"
            role="progressbar"
            aria-valuenow="30"
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              class="progress-bar bg-info"
              style="width: 30%" />
          </div><!-- progress -->
        </div>
        <div class="main-traffic-detail-item">
          <div>
            <span>Project Manager</span> <span>32</span>
          </div>
          <div
            class="progress progress-sm progress-animate"
            role="progressbar"
            aria-valuenow="30"
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              class="progress-bar bg-danger"
              style="width: 30%" />
          </div><!-- progress -->
        </div>
      </div>
    </div>
  </div>
  <!-- End Right-Sidebar -->
</template>

<script lang="ts" setup>

</script>

<style scoped></style>
