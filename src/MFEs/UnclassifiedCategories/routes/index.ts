export const unclassifiedCategoriesRoutes = [
  {
    path: "/unclassified-categories",
    name: "Categorías no Clasificadas",
    component: () => import("../views/UnclassifiedCategories.vue"),
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