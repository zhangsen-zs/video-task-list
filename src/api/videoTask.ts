import { get, post } from '@/utils/request';
import type { VideoTask, VideoTaskQueryParams, ListResult } from '@/types';

const BASE = '/video-task';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_BASE_URL;

const mockList: VideoTask[] = [
  {
    taskId: 1001,
    videoName: 'VR20260129001_V1.MP4',
    houseId: 'VR20260129001',
    createTime: '2026-01-28 10:25:36',
    genStartTime: '2026-01-28 10:25:36',
    genEndTime: '2026-01-28 10:30:12',
    statusText: '生成成功',
    videoSize: '56.1MB',
    duration: '01:22',
    validity: '有效'
  },
  {
    taskId: 1002,
    videoName: 'VR20260129002_V1.MP4',
    houseId: 'VR20260129002',
    createTime: '2026-01-28 11:00:00',
    genStartTime: '2026-01-28 11:00:00',
    genEndTime: '2026-01-28 11:05:00',
    statusText: '生成成功',
    videoSize: '48.2MB',
    duration: '01:15',
    validity: '无效'
  },
  {
    taskId: 1003,
    videoName: 'VR20260129003_V1.MP4',
    houseId: 'VR20260129003',
    createTime: '2026-01-28 12:00:00',
    genStartTime: '2026-01-28 12:00:00',
    genEndTime: '',
    statusText: '生成失败',
    videoSize: '-',
    duration: '-',
    validity: '无效'
  }
];

/** 获取视频任务列表（支持查询条件与分页） */
export function getVideoTaskList(params?: VideoTaskQueryParams): Promise<ListResult<VideoTask>> {
  if (USE_MOCK) {
    return Promise.resolve({ list: mockList, total: 25 });
  }
  return get<ListResult<VideoTask>>(`${BASE}/list`, params as Record<string, unknown>);
}

/** 重新生成视频任务 */
export function regenerateTask(taskId: number): Promise<{ taskId: number }> {
  if (USE_MOCK) {
    return Promise.resolve({ taskId });
  }
  return post<{ taskId: number }>(`${BASE}/regenerate`, { taskId });
}
