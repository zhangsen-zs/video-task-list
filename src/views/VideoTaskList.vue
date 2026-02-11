<template>
  <div class="page-container">
    <PageHeader />

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
          @update:current-page="handlePageChange"
          @update:page-size="handlePageSizeChange"
          @view="handleView"
          @download="handleDownload"
          @regenerate="handleRegenerate"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import VideoTaskFilter from '@/components/VideoTaskFilter.vue';
import VideoTaskTable from '@/components/VideoTaskTable.vue';
import { getVideoTaskList } from '@/api/videoTask';
import type { FilterForm, VideoTask, PaginationParams } from '@/types';

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

const loadData = async () => {
  const res = await getVideoTaskList({
    ...filterForm,
    page: pagination.currentPage,
    pageSize: pagination.pageSize
  });
  tableData.value = res.list;
  pagination.total = res.total;
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

const handleView = (_row: VideoTask) => {
  // 查看逻辑
};

const handleDownload = (_row: VideoTask) => {
  // 下载逻辑
};

const handleRegenerate = (_row: VideoTask) => {
  // 重新生成逻辑
};

const handlePageChange = (page: number) => {
  pagination.currentPage = page;
  loadData();
};

const handlePageSizeChange = (size: number) => {
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
</style>
