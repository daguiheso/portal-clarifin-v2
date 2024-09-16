<template lang="">
  <!-- Start Switcher -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="switcher-canvas" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header border-bottom">
          <h5 class="offcanvas-title text-default" id="offcanvasRightLabel">Switcher</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
          <nav class="border-bottom border-block-end-dashed">
              <div class="nav nav-tabs nav-justified" id="switcher-main-tab" role="tablist">
                  <button class="nav-link active" id="switcher-home-tab" data-bs-toggle="tab" data-bs-target="#switcher-home"
                      type="button" role="tab" aria-controls="switcher-home" aria-selected="true">Theme Styles</button>
              </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active border-0" id="switcher-home" role="tabpanel" aria-labelledby="switcher-home-tab"
                  tabindex="0">
                  <div class="">
                      <p class="switcher-style-head">Theme Color Mode:  {{switcher.colortheme}}  </p>
                      <div class="row switcher-style gx-0">
                          <div class="col-4">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-light-theme">
                                      Light
                                  </label>
                                  <input @click="colorthemeFn('light')" class="form-check-input" type="radio" name="theme-style" id="switcher-light-theme"
                                      :checked="switcher.colortheme == 'light' ? true : false">
                              </div>
                          </div>
                          <div class="col-4">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-dark-theme">
                                      Dark
                                  </label>
                                  <input @click="colorthemeFn('dark')" class="form-check-input" type="radio" name="theme-style" id="switcher-dark-theme"
                                      :checked="switcher.colortheme == 'dark' ? true : false">
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="">
                      <p class="switcher-style-head">Directions: {{switcher.direction}}</p>
                      <div class="row switcher-style gx-0">
                          <div class="col-4">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-ltr">
                                      LTR
                                  </label>
                                  <input @click="directionFn('ltr')" class="form-check-input" type="radio" name="direction" id="switcher-ltr" :checked="switcher.direction == 'ltr' ? true : false">
                              </div>
                          </div>
                          <div class="col-4">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-rtl">
                                      RTL
                                  </label>
                                  <input @click="directionFn('rtl')" class="form-check-input" type="radio" name="direction" id="switcher-rtl" :checked="switcher.direction == 'rtl' ? true : false">
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="sidemenu-layout-styles">
                      <p class="switcher-style-head">Sidemenu Layout Styles:</p>
                      <div class="row switcher-style gx-0 pb-2 gy-2">
                          <div class="col-sm-6">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-default-menu">
                                      Default Menu
                                  </label>
                                  <input @click="layoutStylesFn('default-menu')" class="form-check-input" type="radio" name="sidemenu-layout-styles"
                                      id="switcher-default-menu" :checked="switcher.layoutStyles == 'default-menu' ? true : false">
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-closed-menu">
                                      Closed Menu
                                  </label>
                                  <input @click="layoutStylesFn('closed-menu')" class="form-check-input" type="radio" name="sidemenu-layout-styles"
                                      id="switcher-closed-menu" :checked="switcher.layoutStyles == 'closed-menu' ? true : false">
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-icontext-menu">
                                      Icon Text
                                  </label>
                                  <input @click="layoutStylesFn('icontext-menu')" class="form-check-input" type="radio" name="sidemenu-layout-styles"
                                      id="switcher-icontext-menu" :checked="switcher.layoutStyles == 'icontext-menu' ? true : false">
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-icon-overlay">
                                      Icon Overlay
                                  </label>
                                  <input @click="layoutStylesFn('icon-overlay')" class="form-check-input" type="radio" name="sidemenu-layout-styles"
                                      id="switcher-icon-overlay" :checked="switcher.layoutStyles == 'icon-overlay' ? true : false">
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-detached">
                                      Detached
                                  </label>
                                  <input @click="layoutStylesFn('detached')" class="form-check-input" type="radio" name="sidemenu-layout-styles"
                                      id="switcher-detached" :checked="switcher.layoutStyles == 'detached' ? true : false">
                              </div>
                          </div>
                          <div class="col-sm-6">
                              <div class="form-check switch-select">
                                  <label class="form-check-label" for="switcher-double-menu">
                                      Double Menu
                                  </label>
                                  <input @click="layoutStylesFn('double-menu')" class="form-check-input" type="radio" name="sidemenu-layout-styles"
                                      id="switcher-double-menu" :checked="switcher.layoutStyles == 'double-menu' ? true : false">
                              </div>
                          </div>
                      </div>
                  </div>

                      <div class="theme-colors">
                          <p class="switcher-style-head">Theme Primary:</p>
                          <div class="d-flex flex-wrap align-items-center switcher-style">
                              <div class="form-check switch-select me-3">
                                  <input @click="themePrimaryFn('58, 88, 146')" class="form-check-input color-input color-primary-1" type="radio"
                                      name="theme-primary" id="switcher-primary" :checked="switcher.themePrimary == '58, 88, 146' ? true : false">
                              </div>
                              <div class="form-check switch-select me-3">
                                  <input @click="themePrimaryFn('92, 144, 163')" class="form-check-input color-input color-primary-2" type="radio"
                                      name="theme-primary" id="switcher-primary1" :checked="switcher.themePrimary == '92, 144, 163' ? true : false">
                              </div>
                              <div class="form-check switch-select me-3">
                                  <input @click="themePrimaryFn('161, 90, 223')" class="form-check-input color-input color-primary-3" type="radio" name="theme-primary"
                                      id="switcher-primary2" :checked="switcher.themePrimary == '161, 90, 223' ? true : false">
                              </div>
                              <div class="form-check switch-select me-3">
                                  <input @click="themePrimaryFn('78, 172, 76')" class="form-check-input color-input color-primary-4" type="radio" name="theme-primary"
                                      id="switcher-primary3" :checked="switcher.themePrimary == '78, 172, 76' ? true : false">
                              </div>
                              <div class="form-check switch-select me-3">
                                  <input @click="themePrimaryFn('223, 90, 90')" class="form-check-input color-input color-primary-5" type="radio" name="theme-primary"
                                      id="switcher-primary4" :checked="switcher.themePrimary == '223, 90, 90' ? true : false">
                              </div>
                              <div class="form-check switch-select ps-0 mt-1 color-primary-light">
                                  <color-picker @update:pureColor="primaryColorFn" v-model:dynamicPrimaryColor="dynamicPrimaryColor" shape="circle" format="rgb" pickerType="chrome"
                                      useType="pure" :disableAlpha="true" />
                              </div>
                          </div>
                      </div>
              </div>

              <div class="d-flex justify-content-between canvas-footer flex-wrap">
                <a href="https://themeforest.net/item/spruha-vue-admin-template/42292919" class="btn btn-primary m-1">Buy Now</a>
                <a href="https://themeforest.net/user/spruko/portfolio" class="btn btn-info m-1">Our Portfolio</a>
                <a href="javascript:void(0);" id="reset-all" @click="reset()" class="btn btn-secondary m-1">Reset</a>
            </div>
          </div>
      </div>
  </div>
  <!-- End Switcher -->
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { menuData } from '@/data/menuData';
import { switcherStore } from '@/stores/switcher.ts';

