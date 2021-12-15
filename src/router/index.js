import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users/:id",
    name: "UserDetail",
    props: true,
    component: () =>
      import(/* webpackChunkName: "userDetail" */ "../views/UserDetail.vue"),
    beforeEnter: (to, from, next) => {
      const existedIDs = localStorage.getItem("existedIDs");
      const exists = existedIDs.split(",").find((id) => id === to.params.id);

      if (exists) {
        next();
      } else {
        next({ name: "notFound" });
      }
    },
  },
  {
    path: "/notFound",
    alias: "*",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
