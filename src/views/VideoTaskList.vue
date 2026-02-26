<template>
  <div class="page-container">
    <PageHeader @system-settings="showSystemConfig = true" />

    <main class="main-content">
      <div class="content-inner">
        <VideoTaskFilter
          :model="filterForm"
          @clear="handleClear"
          @query="handleQuery"
        />

        <div class="table-area">
          <VideoTaskTable
            :data="tableData"
            :pagination="pagination"
            :loading="listLoading"
            @update:current-page="handlePageChange"
            @update:page-size="handlePageSizeChange"
            @view="handleView"
            @download="handleDownload"
            @regenerate="handleRegenerate"
          />
        </div>
      </div>
    </main>

    <!-- 系统配置 -->
    <el-dialog
      v-model="showSystemConfig"
      title="系统配置"
      width="420px"
      destroy-on-close
      @close="handleSystemConfigClose"
    >
      <el-form :model="systemConfigForm" label-width="100px">
        <el-form-item label="分辨率:">
          <el-select v-model="systemConfigForm.resolution" placeholder="请选择" clearable style="width: 100%">
            <el-option label="1920×1080" value="1920x1080" />
            <el-option label="1280×720" value="1280x720" />
            <el-option label="3840×2160" value="3840x2160" />
          </el-select>
        </el-form-item>
        <el-form-item label="码率:">
          <el-input v-model="systemConfigForm.bitrate" placeholder="200" />
        </el-form-item>
        <el-form-item label="帧率(fps):">
          <el-input v-model="systemConfigForm.fps" placeholder="200" />
        </el-form-item>
        <el-form-item label="格式:">
          <el-select v-model="systemConfigForm.format" placeholder="请选择" clearable style="width: 100%">
            <el-option label="MP4" value="mp4" />
            <el-option label="WebM" value="webm" />
            <el-option label="AVI" value="avi" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showSystemConfig = false">取消</el-button>
        <el-button type="primary" :loading="configSubmitting" @click="handleSystemConfigConfirm">确认</el-button>
      </template>
    </el-dialog>

    <!-- 查看视频（房源名称） -->
    <el-dialog
      v-model="showViewVideo"
      :title="viewingTask ? viewingTask.houseId : '房源名称'"
      width="720px"
      destroy-on-close
      @close="viewingTask = null"
    >
      <div class="video-wrap">
        <video
          v-if="viewVideoUrl"
          controls
          class="video-player"
          :src="viewVideoUrl"
        />
        <div v-else class="video-placeholder">暂无视频预览</div>
      </div>
    </el-dialog>

    <!-- 下载完成 -->
    <el-dialog
      v-model="showDownloadDone"
      title="下载完成"
      width="420px"
      destroy-on-close
    >
      <p class="download-message">{{ downloadDoneMessage }}</p>
      <template #footer>
        <el-button type="primary" @click="showDownloadDone = false">我知道了</el-button>
      </template>
    </el-dialog>

    <!-- 确认重新生成 -->
    <el-dialog
      v-model="showRegenerateConfirm"
      title="确认重新生成"
      width="420px"
      destroy-on-close
      @close="regeneratingTask = null"
    >
      <p class="regenerate-message">确认重新生成当前视频吗?</p>
      <template #footer>
        <el-button @click="showRegenerateConfirm = false">取消</el-button>
        <el-button type="primary" :loading="regenerateLoading" @click="handleRegenerateConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
import PageHeader from '@/components/PageHeader.vue';
import VideoTaskFilter from '@/components/VideoTaskFilter.vue';
import VideoTaskTable from '@/components/VideoTaskTable.vue';
import { getVideoTaskList, regenerateTask } from '@/api/videoTask';
import { getSystemConfig, submitSystemConfig } from '@/api/settings';
import type { FilterForm, VideoTask, PaginationParams, SystemConfigForm } from '@/types';

const filterForm = reactive<FilterForm>({
  startTime: '',
  endTime: '',
  videoName: '',
  status: ''
});

const tableData = ref<VideoTask[]>([]);

