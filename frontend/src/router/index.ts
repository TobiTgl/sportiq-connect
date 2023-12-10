// Composables
import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import NotFoundPage from "@/views/NotFoundPage/index.vue";
import Impressum from "@/views/Impressum/index.vue";
import Home from "@/views/Home/index.vue";
import Login from "@/views/Login/index.vue";
import { getUserState } from "@/store/authStore";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresUnAuth: true },
  },
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "Startpage",
        component: Home,
        meta: { requiresUnAuth: true },
      },
      {
        path: "impressum",
        name: "Impressum",
        component: Impressum,
        meta: { requiresAuth: true },
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

router.beforeEach(async (to, from, next) => {
  const isAuth = await getUserState();
  const requiresUnAuth = to.matched.some(
    (record) => record.meta.requiresUnAuth
  );

  if (requiresUnAuth === false && !isAuth) {
    next({ name: "Login" });
  } else if (requiresUnAuth && isAuth) {
    if (to.name === "Impressum") {
      next();
    } else {
      next("/home");
    }
  } else {
    next();
  }
});

export default router;
