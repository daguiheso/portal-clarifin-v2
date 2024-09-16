import { createRouter, createWebHistory } from "vue-router";
import MainDashboard from "../shared/layouts/MainDashboard.vue";
import Errorpagesinfo from "../shared/layouts/errorpagesinfo.vue";

const routes = [
  {
    path: '/',
    component: MainDashboard,
    children: [
      {
        path: `/`,
        name: "Maindashboard",
        component: () => import("../components/dashboard/Dashboard.vue"),
      },
      {
        path: `/levels`,
        name: "Level",
        component: () => import("../components/Levels/screens/Levels.vue"),
      }
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
