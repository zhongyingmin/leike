import request from "@/utils/request";

export const getData = (params) =>
  request({
    url: `/api/alarmRecord/getData`,
    method: "get",
    params,
  });

export const update = (params) =>
  request({
    url: `/api/alarmRecord/alarmRelieve`,
    method: "get",
    params,
  });
