import request from "@/utils/request";

export const getList = (params) =>
  request({
    url: `/api/alarmGrade/getList`,
    method: "get",
    params,
  });

export const update = (data) =>
  request({
    url: `/api/alarmGrade/updateList`,
    method: "post",
    data,
  });
