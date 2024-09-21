<template>
  <section class="step-one">
    <p class="co-subtitle mb-0">
      {{ $t('newBulk.title') }}
    </p>

    <div class="co-mt-8 co-mb-16">
      <p class="co-label co-label--md co-text-secondary co-mb-4">
        {{ $t('newBulk.description1') }}
      </p>
      <p class="co-label co-label--md co-text-secondary co-mb-0 d-flex">
        {{ $t('newBulk.description2') }} <span>
          <CobreButton
            theme="link"
            size="auto"
            class="ps-1"
            :label="t('newBulk.docs')"
            @click="openUrl('https://doc.clickup.com/9002051280/d/h/8c90tpg-41397/1023f23c89ef0f4')" />
        </span>
      </p>
    </div>

    <div
      class="w-100 co-pb-8"
      style="border-bottom: var(--cobre-border-stroke-M) solid var(--cobre-border-line);">
      <CobreButton
        class="w-100 p-0"
        style="justify-content: space-between !important; "
        theme="ghost"
        :label="$t('newBulk.availableTemplates')"
        @click="isCollapsedDownloadTemplates= !isCollapsedDownloadTemplates">
        <template #end>
          <i
            class="icon-chevron-down co-icon co-icon--md"
            :class="isCollapsedDownloadTemplates ? 'icon-chevron-down' : 'icon-chevron-up'" />
        </template>
      </CobreButton>
    </div>

    <Collapse
      :when="!isCollapsedDownloadTemplates"
      class="co-transition">
      <div class="d-flex w-100 justify-content-between">

        <CardTemplate
          v-for="card in reactiveOptions"
          :key="card.asset"
          :asset="card.asset"
          :description="card.description"
          :templates="card.templates"
          :disabled="card.disabled"
          @click-option="downloadBaseTemplate" />

      </div>
    </Collapse>

    <div v-if="showErrors">
      <CobreAlert
        class="co-mt-24"
        type="danger"
        :title="`${store.uploadStatus.data.quantity_with_errors} ${$t('newBulk.errorAlert.of')} ${store.uploadStatus.data.quantity} ${$t('newBulk.errorAlert.haveErrors')}`"
        :content="$t('newBulk.errorAlert.description')" />

      <CobreButton
        id="errors-file"
        theme="link"
        class="p-0 co-mt-16"
        size="auto"
        :is-loading="store.uploadedFileErrors.isLoading"
        :label="$t('newBulk.errorAlert.downloadFile')"
        @click="handleDownloadErrorFile">
        <template #start>
          <i class="icon-download co-icon co-icon--md" />
        </template>
      </CobreButton>
    </div>

    <p class="co-fw-500 co-label co-label--md co-mb-12 co-mt-24">
      {{ $t('newBulk.uploadFile') }}
    </p>

    <CobreUploader
      ref="dragAndDrop"
      :current-file-type="{ extensions: allowedExtensions }"
      :upload-from-device-label="$t('newBulk.uploader.title')"
      :max-size-label="$t('newBulk.uploader.size')"
      :file-upload="fileContent"
      @files-dropped="onFileChange"
      @files-input="onFileChange"
      @deleted-file="onFileDelete" />

    <div class="d-flex justify-content-between align-items-center co-mt-42">
      <CobreButton
        theme="ghost"
        class="p-0"
        size="auto"
        :label="$t('newBulk.correctionErrors')"
        @click="drawer?.toggleModal()">
        <template #start>
          <i class="icon-help-circle co-icon co-icon--md" />
        </template>
      </CobreButton>
      <CobreButton
        theme="primary"
        size="medium"
        :disabled="!fileContent"
        :is-loading="isLoadingBulkPayment"
        :label="$t('newBulk.submit')"
        @click="createBulkMovement" />
    </div>

    <CobreDrawer
      ref="drawer"
      position="right"
      size="344px"
      :blurred="false">
      <template #content>
        <ErrorCheckSteps />
      </template>
    </CobreDrawer>

    <CobreModal
      ref="otpModal"
      size="xs">
      <template #content>
        <CobreOtp
          class="overflow-hidden"
          :title="$t('newBulk.otp.title')"
          :description="$t('newBulk.otp.message')"
          :is-loading="store.sendPaymentResponse.isLoading"
          :text-cancel-button="$t('newBulk.otp.cancel')"
          :text-submit-button="$t('newBulk.otp.submit')"
          :is-invalid-otp="isInvalidOTP"
          show-actions-border
          @cancel="handleCancelOTP"
          @submit="createMovement"
          @on-complete="createMovement" />
      </template>
    </CobreModal>

  </section>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onUnmounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Collapse } from "vue-collapsed"
