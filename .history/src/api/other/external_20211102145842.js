import request from "@/utils/request";

export const exportFile = (data) =>
  request({
    url: `/api/tool/import`,
    method: "post",
    data,
  });