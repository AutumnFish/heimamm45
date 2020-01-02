<template>
  <div class="login-container">
    <!-- 左侧的盒子 -->
    <div class="left"></div>
    <!-- 右边的图片 -->
    <img class='bg' src="../../assets/login_banner_ele.png" alt="">
  </div>
</template>

<script>
export default {
    name:"login"
}
</script>

<style>
  .login-container{
    display: flex;
    /* 侧轴方向 居中 */
    align-items: center;
    /* 线型渐变 */
    background:linear-gradient(225deg,rgba(1,198,250,1),rgba(20,147,250,1));
    /* 主轴方向 均分 */
    justify-content: space-around;
    height: 100%;
  }
  .login-container .left{
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
  }
  .login-container .bg{}

</style>