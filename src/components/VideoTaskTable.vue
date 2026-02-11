<template>
  <div class="table-wrapper">
    <div class="table-scroll">
      <el-table :data="data" border stripe class="data-table">
      <el-table-column prop="taskId" label="任务ID" width="90" align="center" />
      <el-table-column prop="videoName" label="视频名称" min-width="180">
        <template #default="{ row }">
          <el-link type="primary">{{ row.videoName }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="houseId" label="关联房源ID" width="140">
        <template #default="{ row }">
          <el-link type="primary">{{ row.houseId }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="170" align="center" />
      <el-table-column prop="genStartTime" label="生成开始时间" width="170" align="center" />
      <el-table-column prop="genEndTime" label="生成结束时间" width="170" align="center" />
      <el-table-column prop="statusText" label="生成状态" width="100" align="center" />
      <el-table-column prop="videoSize" label="视频大小" width="90" align="center" />
      <el-table-column prop="duration" label="时长" width="80" align="center" />
      <el-table-column prop="validity" label="有效期" width="90" align="center" />
      <el-table-column label="操作" width="140" align="center" fixed="right">
        <template #default="{ row }">
          <span v-if="row.statusText === '生成成功'" class="action-links">
            <el-link type="primary" @click="$emit('view', row)">查看</el-link>
            <el-link type="primary" @click="$emit('download', row)">下载</el-link>
          </span>
          <el-link v-else-if="row.statusText === '生成失败'" type="primary" @click="$emit('regenerate', row)">重新生成</el-link>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <div class="pagination-wrap">
      <el-pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="sizes, prev, pager, next, jumper"
        @update:current-page="$emit('update:currentPage', $event)"
        @update:page-size="$emit('update:pageSize', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VideoTask, PaginationParams } from '@/types';

defineProps<{
  data: VideoTask[];
  pagination: PaginationParams;
}>();

defineEmits<{
  view: [row: VideoTask];
  download: [row: VideoTask];
  regenerate: [row: VideoTask];
  'update:currentPage': [value: number];
  'update:pageSize': [value: number];
}>();
</script>

<style scoped>
.table-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.table-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.data-table {
  margin-bottom: 0;
}

.action-links {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.pagination-wrap {
  flex-shrink: 0;
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
