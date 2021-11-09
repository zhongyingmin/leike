import request from "@/utils/request";

export const exportFeature = (params) =>
  request({
    url: `/api/deformationApi/exportFeature`,
    method: "get",
    params,
  });
//
export const exportAccelerated = (params) =>
  request({
    url: `/api/deformationApi/ExportShapeChangeAcceleratedAmplification`,
    method: "get",
    params,
  });

export const exportSpeed = (params) =>
  request({
    url: `/api/deformationApi/ExportShapeChangeSpeedAmplification`,
    method: "get",
    params,
  });

export const ExportShape = (params) =>
  request({
    url: `/api/deformationApi/ExportShapeChangeValueAmplification`,
    method: "get",
    params,
  });

export const exportAlarmType = (params) =>
  request({
    url: `/api/alarmRecord/exportAlarmType`,
    method: "get",
    params,
  });

export const exportAlarmStatistics = (params) =>
  request({
    url: `/api/alarmRecord/exportThisWeekAlarmStatistics`,
    method: "get",
    params,
  });
