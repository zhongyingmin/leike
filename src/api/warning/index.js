import request from "@/utils/request";

export const getData = (params) =>
  request({
    url: `/api/alarmRule/getData`,
    method: "get",
    params,
  });

export const update = (data) =>
  request({
    url: `/api/alarmRule/update`,
    method: "post",
    data,
  });

export const create = (data) =>
  request({
    url: `/api/alarmRule/save`,
    method: "post",
    data,
  });

export const remove = (params) =>
  request({
    url: `/api/alarmRule/delete`,
    method: "post",
    params,
  });
