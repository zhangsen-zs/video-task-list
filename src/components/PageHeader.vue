<template>
  <header class="header">
    <div class="logo">众趣</div>
    <nav class="nav">
      <span class="nav-item active">视频任务列表</span>
    </nav>
  </header>
</template>

<style scoped>
.header {
  height: 56px;
  background: #1976d2;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.logo {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-right: 48px;
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
