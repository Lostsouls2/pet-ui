<template>
  <div id="components-layout">
    <div id="components-layout-demo-custom-trigger">
      <v-layout>
        <v-sider collapsible :collapsed="customCollapsed" :trigger="false" :collapsed-width="64">
          <div class="logo"></div>
          <v-menu theme="dark" mode="inline" :data="menuData4">
            <template slot-scope="{data}">
              <i v-if="data.icon" :class="'anticon anticon-' + data.icon"></i>
              <span class="nav-text">{{data.name}}</span>
            </template>
          </v-menu>
        </v-sider>
        <v-layout>
          <v-header :style="{ background: '#fff', padding: 0 }">
<!--            <v-icon class="trigger" :type="this.customCollapsed ? 'menu-unfold' : 'menu-fold'" @click.native="toggle"></v-icon>-->
          </v-header>
          <v-content :style="{ padding: '0 50px' }">
            <v-breadcrumb :style="{ margin: '12px 0' }">
<!--              <v-breadcrumb-item>Home</v-breadcrumb-item>-->
<!--              <v-breadcrumb-item href="">List</v-breadcrumb-item>-->
<!--              <v-breadcrumb-item href="">App</v-breadcrumb-item>-->
            </v-breadcrumb>
            <div style="padding: 24px; background: #fff; min-height: 360px;height: 100%">Content</div>
          </v-content>
          <v-footer :style="{ textAlign: 'center' }">
            Ant Design ©2016 Created by Ant UED
          </v-footer>
        </v-layout>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Show',
  data() {
    return {
      customCollapsed: false,
      menuData4: [{
        name: '首页',
        icon: 'user',
        selected: true,
        children: [{
          name: 'Tome'
        },{
          name: 'Bill'
        },{
          name: 'Alex'
        }]
      },{
        name: '基础数据',
        icon: 'video-camera',
        children: [{
          name: '用户信息'
        },{
          name: '管理员信息'
        },{
          name: 'Alex'
        }]
      },{
        name: 'nav 3',
        icon: 'upload'
      }]
    }
  },
  methods: {
    toggle() {
      this.customCollapsed = !this.customCollapsed;
    }
  }
}
</script>

<style scoped>
#components-layout{
  height: 100%;
}
#components-layout-demo-custom-trigger {
  height: 100%;
}
.ant-layout.ant-layout-has-sider{
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 16px;
  cursor: pointer;
  transition: color .3s;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #108ee9;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: #333;
  border-radius: 6px;
  margin: 16px;
}
#components-layout-demo-custom-trigger .ant-layout-sider-collapsed .anticon {
  font-size: 16px;
}
#components-layout-demo-custom-trigger .ant-layout-sider-collapsed .nav-text {
  display: none;
}
</style>