export default defineComponent({
    data() {
        return {
            menuData,
            switcher: reactive(switcherStore()),
            dynamicPrimaryColor: ref("black"),
            dynamicBackgroundColor: ref("black"),
        }
    },
    methods: {
        primaryColorFn(color: any) {
            let primaryRgb = this.convertRgbToIndividual(color);
            this.themePrimaryFn(primaryRgb);
        },
        convertRgbToIndividual(value: string) {
            // Use a regular expression to extract the numeric values
            const numericValues = value.match(/\d+/g);
            // Join the numeric values with spaces to get the desired format
            return numericValues!.join(' ');
        },
        colorthemeFn(value: string) {
            this.switcher.colorthemeFn(value);
            localStorage.setItem("spruhacolortheme", value);
            if (value == 'dark') {
                localStorage.setItem("spruhaHeader", 'dark');
                localStorage.setItem("spruhaMenu", 'dark');
            } else {
                localStorage.removeItem("spruhaHeader");
                localStorage.removeItem("spruhaMenu");
            }
        },
        directionFn(value: string) {
            this.switcher.directionFn(value);
            localStorage.setItem('spruhadirection', value);
        },
        closeMenuFn() {
            const closeMenuRecursively = (items: any[]) => {
                items?.forEach((item: { active: boolean; children: any; }) => {
                    item.active = false;
                    closeMenuRecursively(item.children);
                });
            };
            closeMenuRecursively(this.menuData);
        },
        themePrimaryFn(value: any) { this.switcher.themePrimaryFn(value); },
        reset() {
            this.switcher.$reset();
            this.switcher.custompageReset();
        },

        custompageLocalStorage() {
            this.switcher.custompageLocalStorage();
        },
    },
    mounted() {
        this.custompageLocalStorage();
        console.log(this.switcher);
    },
})
</script>
<style lang="">

</style>