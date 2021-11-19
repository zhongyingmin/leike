import request from "@/utils/request";

export const login = (params) =>
  request({
    url: `/api/login/login`,
    method: "post",
    params,
  });

export const exit = (params) =>
  request({
    url: `/api/login/exit`,
    method: "post",
    params,
  });

export const register = (data) =>
  request({
    url: `/api/user/register`,
    method: "post",
    data,
  });

export const users = (params) =>
  request({
    url: `/api/user/query`,
    method: "get",
    params,
  });

export const update = (data) =>
  request({
    url: `/api/user/update`,
    method: "post",
    data,
  });

export const remove = (data) =>
  request({
    url: `/api/user/delete`,
    method: "post",
    data,
  });

export const create = (data) =>
  request({
    url: `/api/user/add`,
    method: "post",
    data,
  });

export const query = () =>
  request({
    url: `/api/radarInfoApi/query`,
    method: "get",
  });

export const setConfig = (data) =>
  request({
    url: `/api/user/setconfig`,
    method: "post",
    data,
  });

export const getConfig = (params) =>
  request({
    url: `/api/user/getconfig`,
    method: "get",
    params,
  });

export const modifyPasswd = (data) =>
  request({
    url: `/api/user/modifyPasswd`,
    method: "post",
    data,
  });

export const getWbdata = (params) =>
  request({
    url: `/api/tool/getWbdata`,
    method: "get",
    params,
  });

export const captchaImage = (params) =>
request({
  url: `/api/captcha/captchaImage`,
  method: "get",
  params,
});

export const getTerrainData = (params) =>
request({
  url: `/api/tool/getTerrainData`,
  method: "get",
  params,
});