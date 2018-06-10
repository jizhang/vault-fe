<template>
  <div id="app">
    <el-container style="height: 100vh;">
      <el-header class="app-header">
        <img src="./assets/logo.png">Morph
      </el-header>
      <el-container>
        <el-aside width="240px">
          <el-menu style="height: 100%;">
            <el-menu-item>
              <i class="el-icon-menu"></i>
              <span>ETL</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.app-header {
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  color: #303133;
  box-shadow: 0 2px 8px #f0f1f2;
  margin-bottom: 20px;

  img {
    height: 40px;
    margin-right: 20px;
    vertical-align: middle;
  }
}
</style>
