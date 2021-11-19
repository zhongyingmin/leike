import request from "@/utils/request";

export const querySensorData = (params) =>
  request({
    url: `/api/deformationApi/querySensorData`,
    method: "get",
    params,
  });

export const getFileData = (params) =>
  request({
    url: `/api/deformationApi/getFileData`,
    method: "get",
    params,
  });

export const exportGif = (params) =>
  request({
    url: `/api/deformationApi/exportGif`,
    method: "get",
    params,
  });
