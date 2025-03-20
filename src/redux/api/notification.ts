import { tagType } from "./../tagType";
import { baseApi } from "./baseApi";
const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    unreadNotification: build.query({
      query: () => ({
        url: "/notification/unread",
        method: "GET",
      }),
      providesTags: [tagType.notification],
    }),
    markAsRead: build.mutation({
      query: ({ id }) => ({
        url: `/notification/${id}/mark_as_read`,
        method: "PUT",
      }),
      invalidatesTags: [tagType.notification],
    }),
    allNotification: build.query({
      query: () => ({
        url: "/notification/all_notification",
        method: "GET",
      }),
      providesTags: [tagType.transaction],
    }),
    notificationDetails: build.query({
      query: ({id}) => ({
        url: `/notification/${id}/notification_Details`,
        method: "GET",
      }),
      providesTags: [tagType.transaction],
    }),
  }),
});
export const {
  useUnreadNotificationQuery,
  useMarkAsReadMutation,
  useAllNotificationQuery,
  useNotificationDetailsQuery
} = notificationApi;
