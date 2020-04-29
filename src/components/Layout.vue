<template>
  <a-layout style="height: 100%">
    <a-layout-header class="header">
      <div class="logo">LOGO.</div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        style="background: #fff"
        collapsible
        v-model="collapsed"
      >
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item key="1">
            <router-link :to="{ name: 'Home' }">
              <a-icon type="user" />
              <span>Home</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link :to="{ name: 'About' }">
              <a-icon type="video-camera" />
              <span>About</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link :to="{ name: 'Tomato' }">
              <a-icon type="upload" />
              <span>Tomato</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style>
.logo {
  width: 120px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
  color: #fff;
  line-height: 32px;
}
</style>
