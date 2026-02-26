import { get, post } from '@/utils/request';
import type { SystemConfigForm } from '@/types';

const BASE = '/settings';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_BASE_URL;

/** 获取系统配置（用于弹窗回显） */
export function getSystemConfig(): Promise<SystemConfigForm> {
  if (USE_MOCK) {
    return Promise.resolve({ resolution: '', bitrate: '200', fps: '200', format: '' });
  }
  return get<SystemConfigForm>(`${BASE}/config`);
}

/** 提交系统配置 */
export function submitSystemConfig(data: SystemConfigForm): Promise<void> {
  if (USE_MOCK) {
    return Promise.resolve();
  }
  return post<void>(`${BASE}/config`, data);
}
