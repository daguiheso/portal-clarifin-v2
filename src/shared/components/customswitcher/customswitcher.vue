<template lang="">
  <!-- Start Switcher -->
  <div
    id="switcher-canvas"
    class="offcanvas offcanvas-end"
    tabindex="-1"
    aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header border-bottom">
      <h5
        id="offcanvasRightLabel"
        class="offcanvas-title text-default">
        Switcher
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close" />
    </div>
    <div class="offcanvas-body">
      <nav class="border-bottom border-block-end-dashed">
        <div
          id="switcher-main-tab"
          class="nav nav-tabs nav-justified"
          role="tablist">
          <button
            id="switcher-home-tab"
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#switcher-home"
            type="button"
            role="tab"
            aria-controls="switcher-home"
            aria-selected="true">
            Theme Styles
          </button>
        </div>
      </nav>
      <div
        id="nav-tabContent"
        class="tab-content">
        <div
          id="switcher-home"
          class="tab-pane fade show active border-0"
          role="tabpanel"
          aria-labelledby="switcher-home-tab"
          tabindex="0">
          <div class="">
            <p class="switcher-style-head">
              Theme Color Mode:  {{ switcher.colortheme }}
            </p>
            <div class="row switcher-style gx-0">
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-light-theme">
                    Light
                  </label>
                  <input
                    id="switcher-light-theme"
                    class="form-check-input"
                    type="radio"
                    name="theme-style"
                    :checked="switcher.colortheme == 'light' ? true : false"
                    @click="colorthemeFn('light')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-dark-theme">
                    Dark
                  </label>
                  <input
                    id="switcher-dark-theme"
                    class="form-check-input"
                    type="radio"
                    name="theme-style"
                    :checked="switcher.colortheme == 'dark' ? true : false"
                    @click="colorthemeFn('dark')">
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <p class="switcher-style-head">
              Directions: {{ switcher.direction }}
            </p>
            <div class="row switcher-style gx-0">
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-ltr">
                    LTR
                  </label>
                  <input
                    id="switcher-ltr"
                    class="form-check-input"
                    type="radio"
                    name="direction"
                    :checked="switcher.direction == 'ltr' ? true : false"
                    @click="directionFn('ltr')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-rtl">
                    RTL
                  </label>
                  <input
                    id="switcher-rtl"
                    class="form-check-input"
                    type="radio"
                    name="direction"
                    :checked="switcher.direction == 'rtl' ? true : false"
                    @click="directionFn('rtl')">
                </div>
              </div>
            </div>
          </div>

          <div class="sidemenu-layout-styles">
            <p class="switcher-style-head">
              Sidemenu Layout Styles:
            </p>
            <div class="row switcher-style gx-0 pb-2 gy-2">
              <div class="col-sm-6">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-default-menu">
                    Default Menu
                  </label>
                  <input
                    id="switcher-default-menu"
                    class="form-check-input"
                    type="radio"
                    name="sidemenu-layout-styles"
                    :checked="switcher.layoutStyles == 'default-menu' ? true : false"
                    @click="layoutStylesFn('default-menu')">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-closed-menu">
                    Closed Menu
                  </label>
                  <input
                    id="switcher-closed-menu"
                    class="form-check-input"
                    type="radio"
                    name="sidemenu-layout-styles"
                    :checked="switcher.layoutStyles == 'closed-menu' ? true : false"
                    @click="layoutStylesFn('closed-menu')">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-icontext-menu">
                    Icon Text
                  </label>
                  <input
                    id="switcher-icontext-menu"
                    class="form-check-input"
                    type="radio"
                    name="sidemenu-layout-styles"
                    :checked="switcher.layoutStyles == 'icontext-menu' ? true : false"
                    @click="layoutStylesFn('icontext-menu')">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-icon-overlay">
                    Icon Overlay
                  </label>
                  <input
                    id="switcher-icon-overlay"
                    class="form-check-input"
                    type="radio"
                    name="sidemenu-layout-styles"
                    :checked="switcher.layoutStyles == 'icon-overlay' ? true : false"
                    @click="layoutStylesFn('icon-overlay')">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-detached">
                    Detached
                  </label>
                  <input
                    id="switcher-detached"
                    class="form-check-input"
                    type="radio"
                    name="sidemenu-layout-styles"
                    :checked="switcher.layoutStyles == 'detached' ? true : false"
                    @click="layoutStylesFn('detached')">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-double-menu">
                    Double Menu
                  </label>
                  <input
                    id="switcher-double-menu"
                    class="form-check-input"
                    type="radio"
                    name="sidemenu-layout-styles"
                    :checked="switcher.layoutStyles == 'double-menu' ? true : false"
                    @click="layoutStylesFn('double-menu')">
                </div>
              </div>
            </div>
          </div>

          <div class="theme-colors">
            <p class="switcher-style-head">
              Theme Primary:
            </p>
            <div class="d-flex flex-wrap align-items-center switcher-style">
              <div class="form-check switch-select me-3">
                <input
                  id="switcher-primary"
                  class="form-check-input color-input color-primary-1"
                  type="radio"
                  name="theme-primary"
                  :checked="switcher.themePrimary == '58, 88, 146' ? true : false"
                  @click="themePrimaryFn('58, 88, 146')">
              </div>
              <div class="form-check switch-select me-3">
                <input
                  id="switcher-primary1"
                  class="form-check-input color-input color-primary-2"
                  type="radio"
                  name="theme-primary"
                  :checked="switcher.themePrimary == '92, 144, 163' ? true : false"
                  @click="themePrimaryFn('92, 144, 163')">
              </div>
              <div class="form-check switch-select me-3">
                <input
                  id="switcher-primary2"
                  class="form-check-input color-input color-primary-3"
                  type="radio"
                  name="theme-primary"
                  :checked="switcher.themePrimary == '161, 90, 223' ? true : false"
                  @click="themePrimaryFn('161, 90, 223')">
              </div>
              <div class="form-check switch-select me-3">
                <input
                  id="switcher-primary3"
                  class="form-check-input color-input color-primary-4"
                  type="radio"
                  name="theme-primary"
                  :checked="switcher.themePrimary == '78, 172, 76' ? true : false"
                  @click="themePrimaryFn('78, 172, 76')">
              </div>
              <div class="form-check switch-select me-3">
                <input
                  id="switcher-primary4"
                  class="form-check-input color-input color-primary-5"
                  type="radio"
                  name="theme-primary"
                  :checked="switcher.themePrimary == '223, 90, 90' ? true : false"
                  @click="themePrimaryFn('223, 90, 90')">
              </div>
              <div class="form-check switch-select ps-0 mt-1 color-primary-light">
                <color-picker
                  v-model:dynamic-primary-color="dynamicPrimaryColor"
                  shape="circle"
                  format="rgb"
                  picker-type="chrome"
                  use-type="pure"
                  :disable-alpha="true"
                  @update:pure-color="primaryColorFn" />
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between canvas-footer flex-wrap">
          <a
            href="https://themeforest.net/item/spruha-vue-admin-template/42292919"
            class="btn btn-primary m-1">
            Buy Now
          </a>
          <a
            href="https://themeforest.net/user/spruko/portfolio"
            class="btn btn-info m-1">
            Our Portfolio
          </a>
          <a
            id="reset-all"
            href="javascript:void(0);"
            class="btn btn-secondary m-1"
            @click="reset()">
            Reset
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- End Switcher -->
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { menuData } from "@/data/menuData"
import { switcherStore } from "@/stores/switcher.ts"

