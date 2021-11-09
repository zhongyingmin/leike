import request from "@/utils/request";

export const coordtrans = (params) =>
  request({
    url: `/api/tool/coordtrans`,
    method: "post",
    params,
  });
