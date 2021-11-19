import request from "@/utils/request";

export const reportFile = (data) =>
  request({
    url: `/api/tool/report`,
    method: "post",
    data,
  });