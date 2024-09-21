<template>
  <section>
    <aside class="d-flex">
      <CobreButton
        theme="ghost"
        size="auto"
        class="p-0 fw-normal"
        :label="$t('newBulk.goBack')"
        @click="handleGoBack">
        <template #start>
          <i class="icon-arrow-left" />
        </template>
      </CobreButton>
    </aside>
    <div class="row co-mt-21">
      <div class="col-2">
        <CobreStepper
          :steps="tabItems"
          :completed-steps="store.completedSteps"
          @select-step="handleSelectStep" />
      </div>

      <div class="col-9">
        <RouterView
          v-slot="{ Component }">
          <Transition
            name="fade"
            mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
      <div class="col-1" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { CobreButton } from "@cobre-npm/ds-v3"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

import CobreStepper from "@/commons/components/CobreStepper.vue"
import useActionResult from "@/hooks/useActionResult"
import { useSideMenu } from "@/hooks/useSideMenu"
import useAnalytics from "@/hooks/useAnalytics"

import useRequestToPayStore from "../stores"

const router = useRouter()
const store = useRequestToPayStore()
const { addActionResult } = useActionResult()
const { t } = useI18n()
const { trackEvent } = useAnalytics()
const { handleCollapseMenu } = useSideMenu()

const handleSelectStep = (tab: { path: string }) => {
  console.log(tab)
}

const tabItems =[
  { name: t("newBulk.tabs.upload"), id: "1", path: "step-one" },
]

const handleGoBack = () => {
  addActionResult({
    icon: "error",
    title: t("newBulk.leave.title"),
    message: t("newBulk.leave.message"),
    labelPrimary: t("newBulk.leave.labelPrimary"),
    labelSecondary: t("newBulk.leave.labelSecondary"),
    actionPrimary: () => router.replace("/movements"),
  })
}

const init = () => {

  handleCollapseMenu()

  trackEvent("Init Request To Pay", {
    "Event category": "Request To Pay",
  })
}

init()

</script>
