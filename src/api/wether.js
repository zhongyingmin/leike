import request from "@/utils/request";

export const wether = (params) =>
  request({
    url: `/api/radarInfoApi/wether`,
    method: "get",
    params,
  });