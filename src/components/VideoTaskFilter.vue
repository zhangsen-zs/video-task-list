<template>
  <div class="filter-section">
    <el-form :inline="true" :model="model" class="filter-form">
      <el-form-item label="生成开始时间">
        <el-date-picker
          v-model="model.startTime"
          type="date"
          placeholder="年/月/日"
          value-format="YYYY-MM-DD"
          clearable
        />
      </el-form-item>
      <el-form-item label="生成结束时间">
        <el-date-picker
          v-model="model.endTime"
          type="date"
          placeholder="年/月/日"
          value-format="YYYY-MM-DD"
          clearable
        />
      </el-form-item>
      <el-form-item label="视频名称">
        <el-input
          v-model="model.videoName"
          placeholder="请输入视频名称/任务ID"
          clearable
        />
      </el-form-item>
      <el-form-item label="生成状态">
        <el-select v-model="model.status" placeholder="全部" clearable class="status-select">
          <el-option label="全部" value="" />
          <el-option label="生成成功" value="success" />
          <el-option label="生成中" value="pending" />
          <el-option label="生成失败" value="failed" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('clear')">清空</el-button>
        <el-button type="primary" @click="$emit('query')">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FilterForm } from '@/types';

defineProps<{
  model: FilterForm;
}>();

defineEmits<{
  clear: [];
  query: [];
}>();
</script>

<style scoped>
.filter-section {
  flex-shrink: 0;
  margin-bottom: 20px;
}

.filter-form :deep(.el-form-item) {
  margin-bottom: 18px;
}

.filter-form :deep(.status-select) {
  width: 160px;
}
</style>
