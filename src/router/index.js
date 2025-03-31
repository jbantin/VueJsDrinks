import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Favorites from "@/views/Favorites.vue";
// import DrinkDetail from "../views/DrinkDetail.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/drink/:id",
    name: "DrinkDetail",
    component: () => import("../views/DrinkDetail.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
