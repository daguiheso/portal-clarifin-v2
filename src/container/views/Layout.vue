<template>
  <main>
    <Transition
      mode="out-in"
      name="fade"
      :duration="100">

      <Loader v-if="isGlobalLoading" />

      <section
        v-else
        class="co-layout d-flex">
        <div
          class="co-layout__menu"
          :class="{ 'co-layout__menu--collapsed': store.isMenuCollapsed }">
          <SideMenu
            :key="`${showLayout}`"
            v-model="store.isMenuCollapsed"
            v-model:showLayout="showLayout" />
        </div>

        <div
          class="co-layout__content"
          :class="{ 'co-layout__content--collapsed': store.isMenuCollapsed }">

          <Header />

          <aside
            :key="`${showLayout}`"
            class="co-container co-px-32 co-mt-30">
            <Transition
              name="fade"
              mode="in-out"
              :duration="100">
              <RouterView
                v-slot="{ Component, route }">
                <Transition
                  name="fade"
                  mode="out-in"
                  :duration="50">
                  <div
                    :key="route.name!"
                    class="co-mb-24">
                    <component :is="Component" />
                  </div>
                </Transition>
              </RouterView>
            </Transition>
          </aside>
        </div>
      </section>
    </Transition>

    <CobreModalAction
      ref="semiBlockingModal"
      icon="error"
      size="xs"
      :has-close-button="false"
      :title="store?.semiBlockingError?.title ?? ''"
      :description="store?.semiBlockingError?.message ?? ''"
      :label-primary="$t('errors.semiblockingModal.primary')"
      :label-secondary="$t('errors.semiblockingModal.secondary')"
      @click-primary="actionErrorSemiBlockingModal('PRIMARY')"
      @click-secondary="actionErrorSemiBlockingModal('SECONDARY')" />

    <CobreModalAction
      ref="actionResultModal"
      :icon="store.actionResult?.icon ?? undefined"
      size="xs"
      :title="store?.actionResult?.title ?? ''"
      :description="store?.actionResult?.message ?? ''"
      :label-primary="store?.actionResult.labelPrimary ?? ''"
      :label-secondary="store?.actionResult?.labelSecondary ?? ''"
      :theme-btn-primary="store?.actionResult?.themeBtnPrimary ?? 'primary'"
      :is-loading-btn-primary="store?.actionResult?.isLoadingBtnPrimary ?? false"
      @click-primary="handleActionResultPrimary"
      @click-secondary="handleActionResultSecondary" />
    <IdleHandling v-if="showIdleHandling" />

  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useRouter, RouterView } from "vue-router"

import { CobreSideMenu, CobreModalAction } from "@cobre-npm/ds-v3"

import IdleHandling from "@/container/components/IdleHandling.vue"
import useErrorManagement from "@/hooks/useErrorManagement"
import useSplit from "@/hooks/useSplit"
import useProfileMe from "@/hooks/useProfileMe"

import Loader from "@/commons/components/Loader.vue"
import useContainerStore from "../store"
import SideMenu from "../components/SideMenu.vue"
import Header from "../components/Header.vue"

const store = useContainerStore()
const router = useRouter()
const { handlePrimaryAction, handleContactSupport } = useErrorManagement()
const { setClientId } = useProfileMe()
const { initSplit, getTreatment } = useSplit()

const showLayout = ref(true)
const isGlobalLoading = ref(true)
const showIdleHandling = ref(false)
const semiBlockingModal = ref<InstanceType<typeof CobreModalAction>>()
const sideMenuRef = ref<InstanceType<typeof CobreSideMenu>>()
const actionResultModal = ref<InstanceType<typeof CobreModalAction>>()
const isRolesEnabled = getTreatment("COBRE_ROLES") === "on"
const page_size = 50

watch(() => store.semiBlockingError, () => {
  store.semiBlockingError && semiBlockingModal.value?.toggleModal()
})

watch(() => store.actionResult, () => {
  store.actionResult && actionResultModal.value?.toggleModal()

  if (store.actionResult?.autoClose) {
    setTimeout(actionResultModal.value!.toggleModal, store.actionResult?.closeTime || 2000)
  }
})

setClientId(window.localStorage.getItem("client_id") || "")


onMounted(async () => {
  const isReadySplit = window.localStorage.getItem("isReadySplit")

  if (!isReadySplit) {
    await store.getRefreshToken()
    await initSplit()
  }

  await store.getMfaStatus()

  if (isRolesEnabled) {
    await Promise.all([
      store.getRolesList({ page_size }),
      store.getUserRoles()
    ])
  }

  isGlobalLoading.value = false
  showIdleHandling.value = true
})

const actionErrorSemiBlockingModal = (buttonType: "PRIMARY" | "SECONDARY") => {
  buttonType === "PRIMARY" ? handlePrimaryAction() : handleContactSupport()
  semiBlockingModal.value?.toggleModal()
}

const handleActionResultPrimary = () => {
  store.actionResult?.actionPrimary?.()
  actionResultModal.value?.toggleModal?.()
}

const handleActionResultSecondary = () => {
  store.actionResult?.actionSecondary?.()
  actionResultModal.value?.toggleModal?.()
}

router.afterEach((to, from) => {
  if (to.path.includes("settings")  && !from.path.includes("settings")){
    sideMenuRef.value?.preLoadSubPages(to.path || undefined)
  }
})

</script>

<style scoped lang="scss">

$menu-width: 223px;
$menu-width-collapsed: 88px;

.co-layout {
  &__menu {
    width: $menu-width;

    &--collapsed {
      width: $menu-width-collapsed;
    }

    transition: 0.3s cubic-bezier(0.36, -0.01, 0, 0.77);
  }

  &__content {
    width: calc(100% - #{ $menu-width });
    max-width: 2560px;

    &--collapsed {
      width: calc(100% - #{ $menu-width-collapsed });
    }

    transition: 0.3s cubic-bezier(0.36, -0.01, 0, 0.77);
  }

  @media (max-width: 767px) {
    &__menu {
      width: 0;
    }

    &__content {
      width: 100%;
    }

    &__header {
      width: 100%;
    }
  }

  @media (min-width: 1400px) {
    &__content {
      padding: 0 48px;
    }
  }
}
</style>
