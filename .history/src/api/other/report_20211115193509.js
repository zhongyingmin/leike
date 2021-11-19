import request from "@/utils/request";

export const reportFile = (params) =>
  request({
    url: `/api/tool/report`,
    method: "post",
    params,
  });