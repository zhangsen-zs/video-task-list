import type { VideoTask, VideoTaskQueryParams } from '@/types';

/** 获取视频任务列表（模拟数据） */
export function getVideoTaskList(
  _params?: VideoTaskQueryParams
): Promise<{ list: VideoTask[]; total: number }> {
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
      validity: '30天'
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
      validity: '0天'
    }
  ];
  return Promise.resolve({ list: mockList, total: 25 });
}
