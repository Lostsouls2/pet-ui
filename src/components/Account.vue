<template>
  <div>
    <v-more-panel>
      <v-form slot="form">
        <v-form-item label="用户名">
          <v-input placeholder="请输入用户名"></v-input>
        </v-form-item>
        <v-form-item label="密码">
          <v-input type="password" placeholder="请输入密码"></v-input>
        </v-form-item>
        <v-form-item label="机构编码">
          <v-input placeholder="请输入机构编码"></v-input>
        </v-form-item>
        <v-form-item label="年龄">
          <v-input placeholder="请输入年龄"></v-input>
        </v-form-item>
        <v-form-item label="手机">
          <v-input placeholder="请输入手机号码"></v-input>
        </v-form-item>
      </v-form>
      <v-button slot="control" type="primary" html-type="button" icon="search">查询</v-button>
    </v-more-panel>
    <div style='height:300px;overflow: hidden;'>
      <v-data-table :data='loadData' :columns='columns'></v-data-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Account',
  data: function () {
    return {
      loadData(pramas) {
        return axios.get('../assets/datatable.json',pramas).then(res =>{
          return res.data;
        });
      },
      columns:[
        {title:"歌名",field:'name'},
        {title:"时长",field:'time'},
        {title:"歌手",field:'singer'},
        {title:"专辑",field:'album'},
      ]
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>