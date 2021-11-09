import request from "@/utils/request";

export const login = (data) =>
  request({
    url: `/api/log/login`,
    method: "post",
    data,
  });

export const oper = (data) =>
  request({
    url: `/api/log/oper`,
    method: "post",
    data,
  });
