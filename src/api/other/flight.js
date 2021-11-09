import request from "@/utils/request";

export const list = (params) =>
  request({
    url: `/api/flightpath/getData`,
    method: "get",
    params,
  });

export const remove = (params) =>
  request({
    url: `/api/flightpath/remove`,
    method: "post",
    params,
  });

export const create = (data) =>
  request({
    url: `/api/flightpath/save`,
    method: "post",
    data,
  });
