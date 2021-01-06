import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Job = () => import("views/job/Job");
const Login = () => import("views/login/Login");
const routes = [
  { path: "/", redirect: "/Login" },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/job",
    name: "Job",
    component: Job,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