const pagination = reactive<PaginationParams>({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 系统配置弹窗
const showSystemConfig = ref(false);
const systemConfigForm = reactive<SystemConfigForm>({
  resolution: '',
  bitrate: '200',
  fps: '200',
  format: ''
});

const defaultSystemConfig: SystemConfigForm = {
  resolution: '',
  bitrate: '200',
  fps: '200',
  format: ''
};

const handleSystemConfigClose = () => {
  Object.assign(systemConfigForm, defaultSystemConfig);
};

watch(showSystemConfig, async (visible) => {
  if (visible) {
    try {
      const config = await getSystemConfig();
      Object.assign(systemConfigForm, config);
    } catch (e) {
      ElMessage.error((e as Error).message || '获取配置失败');
    }
  }
});

const configSubmitting = ref(false);
const handleSystemConfigConfirm = async () => {
  configSubmitting.value = true;
  try {
    await submitSystemConfig(systemConfigForm);
    ElMessage.success('配置已保存');
    showSystemConfig.value = false;
    Object.assign(systemConfigForm, defaultSystemConfig);
  } catch (e) {
    ElMessage.error((e as Error).message || '保存配置失败');
  } finally {
    configSubmitting.value = false;
  }
};

// 查看视频弹窗
const showViewVideo = ref(false);
const viewingTask = ref<VideoTask | null>(null);
// 演示用：实际应从任务/接口获取视频地址
const viewVideoUrl = ref('');

const handleView = (row: VideoTask) => {
  viewingTask.value = row;
  // 实际项目用 row.videoUrl 或接口返回的播放地址；此处用占位或示例地址
  viewVideoUrl.value = 'https://www.w3schools.com/html/mov_bbb.mp4';
  showViewVideo.value = true;
};

// 下载完成弹窗
const showDownloadDone = ref(false);
const downloadDoneMessage = ref('');

const handleDownload = (row: VideoTask) => {
  // 实际项目中在此调用下载接口或触发文件下载
  downloadDoneMessage.value = `视频:${row.houseId}已成功下载至本地`;
  showDownloadDone.value = true;
};

// 确认重新生成弹窗
const showRegenerateConfirm = ref(false);
const regeneratingTask = ref<VideoTask | null>(null);

const handleRegenerate = (row: VideoTask) => {
  regeneratingTask.value = row;
  showRegenerateConfirm.value = true;
};

const regenerateLoading = ref(false);
const handleRegenerateConfirm = async () => {
  if (!regeneratingTask.value) return;
  regenerateLoading.value = true;
  try {
    await regenerateTask(regeneratingTask.value.taskId);
    ElMessage.success('已提交重新生成');
    showRegenerateConfirm.value = false;
    regeneratingTask.value = null;
    await loadData();
  } catch (e) {
    ElMessage.error((e as Error).message || '重新生成失败');
  } finally {
    regenerateLoading.value = false;
  }
};

const listLoading = ref(false);
const loadData = async () => {
  listLoading.value = true;
  try {
    const res = await getVideoTaskList({
      ...filterForm,
      page: pagination.currentPage,
      pageSize: pagination.pageSize
    });
    tableData.value = Array.isArray(res?.list) ? res.list : [];
    pagination.total = res?.total ?? 0;
  } catch (e) {
    ElMessage.error((e as Error).message || '加载列表失败');
  } finally {
    listLoading.value = false;
  }
};

const handleClear = () => {
  filterForm.startTime = '';
  filterForm.endTime = '';
  filterForm.videoName = '';
  filterForm.status = '';
};

const handleQuery = () => {
  pagination.currentPage = 1;
  loadData();
};

const handlePageChange = (page: number) => {
  if (page === pagination.currentPage) return;
  pagination.currentPage = page;
  loadData();
};

const handlePageSizeChange = (size: number) => {
  if (size === pagination.pageSize) return;
  pagination.pageSize = size;
  pagination.currentPage = 1;
  loadData();
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f0f2f5;
}

.main-content {
  flex: 1;
  min-height: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-area {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.content-inner {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.video-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.download-message,
.regenerate-message {
  margin: 0;
  font-size: 14px;
  color: #606266;
}
</style>
