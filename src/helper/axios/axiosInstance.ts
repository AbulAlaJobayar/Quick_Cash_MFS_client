import { authKey } from "@/constant/authKey";
import { getNewAccessToken } from "@/service/action/authServices";
import { setAccessToken } from "@/service/action/setAccessToke";
import { IGenericErrorResponse } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStroge";
import axios from "axios";

const instance = axios.create({});
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;
// add request interceptors
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    console.log("accessUpdate", { accessToken });
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // const responseObject: TResponseSuccessType = {
    //     data: response?.data?.data,
    //     meta: response?.data?.meta,
    //   };
    // return responseObject;
    return response;
  },
  async function (error) {
    console.log("error from instance", error);
    const config = error.config;
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      console.log("from instance response", { response });
      const accessToken = response.data.data;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
      await setAccessToken(accessToken);
      return instance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessage: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return responseObject;
    }
  }
);
export { instance };
