// Composables
import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import NotFoundPage from "@/views/NotFoundPage/index.vue";
import Impressum from "@/views/Impressum/index.vue";
import Home from "@/views/Home/index.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "impressum",
        name: "Impressum",
        component: Impressum,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        savedPosition,
        behavior: "smooth",
      };
    } else {
      return {
        top: 0,
        behavior: "smooth",
      };
    }
  },
});

export default router;
