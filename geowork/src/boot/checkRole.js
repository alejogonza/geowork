export default async ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    const role = window.localStorage.getItem("role");
    let protectedRoute = false;

    if (to.path == "/admin") {
      protectedRoute = true;
    }

    if (role != "admin" && protectedRoute == true) {
      return next({
        path: "/jobs"
      });
    }
    next();
  });
};
