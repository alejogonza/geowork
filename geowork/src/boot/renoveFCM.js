import { axiosInstance } from "boot/axios";
import { Platform } from "quasar";

export default async ({ store, router }) => {
  router.beforeEach(async (to, from, next) => {
    if (Platform.is.desktop != true) {
      if (
        window.localStorage.getItem("token") ||
        window.localStorage.getItem("token".length != 0)
      ) {
        const FCMLocalToken = window.localStorage.getItem("FCMtoken");
        const FCMtoken = await FCM.getToken();
        if (FCMLocalToken !== FCMtoken) {
          try {
            window.localStorage.setItem("FCMtoken", FCMtoken);
             await axiosInstance.patch(
              "/FCMtoken-renew",
              { FCMtoken: FCMtoken },
              {
                headers: {
                  token: window.localStorage.getItem("token")
                }
              }
            );
          } catch (err) {
            console.log(err.response.data);
          }
        } else {
          console.log("token updated");
        }
      }
      next();
    }else{
      next();
    }
  });
};
