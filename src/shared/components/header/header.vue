<template>
  <header class="app-header">

    <!-- Start::main-header-container -->
    <div class="main-header-container container-fluid">

      <!-- Start::header-content-left -->
      <div class="header-content-left">

        <!-- Start::header-element -->
        <div class="header-element">
          <div class="horizontal-logo">
            <router-link
              :to="`/dashboard`"
              class="header-logo">
              <img
                src="@/assets/images/brand-logos/desktop-logo.png"
                alt="logo"
                class="desktop-logo">
              <img
                src="@/assets/images/brand-logos/toggle-logo.png"
                alt="logo"
                class="toggle-logo">
              <img
                src="@/assets/images/brand-logos/desktop-dark.png"
                alt="logo"
                class="desktop-dark">
              <img
                src="@/assets/images/brand-logos/toggle-dark.png"
                alt="logo"
                class="toggle-dark">
              <img
                src="@/assets/images/brand-logos/desktop-white.png"
                alt="logo"
                class="desktop-white">
              <img
                src="@/assets/images/brand-logos/toggle-white.png"
                alt="logo"
                class="toggle-white">
            </router-link>
          </div>
        </div>
        <!-- End::header-element -->

        <!-- Start::header-element -->
        <div class="header-element">
          <!-- Start::header-link -->
          <a
            aria-label="Hide Sidebar"
            class="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
            href="javascript:void(0);"
            @click="ToggleMenu">
            <span />
          </a>
          <!-- End::header-link -->
        </div>
        <!-- End::header-element -->

      </div>
      <!-- End::header-content-left -->

      <!-- Start::header-content-right -->
      <div class="header-content-right">

        <!-- Start::header-element -->
        <div class="header-element header-theme-mode">
          <!-- Start::header-link|layout-setting -->
          <a
            href="javascript:void(0);"
            class="header-link layout-setting">
            <span
              class="light-layout"
              @click="colorthemeFn('dark')">
              <!-- Start::header-link-icon -->
              <i class="fe fe-moon header-link-icon lh-2" />
              <!-- End::header-link-icon -->
            </span>
            <span
              class="dark-layout"
              @click="colorthemeFn('light')">
              <!-- Start::header-link-icon -->
              <i class="fe fe-sun header-link-icon lh-2" />
              <!-- End::header-link-icon -->
            </span>
          </a>
          <!-- End::header-link|layout-setting -->
        </div>
        <!-- End::header-element -->

        <!-- Start::header-element -->
        <div class="header-element header-fullscreen  d-xl-flex d-none">
          <!-- Start::header-link -->
          <a
            href="javascript:void(0);"
            class="header-link"
            @click="toggleFullScreen();">
            <i
              v-if="!isFullScreen"
              class="fe fe-maximize full-screen-open header-link-icon" />
            <i
              v-if="isFullScreen"
              class="fe fe-minimize full-screen-close header-link-icon" />
          </a>
          <!-- End::header-link -->
        </div>
        <!-- End::header-element -->

        <!-- Start::header-element -->
        <div class="header-element">
          <!-- Start::header-link|dropdown-toggle -->
          <a
            id="mainHeaderProfile"
            href="javascript:void(0);"
            class="header-link dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false">
            <div class="d-flex align-items-center">
              <div class="header-link-icon">
                <img
                  src="@/assets/images/faces/1.jpg"
                  alt="img"
                  width="32"
                  height="32"
                  class="rounded-circle">
              </div>
              <div class="d-none">
                <p class="fw-semibold mb-0">Angelica</p>
                <span class="op-7 fw-normal d-block fs-11">Web Designer</span>
              </div>
            </div>
          </a>
          <!-- End::header-link|dropdown-toggle -->
          <ul
            class="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
            aria-labelledby="mainHeaderProfile">
            <li>
              <div class="header-navheading border-bottom">
                <h6 class="main-notification-title">
                  Sonia Taylor
                </h6>
                <p class="main-notification-text mb-0">
                  Web Designer
                </p>
              </div>
            </li>
            <li>
              <router-link
                class="dropdown-item d-flex border-bottom"
                :to="`/pages/profile`">
                <i
                  class="fe fe-user fs-16 align-middle me-2" />Profile
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item d-flex border-bottom"
                :to="`/apps/mail/mailinbox`">
                <i
                  class="fe fe-inbox fs-16 align-middle me-2" />Inbox <span
                  class="badge bg-success ms-auto">
                  25
                </span>
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item d-flex border-bottom"
                :to="`/pages/settings`">
                <i
                  class="fe fe-settings fs-16 align-middle me-2" />Settings
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item d-flex border-bottom"
                :to="`/advancedui/chat`">
                <i
                  class="fe fe-headphones fs-16 align-middle me-2" />Support
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item d-flex"
                :to="`/custompages/signin`">
                <i
                  class="fe fe-power fs-16 align-middle me-2" />Log
                Out
              </router-link>
            </li>
          </ul>
        </div>
        <!-- End::header-element -->

      </div>
      <!-- End::header-content-right -->

    </div>
    <!-- End::main-header-container -->

  </header>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"
