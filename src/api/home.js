import request from "@/utils/request";

export const alarmStatistics = (params) =>
  request({
    url: `/api/alarmRecord/alarmStatistics`,
    method: "get",
    params,
  });

export const warningStatistics = (params) =>
  request({
    url: `/api/alarmRecord/warningStatistics`,
    method: "get",
    params,
  });

export const alarmType = (params) =>
  request({
    url: `/api/alarmRecord/alarmType`,
    method: "get",
    params,
  });

export const thisWeekStatistics = (params) =>
  request({
    url: `/api/alarmRecord/thisWeekStatistics`,
    method: "get",
    params,
  });

export const getShapeChangeValue = (params) =>
  request({
    url: `/api/deformationApi/getShapeChangeValue`,
    method: "get",
    params,
  });

export const getShapeChangeSpeed = (params) =>
  request({
    url: `/api/deformationApi/getShapeChangeSpeed`,
    method: "get",
    params,
  });

export const getShapeChangeAccelerated = (params) =>
  request({
    url: `/api/deformationApi/getShapeChangeAccelerated`,
    method: "get",
    params,
  });

export const feature = (params) =>
  request({
    url: `api/deformationApi/feature`,
    method: "get",
    params,
  });
