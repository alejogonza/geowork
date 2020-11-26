import { Notify } from "quasar";
export default ({ Vue }) => {
  Vue.prototype.$getNotifications = async () => {
    FCM.onNotification(object => {
      Notify.create({
        message: object.body,
        caption: object.title,
        multiLine: true,
        color: "secondary",
        position: "top"
      });
    });
  };
  Vue.prototype.$getTokenNotifications = async () => {
    return await FCM.getToken();
  };
};
