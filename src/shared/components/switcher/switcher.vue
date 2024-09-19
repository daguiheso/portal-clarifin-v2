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
          <button
            id="switcher-profile-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#switcher-profile"
            type="button"
            role="tab"
            aria-controls="switcher-profile"
            aria-selected="false">
            Theme Colors
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
              Theme Color Mode:
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
              Directions:
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
          <div class="">
            <p class="switcher-style-head">
              Navigation Styles:
            </p>
            <div class="row switcher-style gx-0">
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-vertical">
                    Vertical
                  </label>
                  <input
                    id="switcher-vertical"
                    class="form-check-input"
                    type="radio"
                    name="navigation-style"
                    :checked="switcher.navigationStyles == 'vertical' ? true : false"
                    @click="navigationStylesFn('vertical')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-horizontal">
                    Horizontal
                  </label>
                  <input
                    id="switcher-horizontal"
                    class="form-check-input"
                    type="radio"
                    name="navigation-style"
                    :checked="switcher.navigationStyles == 'horizontal' ? true : false"
                    @click="navigationStylesFn('horizontal')">
                </div>
              </div>
            </div>
          </div>
          <div class="navigation-menu-styles">
            <p class="switcher-style-head">
              Vertical & Horizontal Menu Styles:
            </p>
            <div class="row switcher-style gx-0 pb-2 gy-2">
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-menu-click">
                    Menu Click
                  </label>
                  <input
                    id="switcher-menu-click"
                    class="form-check-input"
                    type="radio"
                    name="navigation-menu-styles"
                    :checked="switcher.menuStyles == 'menu-click' ? true : false"
                    @click="menuStylesFn('menu-click')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-menu-hover">
                    Menu Hover
                  </label>
                  <input
                    id="switcher-menu-hover"
                    class="form-check-input"
                    type="radio"
                    name="navigation-menu-styles"
                    :checked="switcher.menuStyles == 'menu-hover' ? true : false"
                    @click="menuStylesFn('menu-hover')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-icon-click">
                    Icon Click
                  </label>
                  <input
                    id="switcher-icon-click"
                    class="form-check-input"
                    type="radio"
                    name="navigation-menu-styles"
                    :checked="switcher.menuStyles == 'icon-click' ? true : false"
                    @click="menuStylesFn('icon-click')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-icon-hover">
                    Icon Hover
                  </label>
                  <input
                    id="switcher-icon-hover"
                    class="form-check-input"
                    type="radio"
                    name="navigation-menu-styles"
                    :checked="switcher.menuStyles == 'icon-hover' ? true : false"
                    @click="menuStylesFn('icon-hover')">
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
          <div class="">
            <p class="switcher-style-head">
              Page Styles:
            </p>
            <div class="row switcher-style gx-0">
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-regular">
                    Regular
                  </label>
                  <input
                    id="switcher-regular"
                    class="form-check-input"
                    type="radio"
                    name="page-styles"
                    :checked="switcher.pageStyles == 'regular' ? true : false"
                    @click="pageStylesFn('regular')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-classic">
                    Classic
                  </label>
                  <input
                    id="switcher-classic"
                    class="form-check-input"
                    type="radio"
                    name="page-styles"
                    :checked="switcher.pageStyles == 'classic' ? true : false"
                    @click="pageStylesFn('classic')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-modern">
                    Modern
                  </label>
                  <input
                    id="switcher-modern"
                    class="form-check-input"
                    type="radio"
                    name="page-styles"
                    :checked="switcher.pageStyles == 'modern' ? true : false"
                    @click="pageStylesFn('modern')">
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <p class="switcher-style-head">
              Layout Width Styles:
            </p>
            <div class="row switcher-style gx-0">
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-full-width">
                    Full Width
                  </label>
                  <input
                    id="switcher-full-width"
                    class="form-check-input"
                    type="radio"
                    name="layout-width"
                    :checked="switcher.widthStyles == 'fullwidth' ? true : false"
                    @click="widthStylesFn('full-width')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-boxed">
                    Boxed
                  </label>
                  <input
                    id="switcher-boxed"
                    class="form-check-input"
                    type="radio"
                    name="layout-width"
                    :checked="switcher.widthStyles == 'boxed' ? true : false"
                    @click="widthStylesFn('boxed')">
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <p class="switcher-style-head">
              Menu Positions:
            </p>
            <div class="row switcher-style gx-0">
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-menu-fixed">
                    Fixed
                  </label>
                  <input
                    id="switcher-menu-fixed"
                    class="form-check-input"
                    type="radio"
                    name="menu-positions"
                    :checked="switcher.menuPosition == 'fixed' ? true : false"
                    @click="menuPositionFn('fixed')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-menu-scroll">
                    Scrollable
                  </label>
                  <input
                    id="switcher-menu-scroll"
                    class="form-check-input"
                    type="radio"
                    name="menu-positions"
                    :checked="switcher.menuPosition == 'scrollable' ? true : false"
                    @click="menuPositionFn('scrollable')">
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <p class="switcher-style-head">
              Header Positions:
            </p>
            <div class="row switcher-style gx-0">
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-header-fixed">
                    Fixed
                  </label>
                  <input
                    id="switcher-header-fixed"
                    class="form-check-input"
                    type="radio"
                    name="header-positions"
                    :checked="switcher.headerPosition == 'fixed' ? true : false"
                    @click="headerPositionFn('fixed')">
                </div>
              </div>
              <div class="col-4">
                <div class="form-check switch-select">
                  <label
                    class="form-check-label"
                    for="switcher-header-scroll">
                    Scrollable
                  </label>
                  <input
                    id="switcher-header-scroll"
                    class="form-check-input"
                    type="radio"
                    name="header-positions"
                    :checked="switcher.headerPosition == 'scrollable' ? true : false"
                    @click="headerPositionFn('scrollable')">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="switcher-profile"
          class="tab-pane fade border-0"
          role="tabpanel"
          aria-labelledby="switcher-profile-tab"
          tabindex="0">
          <div>
            <div class="theme-colors">
              <p class="switcher-style-head">
                Menu Colors: <b>{{ switcher.menuColor }}</b>
              </p>
              <div class="d-flex switcher-style pb-2">
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-menu-light"
                    class="form-check-input color-input color-white"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Light Menu"
                    type="radio"
                    name="menu-colors"
                    :checked="switcher.menuColor == 'light' ? true : false"
                    @click="menuColorFn('light')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-menu-dark"
                    class="form-check-input color-input color-dark"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Dark Menu"
                    type="radio"
                    name="menu-colors"
                    :checked="switcher.menuColor == 'dark' ? true : false"
                    @click="menuColorFn('dark')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-menu-primary"
                    class="form-check-input color-input color-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Color Menu"
                    type="radio"
                    name="menu-colors"
                    :checked="switcher.menuColor == 'color' ? true : false"
                    @click="menuColorFn('color')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-menu-gradient"
                    class="form-check-input color-input color-gradient"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Gradient Menu"
                    type="radio"
                    name="menu-colors"
                    :checked="switcher.menuColor == 'gradient' ? true : false"
                    @click="menuColorFn('gradient')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-menu-transparent"
                    class="form-check-input color-input color-transparent"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Transparent Menu"
                    type="radio"
                    name="menu-colors"
                    :checked="switcher.menuColor == 'transparent' ? true : false"
                    @click="menuColorFn('transparent')">
                </div>
              </div>
              <div class="px-4 pb-3 text-muted fs-11">
                Note:If you want to change color Menu dynamically change from below Theme Primary color picker
              </div>
            </div>
            <div class="theme-colors">
              <p class="switcher-style-head">
                Header Colors: <b>{{ switcher.headerColor }}</b>
              </p>
              <div class="d-flex switcher-style pb-2">
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-header-light"
                    class="form-check-input color-input color-white"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Light Header"
                    type="radio"
                    name="header-colors"
                    :checked="switcher.headerColor == 'light' ? true : false"
                    @click="headerColorFn('light')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-header-dark"
                    class="form-check-input color-input color-dark"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Dark Header"
                    type="radio"
                    name="header-colors"
                    :checked="switcher.headerColor == 'dark' ? true : false"
                    @click="headerColorFn('dark')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-header-primary"
                    class="form-check-input color-input color-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Color Header"
                    type="radio"
                    name="header-colors"
                    :checked="switcher.headerColor == 'color' ? true : false"
                    @click="headerColorFn('color')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-header-gradient"
                    class="form-check-input color-input color-gradient"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Gradient Header"
                    type="radio"
                    name="header-colors"
                    :checked="switcher.headerColor == 'gradient' ? true : false"
                    @click="headerColorFn('gradient')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-header-transparent"
                    class="form-check-input color-input color-transparent"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Transparent Header"
                    type="radio"
                    name="header-colors"
                    :checked="switcher.headerColor == 'transparent' ? true : false"
                    @click="headerColorFn('transparent')">
                </div>
              </div>
              <div class="px-4 pb-3 text-muted fs-11">
                Note:If you want to change color Header dynamically change from below Theme Primary color picker
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
            <div class="theme-colors">
              <p class="switcher-style-head">
                Theme Background:
              </p>
              <div class="d-flex flex-wrap align-items-center switcher-style">
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-background"
                    class="form-check-input color-input color-bg-1"
                    type="radio"
                    :checked="switcher.themeBackground == `20, 30, 96, 25, 38, 101` ? true : false"
                    name="theme-background"
                    @click="themeBackgroundFn('20, 30, 96', '25, 38, 101')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-background1"
                    class="form-check-input color-input color-bg-2"
                    type="radio"
                    :checked="switcher.themeBackground == `8, 78, 115, 13, 86, 120` ? true : false"
                    name="theme-background"
                    @click="themeBackgroundFn('8, 78, 115', '13, 86, 120')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-background2"
                    class="form-check-input color-input color-bg-3"
                    type="radio"
                    :checked="switcher.themeBackground == `90, 37, 135, 95, 45, 140` ? true : false"
                    name="theme-background"
                    @click="themeBackgroundFn('90, 37, 135', '95, 45, 140')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-background3"
                    class="form-check-input color-input color-bg-4"
                    type="radio"
                    :checked="switcher.themeBackground == `24, 101, 51, 29, 109, 56` ? true : false"
                    name="theme-background"
                    @click="themeBackgroundFn('24, 101, 51', '29, 109, 56')">
                </div>
                <div class="form-check switch-select me-3">
                  <input
                    id="switcher-background4"
                    class="form-check-input color-input color-bg-5"
                    type="radio"
                    :checked="switcher.themeBackground == `120, 66, 20, 125, 74, 25` ? true : false"
                    name="theme-background"
                    @click="themeBackgroundFn('120, 66, 20', '125, 74, 25')">
                </div>
                <div class="form-check switch-select ps-0 mt-1 tooltip-static-demo color-bg-transparent">
                  <color-picker
                    v-model="dynamicBackgroundColor"
                    shape="circle"
                    format="rgb"
                    picker-type="chrome"
                    use-type="pure"
                    :disable-alpha="true"
                    @update:pure-color="dynamicBackgroundColorFn">
                    <i class="icon">ICON_HERE</i>
                  </color-picker>
                </div>
              </div>
            </div>
            <div class="menu-image mb-3">
              <p class="switcher-style-head">
                Menu With Background Image:
              </p>
              <div class="d-flex flex-wrap align-items-center switcher-style">
                <div class="form-check switch-select m-2">
                  <input
                    id="switcher-bg-img"
                    class="form-check-input bgimage-input bg-img1"
                    type="radio"
                    name="theme-background"
                    :checked="switcher.backgroundImage == 'bgimg1' ? true : false"
                    @click="backgroundImageFn('bgimg1')">
                </div>
                <div class="form-check switch-select m-2">
                  <input
                    id="switcher-bg-img1"
                    class="form-check-input bgimage-input bg-img2"
                    type="radio"
                    name="theme-background"
                    :checked="switcher.backgroundImage == 'bgimg2' ? true : false"
                    @click="backgroundImageFn('bgimg2')">
                </div>
                <div class="form-check switch-select m-2">
                  <input
                    id="switcher-bg-img2"
                    class="form-check-input bgimage-input bg-img3"
                    type="radio"
                    name="theme-background"
                    :checked="switcher.backgroundImage == 'bgimg3' ? true : false"
                    @click="backgroundImageFn('bgimg3')">
                </div>
                <div class="form-check switch-select m-2">
                  <input
                    id="switcher-bg-img3"
                    class="form-check-input bgimage-input bg-img4"
                    type="radio"
                    name="theme-background"
                    :checked="switcher.backgroundImage == 'bgimg4' ? true : false"
                    @click="backgroundImageFn('bgimg4')">
                </div>
                <div class="form-check switch-select m-2">
                  <input
                    id="switcher-bg-img4"
                    class="form-check-input bgimage-input bg-img5"
                    type="radio"
                    name="theme-background"
                    :checked="switcher.backgroundImage == 'bgimg5' ? true : false"
                    @click="backgroundImageFn('bgimg5')">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center  canvas-footer flex-wrap">
          <a
            id="reset-all"
            href="javascript:void(0);"
            class="btn btn-secondary d-flex m-1"
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
    this.retrieveFromLocalStorage()
  },
  methods: {
    primaryColorFn (color: any) {
      let primaryRgb = this.convertRgbToIndividual(color)

      this.themePrimaryFn(primaryRgb)
    },
    dynamicBackgroundColorFn (color: any) {
      let bgRgb = this.convertRgbToIndividual(color)
      let bgRgb2 = this.convertRgbToIndividual(color)
      let bg1Update = bgRgb.split(", ").join(", ")
      let bg2Update = bgRgb2.split(", ")

      bg2Update[0] = Number(bg2Update[0]) + 14
      bg2Update[1] = Number(bg2Update[1]) + 14
      bg2Update[2] = Number(bg2Update[2]) + 14
      this.themeBackgroundFn(bg1Update, bg2Update.join(", "))
    },
    convertRgbToIndividual (value: any) {
      // Use a regular expression to extract the numeric values
      const numericValues = value.match(/\d+/g)

      // Join the numeric values with spaces to get the desired format
      return numericValues.join(", ")
    },
    colorthemeFn (value: any) {
      this.switcher.colorthemeFn(value)

      localStorage.removeItem("spruhabodylightRGB")
      localStorage.removeItem("spruhabodyBgRGB")
      localStorage.setItem("spruhacolortheme", value)
      if (value == "dark") {
        localStorage.setItem("spruhaHeader", "dark")
        localStorage.setItem("spruhaMenu", "dark")
      } else {
        localStorage.removeItem("spruhaHeader")
        localStorage.removeItem("spruhaMenu")
      }
    },
    directionFn (value: any) {
      this.switcher.directionFn(value)
      localStorage.setItem("spruhadirection", value)
    },
    navigationStylesFn (value: any) {
      this.switcher.navigationStylesFn(value)
      localStorage.setItem("spruhanavstyles", value)
    },
    closeMenuFn () {
      const closeMenuRecursively = (items: any) => {
        items?.forEach((item: any) => {
          item.active = false
          closeMenuRecursively(item.children)
        })
      }

      closeMenuRecursively(this.menuData)
    },
    menuStylesFn (value: any) {
      this.switcher.menuStylesFn(value)
      localStorage.setItem("spruhamenuStyles", value)
      if (value == "menu-hover" || value == "icon-hover") {
        this.closeMenuFn()
      }
    },
    layoutStylesFn (value: string) {
      this.switcher.layoutStylesFn(value)
      localStorage.setItem("spruhaverticalstyles", value)
      if (value == "horizontal") {
        this.closeMenuFn()
      }
    },
    pageStylesFn (value: string) {
      this.switcher.pageStylesFn(value)
      localStorage.setItem("spruhapageStyle", value)
    },
    widthStylesFn (value: string) {
      this.switcher.widthStylesFn(value)
      localStorage.setItem("spruhawidthStyles", value)
    },
    menuPositionFn (value: string) {
      this.switcher.menuPositionFn(value)
      localStorage.setItem("spruhamenuposition", value)
    },
    headerPositionFn (value: string) {
      this.switcher.headerPositionFn(value)
      localStorage.setItem("spruhaheaderposition", value)
    },
    menuColorFn (value: string) {
      this.switcher.menuColorFn(value)
      localStorage.setItem("spruhaMenu", value)
    },
    headerColorFn (value: string) {
      this.switcher.headerColorFn(value)
      localStorage.setItem("spruhaHeader", value)
    },
    themePrimaryFn (value: any) { this.switcher.themePrimaryFn(value) },
    themeBackgroundFn (val1: any, val2: any) { this.switcher.themeBackgroundFn(val1, val2); localStorage.removeItem("spruhaHeader"); localStorage.removeItem("spruhaMenu") },
    backgroundImageFn (value: string) {
      this.switcher.backgroundImageFn(value)
      localStorage.setItem("spruhabgimg", value)
    },
    reset () {
      this.switcher.$reset()
      this.switcher.reset()
    },

    retrieveFromLocalStorage () {
      this.switcher.retrieveFromLocalStorage()
    },
  },
})
</script>
<style lang="">

</style>