import { createRouter, createWebHistory } from "vue-router";
import MainDashboard from "../shared/layouts/MainDashboard.vue";

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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
