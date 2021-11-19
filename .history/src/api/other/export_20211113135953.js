import request from "@/utils/request";

export const exportDeformationData = (params) =>
  request({
    url: `/api/deformationApi/exportDeformationData`,
    method: "get",
    params,
  });
