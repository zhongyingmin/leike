import request from "@/utils/request";

export const alarmsound = (data) =>
  request({
    url: `/api/tool/upload/alarmsound`,
    method: "post",
    data,
  });

