<template>
  <el-container class="index-container">
    <el-header class="my-header">Header</el-header>
    <el-container>
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang='less'>
.index-container{
  height: 100%;
  .my-header{
    background: yellow;
  }
  .my-aside{
    background: pink;
  }
  .my-main{
    background: #0094ff;
  }
}
</style>
