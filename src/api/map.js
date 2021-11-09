import request from "@/utils/request";

export const draws = (params) =>
  request({
    url: `/api/drawPicture/getData`,
    method: "get",
    params,
  });
export const create = (data) =>
  request({
    url: `/api/drawPicture/save`,
    method: "post",
    data,
  });
export const update = (data) =>
  request({
    url: `/api/drawPicture/update`,
    method: "post",
    data,
  });
export const remove = (params) =>
  request({
    url: `/api/drawPicture/remove`,
    method: "post",
    params,
  });
export const updateList = (data) =>
  request({
    url: `/api/drawPicture/updateList`,
    method: "post",
    data,
  });
