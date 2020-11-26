const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "/", component: () => import("pages/Index.vue") }]
  },

  {
    path: "/register",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/register", component: () => import("pages/register.vue") }
    ]
  },

  {
    path: "/jobs",
    component: () => import("layouts/menu.vue"),
    children: [{ path: "/jobs", component: () => import("pages/jobs.vue") }]
  },
  {
    path: "/profile",
    component: () => import("layouts/menu.vue"),
    children: [
      { path: "/profile", component: () => import("pages/profile.vue") }
    ]
  },
  {
    path: "/admin",
    component: () => import("layouts/menu.vue"),
    children: [{ path: "/admin", component: () => import("pages/admin.vue") }]
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
