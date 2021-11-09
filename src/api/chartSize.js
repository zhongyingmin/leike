import request from "@/utils/request";

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
    url: `/api/alarmRecord/thisWeekAlarmStatistics`,
    method: "get",
    params,
  });

export const getShapeChangeValue = (params) =>
  request({
    url: `/api/deformationApi/getShapeChangeValueAmplification`,
    method: "get",
    params,
  });

export const getShapeChangeSpeed = (params) =>
  request({
    url: `/api/deformationApi/getShapeChangeSpeedAmplification`,
    method: "get",
    params,
  });

export const getShapeChangeAccelerated = (params) =>
  request({
    url: `/api/deformationApi/getShapeChangeAcceleratedAmplification`,
    method: "get",
    params,
  });