import { CobreButton, CobreUploader, CobreDrawer, CobreAlert, CobreModal, CobreOtp } from "@cobre-npm/ds-v3"

import useActionResult from "@/hooks/useActionResult"
import useAnalytics from "@/hooks/useAnalytics"
import useProfileMe from "@/hooks/useProfileMe"
import { delay } from "@/commons/utils"


import { Template } from "../interfaces/template.interface"
import { ParamsGetPresignedUrl } from "../interfaces/params.interface"
import CardTemplate from "../components/CardTemplate.vue"
import ErrorCheckSteps from "../components/ErrorCheckSteps.vue"
import useNewBulkMovementStore from "../stores"


const { t } = useI18n()
const router = useRouter()
const { mfaInfo } = useProfileMe()
const { trackEvent } = useAnalytics()
const { addActionResult, addSnackBarActionResult } = useActionResult()
const store = useNewBulkMovementStore()

const allowedExtensions = [".csv", ".json"]

const isDownloadingTemplate = ref(false)
const fileContent = ref<File | null>(null)
const dragAndDrop = ref<InstanceType<typeof CobreUploader>>()
const drawer = ref<InstanceType<typeof CobreDrawer>>()
const otpModal = ref<InstanceType<typeof CobreModal>>()
const isCollapsedDownloadTemplates = ref(false)
const templateBaseURL = import.meta.env.COBRE_URL_BASE_FILES
const isLoadingAttempts = ref(false)
const showErrors = ref(false)
const lastFileName = ref("")
const localLoading = ref(false)

const cardTemplatesData = ref([
  {
    asset: "global",
    description: t("newBulk.templateCards.global.description"),
    templates: [{ icon: "icon-switch-horizontal-01", message: t("newBulk.templateCards.global.btn"), path: "Cobre_Payment_Template.json" }],
  },
  {
    asset: "col",
    description: t("newBulk.templateCards.col.description"),
    templates: [
      { icon: "icon-arrow-narrow-up-right", message: t("newBulk.templateCards.col.btn1"), path: "Cobre_Payment_Template_COL.csv" },
      // { icon: "icon-arrow-narrow-down-left", message: t("newBulk.templateCards.col.btn2"), path: "Cobre_R2P_Template_COL.csv" }
    ]
  },
  {
    asset: "mex",
    description: t("newBulk.templateCards.mex.description"),
    templates: [{ icon: "icon-arrow-narrow-up-right", message: t("newBulk.templateCards.mex.btn"), path: "Cobre_Payment_Template_MEX.csv"}]
  },
])


const init = () => {
  trackEvent("Init New Money Movement", {
    "Event Category": "Bulk Money Movement",
  })

  if(mfaInfo?.status !== "verified") {
    addActionResult({
      title: t("movements.mfaValidation.title"),
      message: t("movements.mfaValidation.message"),
      icon: "warning",
      labelPrimary: t("movements.mfaValidation.btnPrimary"),
      labelSecondary: t("movements.mfaValidation.btnSecondary"),
      actionPrimary: () => router.push("/settings/profile"),
      actionSecondary: () => router.back()
    })

    return
  }

  trackEvent("Init Bulk Payment", {
    "Event Category": "Bulk Money Movement",
  })
}

init()

const onFileChange = (file: File) => {
  const maxSizeInMB = 2
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  const fileExtension = file.name.split(".").pop()

  if (file.size > maxSizeInBytes) {
    addSnackBarActionResult({
      message: t("newBulk.errors.size"),
      type: "error",
      btnLabel: "",
    })

    return
  } else if (!allowedExtensions.includes(`.${fileExtension}`)) {
    addSnackBarActionResult({
      message: t("newBulk.errors.extension"),
      type: "error",
      btnLabel: "",
    })

    return
  }

  fileContent.value = file
  lastFileName.value = file.name
}

const onFileDelete = () => {
  if (isLoadingBulkPayment.value) return

  fileContent.value = null
  dragAndDrop.value?.resetInputFile()
}


const reactiveOptions = computed(() => {
  return cardTemplatesData.value.map((option) => {
    return {
      ...option,
      disabled: isDownloadingTemplate.value,
    }
  })
})

const openUrl = (url: string) => window.open(url)


const isLoadingBulkPayment = computed(() => {
  return store.uploadBulkMovementResponse.isLoading ||
    store.urlPresignedResponse.isLoading ||
    store.uploadStatus.isLoading ||
    isLoadingAttempts.value ||
    localLoading.value
})

