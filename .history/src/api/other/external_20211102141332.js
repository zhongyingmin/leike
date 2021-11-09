import request from "@/utils/request";

export const exportFile = (params) =>
  request({
    url: `/api/tool/import`,
    method: "get",
    params,
  });