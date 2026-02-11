/** 筛选表单 */
export interface FilterForm {
  startTime: string;
  endTime: string;
  videoName: string;
  status: string;
}

/** 视频任务列表项 */
export interface VideoTask {
  taskId: number;
  videoName: string;
  houseId: string;
  createTime: string;
  genStartTime: string;
  genEndTime: string;
  statusText: string;
  videoSize: string;
  duration: string;
  validity: string;
}

/** 分页参数 */
export interface PaginationParams {
  currentPage: number;
  pageSize: number;
  total: number;
}

/** 视频任务列表查询参数 */
export interface VideoTaskQueryParams {
  startTime?: string;
  endTime?: string;
  videoName?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

/** 系统配置表单 */
export interface SystemConfigForm {
  resolution: string;
  bitrate: string;
  fps: string;
  format: string;
}
