import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://geowork-api.herokuapp.com/api"
});
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};
export { axiosInstance };
