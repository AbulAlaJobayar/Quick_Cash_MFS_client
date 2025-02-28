import { instance as axiosInstance} from "@/helper/axios/axiosInstance";

export const getNewAccessToken = async () => {
    return await axiosInstance({
      url: "https://quickcash-server.vercel.app/api/v1/auth/refresh-token",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };
  