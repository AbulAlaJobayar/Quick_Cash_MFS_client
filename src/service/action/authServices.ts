import { instance as axiosInstance} from "@/helper/axios/axiosInstance";

export const getNewAccessToken = async () => {
    return await axiosInstance({
      url: `${process.env.BACKEND_URL}/auth/refresh-token`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };
  