const params:ComputedRef<ParamsGetPresignedUrl> = computed(() => ({
  file_name: fileContent.value?.name ?? "",
  file_type: getFileExtension(),
  resource_type: "money-movements"
}))

const getFileExtension = () => {
  const fileName = fileContent.value?.name ?? ""
  const lastDotIndex = fileName.lastIndexOf(".")

  if (lastDotIndex === -1) return ""

  return fileName.substring(lastDotIndex + 1).toLowerCase()
}


const createBulkMovement = async () => {
  localLoading.value = true
  const blob = new Blob([fileContent.value as File], { type: "application/vnd.ms-excel; charset=utf-8" })

  showErrors.value = false

  const isPresignedSuccess = await store.getUrlPresigned(params.value)

  if (isPresignedSuccess) {
    const successFileUploaded = await store.uploadFile(store.urlPresignedResponse.data?.url || "", blob)

    if (!successFileUploaded) {
      localLoading.value = false

      return
    }

    isLoadingAttempts.value = true

    store.resetUploadStatus()

    await handleLaunchRetry()

    isLoadingAttempts.value = false

    handleValidateStatusAction()

    localLoading.value = false
  }
}

const isInvalidOTP = computed(() => {
  return store.sendPaymentResponse.error === "VALIDATION_ERROR"
})

const handleLaunchRetry = async () => {
  let retry = 0
  const maxAttempts = 60

  const completedStatus = ["ready_to_send", "with_error", "with_invalids"]

  while (
    retry < maxAttempts
    && !completedStatus.includes(store.uploadStatus.data?.status ?? "")
    && store.uploadStatus.error !== "ERROR_VALIDATING_FILE"
  ) {
    await store.getUploadFileStatus({
      file_type: params.value.file_type,
      resource_type: params.value.resource_type ?? "",
    })

    retry++

    if (retry < maxAttempts && !completedStatus.includes(store.uploadStatus.data?.status ?? "")) {
      await delay(10000)
    }
  }

}

const handleValidateStatusAction = () => {
  if (store.uploadStatus.data.status === "ready_to_send") {
    otpModal.value?.toggleModal()
  } else if (store.uploadStatus.data.status === "with_invalids") {
    showErrors.value = true
    fileContent.value = null
  } else if (store.uploadStatus.data.status === "with_error") {
    fileContent.value = null

    addSnackBarActionResult({
      message: t("newBulk.errors.template"),
      type: "error",
      btnLabel: "",
    })
  }
}

const downloadBaseTemplate = (option: Template) => {
  isDownloadingTemplate.value = true

  document.body.click()

  setTimeout(() => {
    const link = document.createElement("a")

    link.href = `${templateBaseURL}${option.path}`
    link.download = option.path
    if (option.path.includes(".json")) link.target = "_blank"
    link.click()
    isDownloadingTemplate.value = false
  }, 1500)

  trackEvent("Download Template", {
    "Event Category": "Bulk Money Movement",
  })
}


const errorCsvFile = computed(() => {

  const csvString = store.uploadedFileErrors.data
    .replace(/\\"/g, "\"")
    .replace(/\\n/g, "\n")

  return csvString
})

const handleDownloadErrorFile = async () => {
  const resultErrorsFile = await store.getUploadedFileWithErrors({
    file_type: "csv",
    resource_type: "money-movements",
  })

  if (resultErrorsFile) {
    const url = window.URL.createObjectURL(new Blob([errorCsvFile.value],  { type: "text/csv;charset=utf-8;" }))
    const link = document.createElement("a")

    const fileName = "file.csv"

    link.href = url

    link.setAttribute("download", lastFileName.value ?? fileName)
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}


const handleCancelOTP = () => {
  localLoading.value = false
  otpModal.value?.toggleModal()
}

const createMovement = async (otp: string) => {
  store.sendPaymentResponse.error = null

  const isSuccess = await store.sendPayment({
    file_type: params.value.file_type,
    resource_type: params.value.resource_type ?? "",
  }, otp)

  if (isSuccess) {
    router.push("/movements/bulk")
    addSnackBarActionResult({
      message: t("newBulk.success"),
      showCloseButton: false,
      type: "success",
      btnLabel: "",
    })
  }
}

onUnmounted(() => {
  store.restStore()
})


</script>

<style scoped lang="scss">

.step-one {
  &__card-template {
    width: 100%;
    height: 147px;
    border-radius: var(--cobre-radius-S);
    background-color: var(--cobre-primary-5);
  }
}

</style>