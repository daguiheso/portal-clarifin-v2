export const uploadsRoutes = [
  {
    path: "/uploads",
    name: "Cargas de PUC",
    component: () => import("../views/Process.vue"),
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