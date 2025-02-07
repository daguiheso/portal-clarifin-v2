export const uploadTemplateRoutesV2 = [
  {
    path: "/uploadv2",
    name: "upload-templatev2",
    component: () => import("../views/HandleUpload.vue"),
    // children: [
    //   {
    //     path: "step-one",
    //     alias: "StepOne",
    //     component: () => import("@/MFEs/NewBulkMMV2/views/StepOne.vue"),
    //   }
    // ],
    meta: {
    }
  }
]