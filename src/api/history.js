import request from "@/utils/request";

export const getData = (params) =>
  request({
    url: `/api/deformationApi/getData`,
    method: "get",
    params,
  });

export const getPointData = (params) =>
  request({
    url: `/api/drawPicture/getPointData`,
    method: "get",
    params,
  });
