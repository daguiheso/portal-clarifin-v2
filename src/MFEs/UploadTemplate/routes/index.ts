export const uploadTemplateRoutes = [
  {
    path: "/upload",
    name: "upload-template",
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