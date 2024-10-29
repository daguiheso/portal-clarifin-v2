export const keysRoutes = [
  {
    path: "/keys",
    name: "LLaves",
    component: () => import("../views/Keys.vue"),
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