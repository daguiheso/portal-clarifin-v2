import { createRouter, createWebHistory } from "vue-router"
import MainDashboard from "../shared/layouts/MainDashboard.vue"
import Errorpagesinfo from "../shared/layouts/errorpagesinfo.vue"
import { uploadTemplateRoutes } from "@/MFEs/UploadTemplate/routes"
import { unclassifiedCategoriesRoutes } from "@/MFEs/UnclassifiedCategories/routes"
import { keysRoutes } from "@/MFEs/Keys/routes"
import { uploadTemplateRoutesV2 } from "@/MFEs/UploadTemplateV2/routes"

const routes = [
  {
    path: "/",
    component: MainDashboard,
    children: [
      {
        path: "/",
        name: "Maindashboard",
        component: () => import("../components/dashboard/Dashboard.vue"),
      },
      {
        path: "/models",
        name: "Modelos",
        component: () => import("../components/Models/screens/Models.vue"),
      },
      ...uploadTemplateRoutes,
      ...uploadTemplateRoutesV2,
      ...unclassifiedCategoriesRoutes,
      ...keysRoutes
    ],
  },
  {
    path: "/auth",
    component: Errorpagesinfo,
    children: [
      {
        path: "signin",
        component: () => import("../components/custompages/signin/Signin.vue"),
      },
      {
        path: "signup",
        component: () => import("../components/custompages/signup/Signup.vue"),
      },
      {
        path: "error404/",
        component: () =>
          import("../components/custompages/Error404.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404page",
    component: () => import("../components/custompages/Error404.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