import { switcherStore } from "@/stores/switcher.ts"

const isFullScreen = ref(false)

const switcher = switcherStore()

const colorthemeFn = (value: any) => {
  localStorage.setItem("spruhacolortheme", value)
  switcher.colorthemeFn(value)
  localStorage.removeItem("spruhabodylightRGB")
  localStorage.removeItem("spruhabodyBgRGB")
}

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

onMounted(() => {
  document.addEventListener("fullscreenchange", fullscreenchanged)
})

const ToggleMenu = () => {
  let html = document.querySelector("html")!

  if (window.innerWidth <= 992) {
    let dataToggled = html.getAttribute("data-toggled")

    if (dataToggled == "open") {
      html.setAttribute("data-toggled", "close")
    } else {
      html.setAttribute("data-toggled", "open")
    }
  } else {
    let menuNavLayoutType = html.getAttribute("data-nav-style")
    let verticalStyleType = html.getAttribute("data-vertical-style")

    if (menuNavLayoutType) {
      let dataToggled = html.getAttribute("data-toggled")

      if (dataToggled) {
        html.removeAttribute("data-toggled")
      } else {
        html.setAttribute("data-toggled", menuNavLayoutType + "-closed")
      }
    } else if (verticalStyleType) {
      let dataToggled = html.getAttribute("data-toggled")

      if (verticalStyleType == "doublemenu") {
        if (html.getAttribute("data-toggled") === "double-menu-open" && document.querySelector(".double-menu-active")) {
          html.setAttribute("data-toggled", "double-menu-close")
        } else {
          if (document.querySelector(".double-menu-active")) {
            html.setAttribute("data-toggled", "double-menu-open")
          }
        }
      } else if (dataToggled) {
        html.removeAttribute("data-toggled")
      } else {
        const attributeMap = {
          closed: "close-menu-close",
          icontext: "icon-text-close",
          overlay: "icon-overlay-close",
          detached: "detached-close"
        }

        const toggledValue = attributeMap[verticalStyleType as keyof typeof attributeMap]

        if (toggledValue) {
          html.setAttribute("data-toggled", toggledValue)
        }
      }
    }
  }
}

const toggleFullScreen = () => {
  const element = document.documentElement // Full-screen target element

  if (document.fullscreenElement) {
    // If in full-screen mode, exit it
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  } else {
    // If not in full-screen mode, enter it
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
  }
}

const fullscreenchanged = () => {
  if (document.fullscreenElement) {
    isFullScreen.value = true
  } else {
    isFullScreen.value = false
  }
}
//sticky-pin
const handleScroll = () => {
  if (window.scrollY > 30) {
    let Scolls = document.querySelectorAll(".sticky")

    Scolls.forEach((e) => {
      e.classList.add("sticky-pin")
    })
  } else {
    let Scolls = document.querySelectorAll(".sticky")

    Scolls.forEach((e) => {
      e.classList.remove("sticky-pin")
    })
  }
}

window.addEventListener("scroll", handleScroll)
handleScroll()
</script>
