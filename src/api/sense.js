import request from "@/utils/request";

export const getList = (params) =>
  request({
    url: `/api/sensorInfo/getList`,
    method: "get",
    params,
  });