export default defineComponent({
  data () {
    return {
      menuData,
      switcher: reactive(switcherStore()),
      dynamicPrimaryColor: ref("black"),
      dynamicBackgroundColor: ref("black"),
    }
  },
  mounted () {
    this.custompageLocalStorage()
    console.log(this.switcher)
  },
  methods: {
    primaryColorFn (color: any) {
      let primaryRgb = this.convertRgbToIndividual(color)

      this.themePrimaryFn(primaryRgb)
    },
    convertRgbToIndividual (value: string) {
      // Use a regular expression to extract the numeric values
      const numericValues = value.match(/\d+/g)

      // Join the numeric values with spaces to get the desired format
      return numericValues!.join(" ")
    },
    colorthemeFn (value: string) {
      this.switcher.colorthemeFn(value)
      localStorage.setItem("spruhacolortheme", value)
      if (value == "dark") {
        localStorage.setItem("spruhaHeader", "dark")
        localStorage.setItem("spruhaMenu", "dark")
      } else {
        localStorage.removeItem("spruhaHeader")
        localStorage.removeItem("spruhaMenu")
      }
    },
    directionFn (value: string) {
      this.switcher.directionFn(value)
      localStorage.setItem("spruhadirection", value)
    },
    closeMenuFn () {
      const closeMenuRecursively = (items: any[]) => {
        items?.forEach((item: { active: boolean; children: any; }) => {
          item.active = false
          closeMenuRecursively(item.children)
        })
      }

      closeMenuRecursively(this.menuData)
    },
    themePrimaryFn (value: any) { this.switcher.themePrimaryFn(value) },
    reset () {
      this.switcher.$reset()
      this.switcher.custompageReset()
    },

    custompageLocalStorage () {
      this.switcher.custompageLocalStorage()
    },
  },
})
</script>
<style lang="">

</style>