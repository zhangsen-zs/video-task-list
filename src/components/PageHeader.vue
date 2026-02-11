<template>
  <header class="header">
    <div class="header-left">
      <div class="logo">众趣</div>
      <nav class="nav">
        <span class="nav-item active">视频任务列表</span>
      </nav>
    </div>
    <span class="system-settings" @click="$emit('systemSettings')">系统设置</span>
  </header>
</template>

<script setup lang="ts">
defineEmits<{
  systemSettings: [];
}>();
</script>

<style scoped>
.header {
  height: 56px;
  background: #1976d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-right: 48px;
}

.system-settings {
  flex-shrink: 0;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  padding: 0 4px;
  outline: none;
}
.system-settings:hover,
.system-settings:active,
.system-settings:focus {
  color: #fff;
  background: transparent;
  outline: none;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-item {
  color: rgba(255, 255, 255, 0.65);
  padding: 0 16px;
  cursor: pointer;
}

.nav-item.active {
  color: #fff;
}
</style>
