<template>
  <div>
    <v-more-panel>
      <v-form slot="form">
        <v-form-item label="角色">
          <v-input placeholder="请输入管理员名称"></v-input>
        </v-form-item>
        <v-form-item label="状态">
          <v-select placeholder="请选择状态" style="width: 160px;" notfound="无法找到" :data="selectDic"></v-select>
        </v-form-item>
      </v-form>
      <v-button slot="control" type="primary" html-type="button" icon="search">查询</v-button>
      <span slot="control" style="margin: 2px"></span>
      <v-button slot="control" type="primary" html-type="button" icon="plus" @click="add">添加</v-button>
    </v-more-panel>
    <div style='overflow: hidden;'>
      <v-data-table :data='loadData' :columns='columns'>
        <template slot="td" slot-scope="props">
          <div v-if="props.column.field=='action'">
            <v-button type="primary" shape="circle" icon="edit" @click="edit(props.item)"></v-button>
            <span style="margin: 1px"></span>
            <v-button type="error" shape="circle" icon="close"></v-button>
          </div>
          <div v-if="props.column.field=='state'">
            <div v-if="props.content === 0">
              <v-badge status="success"></v-badge>
            </div>
            <div v-else-if="props.content === 1">
              <v-badge status="error"></v-badge>
            </div>
          </div>
          <span v-else v-html="props.content"></span>
        </template>
      </v-data-table>
    </div>
    <v-modal :title="modelTitle" :visible="customFooterVisible" @cancel="customFooterCancel">
      <v-form direction="horizontal" :model="customForm" :rules="customRules" ref="customRuleForm">
        <v-form-item label="角色" :label-col="labelCol" :wrapper-col="wrapperCol" prop="role" has-feedback>
          <v-input size="large" v-model="customForm.role"></v-input>
        </v-form-item>
        <v-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol" prop="state">
          <v-select v-model="customForm.state" placeholder="请选择状态" notfound="无法找到" :data="selectDic"></v-select>
        </v-form-item>
        <v-form-item label="菜单权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="power">
<!--          <v-select v-model="customForm.power" placeholder="请选择管理员" notfound="无法找到" :data="[{value: '1', label: '区域1'}, {value: '2', label: '区域2'}]"></v-select>-->
          <div>
            <p>
              <v-checkbox :indeterminate="indeterminate" v-model="allChecked" @click="checkAll">全选</v-checkbox>
            </p>
            <p>
              <span style="margin-right: 1em"></span><v-checkbox :indeterminate="indeterminateHome" v-model="allCheckedHome" @click="checkHome">首页</v-checkbox>
            </p>
            <p>
              <span style="margin-right: 2em"></span><v-checkbox :indeterminate="indeterminateUser" v-model="allCheckedUser" @click="checkUser">用户统计</v-checkbox>
            </p>
            <p style="margin-left: 2em">
              <v-checkbox-group :data="options" v-model="UserFruits" @change="setStateUser"></v-checkbox-group>
            </p>
            <p>
              <span style="margin-right: 1em"></span><v-checkbox :indeterminate="indeterminateBasic" v-model="allCheckedBasic" @click="checkBasic">基础数据</v-checkbox>
            </p>
            <p>
              <span style="margin-right: 2em"></span><v-checkbox :indeterminate="indeterminateUserInfo" v-model="allCheckedUserInfo" @click="checkUserInfo">用户信息</v-checkbox>
            </p>
            <p style="margin-left: 2em">
              <v-checkbox-group :data="options" v-model="UserInfoFruits" @change="setStateUserInfo"></v-checkbox-group>
            </p>
            <p>
              <span style="margin-right: 2em"></span><v-checkbox :indeterminate="indeterminateAdminInfo" v-model="allCheckedAdminInfo" @click="checkAdminInfo">管理员信息</v-checkbox>
            </p>
            <p style="margin-left: 2em">
             <v-checkbox-group :data="options" v-model="AdminInfoFruits" @change="setStateAdminInfo"></v-checkbox-group>
            </p>
            <p>
              <span style="margin-right: 1em"></span><v-checkbox :indeterminate="indeterminateSys" v-model="allCheckedSys" @click="checkSys">系统设置</v-checkbox>
            </p>
            <p>
              <span style="margin-right: 2em"></span><v-checkbox :indeterminate="indeterminateMenuSet" v-model="allCheckedMenuSet" @click="checkMenuSet">菜单设置</v-checkbox>
            </p>
            <p style="margin-left: 2em">
              <v-checkbox-group :data="options" v-model="MenuSetFruits" @change="setStateMenuSet"></v-checkbox-group>
            </p>
          </div>
        </v-form-item>
      </v-form>
      <div slot="footer">
        <v-button key="cancel" type="ghost" size="large" @click="customFooterCancel('customRuleForm')">
          返 回
        </v-button>
        <v-button key="confirm" type="primary" size="large" :loading="customFooterLoading" @click="customFooterOk('customRuleForm')">
          提 交
        </v-button>
      </div>
    </v-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Role',
  data: function () {
    let validateRole = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    let validateState = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择状态'));
      } else {
        callback();
      }
    };
    return {
      customFooterVisible: false,
      customFooterLoading: false,
      loadData(pramas) {
        return axios.get('/role.json',pramas).then(res =>{
          return res.data;
        });
      },
      columns:[
        {title:"角色",field:'role',width:'16.6%'},
        {title:"状态",field:'state',width:'16.6%'},
        {title:"创建人",field:'createName',width:'16.6%'},
        {title:"创建时间",field:'createData',width:'16.6%'},
        {title:"菜单权限",field:'menuPower',width:'16.6%'},
        {title:"操作",field:'action',width:'16.6%'}
      ],
      modelTitle: '',
      selectDic: [{value: 0, label: '启用'}, {value: 1, label: '停用'}],
      customForm: {
        role: '',
        state: '',
        createName: '',
        createData: '',
        menuPower: ''
      },
      customRules: {
        role: [{
          required: true,
          message: '请输角色名称'
        },
          {
            validator: validateRole
          }
        ],
        state: [{
          required: true,
          message: '请选择状态'
        },
          {
            validator: validateState
          }
        ]
      },
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
      indeterminate: false,
      indeterminateHome: false,
      indeterminateUser: false,
      indeterminateBasic: false,
      indeterminateUserInfo: false,
      indeterminateAdminInfo: false,
      indeterminateSys: false,
      indeterminateMenuSet: false,
      allChecked: false,
      allCheckedHome: false,
      allCheckedUser: false,
      allCheckedBasic: false,
      allCheckedUserInfo: false,
      allCheckedAdminInfo: false,
      allCheckedSys: false,
      allCheckedMenuSet: false,
      fruits: ['Apple', 'Orange'],
      UserFruits: [],
      UserInfoFruits: [],
      AdminInfoFruits: [],
      MenuSetFruits: [],
      options: [
        {label: '新增', value: 0},
        {label: '编辑', value: 1},
        {label: '删除', value: 2},
        {label: '其他', value: 3},
      ],
      allFruits: [0, 1, 2, 3]
    }
  },
  methods:{
    edit: function (obj){
      this.customFooterVisible = true
      this.modelTitle = '编辑'
      this.customForm.role = obj.role
      this.customForm.state = obj.state
    },
    customFooterOk (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 对话框将在两秒后关闭 */
          this.customFooterLoading = true;
          setTimeout(() => {
            this.customFooterVisible = false;
            this.customFooterLoading = false;
          }, 2000);
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    customFooterCancel () {
      // 返回及重置
      for(var key in this.customForm){
        delete this.customForm[key];
      }
      this.customFooterVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    add(){
      this.customFooterVisible = true
      this.modelTitle = '新增'
    },
    checkAll() {
      // if (this.fruits.length == this.options.length) {
      //   this.fruits = [];
      //   this.allChecked = false;
      //   this.indeterminate = false;
      // } else {
      //   this.fruits = JSON.parse(JSON.stringify(this.allFruits));
      //   this.allChecked = true;
      //   this.indeterminate = false;
      // }
    },
    checkHome() {
      if (this.UserFruits.length == this.options.length){
        this.UserFruits = []
        this.indeterminateHome = false
        this.indeterminateUser = false
        this.allCheckedHome = false
        this.allCheckedUser = false
      } else {
        this.UserFruits = JSON.parse(JSON.stringify(this.allFruits));
        this.indeterminateHome = false
        this.indeterminateUser = false
        this.allCheckedHome = false
        this.allCheckedUser = false
      }
    },
    checkUser(){
      if (this.UserFruits.length == this.options.length){
        this.UserFruits = []
        this.indeterminateHome = false
        this.indeterminateUser = false
        this.allCheckedHome = false
        this.allCheckedUser = false
      } else {
        this.UserFruits = JSON.parse(JSON.stringify(this.allFruits));
        this.indeterminateHome = false
        this.indeterminateUser = false
        this.allCheckedHome = false
        this.allCheckedUser = false
      }
    },
    setStateUser(){
      this.indeterminateHome =  this.UserFruits.length > 0 && this.UserFruits.length < this.options.length
      this.indeterminateUser =  this.UserFruits.length > 0 && this.UserFruits.length < this.options.length
      this.allCheckedHome = this.UserFruits.length == this.options.length
      this.allCheckedUser = this.UserFruits.length == this.options.length
    },
    checkBasic() {
      if (this.UserInfoFruits.length == this.options.length && this.AdminInfoFruits.length == this.options.length){
        // 全未选中
        this.UserInfoFruits = []
        this.AdminInfoFruits = []
        this.indeterminateUserInfo = false
        this.allCheckedUserInfo = false
        this.indeterminateAdminInfo = false
        this.allCheckedAdminInfo = false
        this.indeterminateBasic = false
        this.allCheckedBasic = false
      } else {
        // 全选中
        this.UserInfoFruits = JSON.parse(JSON.stringify(this.allFruits));
        this.indeterminateUserInfo = false
        this.allCheckedUserInfo = false
        this.AdminInfoFruits = JSON.parse(JSON.stringify(this.allFruits));
        this.indeterminateAdminInfo = false
        this.allCheckedAdminInfo = false
        this.indeterminateBasic = false
        this.allCheckedBasic = false
      }
    },
    checkUserInfo(){
      if (this.UserInfoFruits.length == this.options.length){
        this.UserInfoFruits = []
        this.indeterminateBasic = false
        this.indeterminateUserInfo = false
        this.allCheckedBasic = false
        this.allCheckedUserInfo = false
      } else {
        this.UserInfoFruits = JSON.parse(JSON.stringify(this.allFruits));
        this.indeterminateBasic = false
        this.indeterminateUserInfo = false
        this.allCheckedBasic = false
        this.allCheckedUserInfo = false
      }
    },
    setStateUserInfo(){
      this.indeterminateBasic =  this.UserInfoFruits.length > 0 && this.UserInfoFruits.length < this.options.length || this.AdminInfoFruits.length > 0 && this.AdminInfoFruits.length < this.options.length
      this.indeterminateUserInfo =  this.UserInfoFruits.length > 0 && this.UserInfoFruits.length < this.options.length
      this.allCheckedBasic = this.UserInfoFruits.length == this.options.length && this.AdminInfoFruits.length == this.options.length
      this.allCheckedUserInfo = this.UserInfoFruits.length == this.options.length
    },
    checkAdminInfo(){
      if (this.AdminInfoFruits.length == this.options.length){
        this.AdminInfoFruits = []
        this.indeterminateBasic = false
        this.indeterminateAdminInfo = false
        this.allCheckedBasic = false
        this.allCheckedAdminInfo = false
      } else {
        this.AdminInfoFruits = JSON.parse(JSON.stringify(this.allFruits));
        this.indeterminateBasic = false
        this.indeterminateAdminInfo = false
        this.allCheckedBasic = false
        this.allCheckedAdminInfo = false
      }
    },
    setStateAdminInfo(){
      this.indeterminateBasic =  this.AdminInfoFruits.length > 0 && this.AdminInfoFruits.length < this.options.length || this.UserInfoFruits.length > 0 && this.UserInfoFruits.length < this.options.length
      this.indeterminateAdminInfo =  this.AdminInfoFruits.length > 0 && this.AdminInfoFruits.length < this.options.length
      this.allCheckedBasic = this.AdminInfoFruits.length == this.options.length && this.UserInfoFruits.length == this.options.length
      this.allCheckedAdminInfo = this.AdminInfoFruits.length == this.options.length
    },
    checkSys() {
      if (this.MenuSetFruits.length == this.options.length){
        this.MenuSetFruits = []
        this.indeterminateSys = false
        this.indeterminateMenuSet = false
        this.allCheckedSys = false
        this.allCheckedMenuSet = false
      } else {
        this.MenuSetFruits = JSON.parse(JSON.stringify(this.allFruits));
        this.indeterminateSys = false
        this.indeterminateMenuSet = false
        this.allCheckedSys = false
        this.allCheckedMenuSet = false
      }
    },
    checkMenuSet(){
      if (this.MenuSetFruits.length == this.options.length){
        this.MenuSetFruits = []
        this.indeterminateSys = false
        this.indeterminateMenuSet = false
        this.allCheckedSys = false
        this.allCheckedMenuSet = false
      } else {
        this.MenuSetFruits = JSON.parse(JSON.stringify(this.allFruits));
        this.indeterminateSys = false
        this.indeterminateMenuSet = false
        this.allCheckedSys = false
        this.allCheckedMenuSet = false
      }
    },
    setStateMenuSet(){
      this.indeterminateSys =  this.MenuSetFruits.length > 0 && this.MenuSetFruits.length < this.options.length
      this.indeterminateMenuSet =  this.MenuSetFruits.length > 0 && this.MenuSetFruits.length < this.options.length
      this.allCheckedSys = this.MenuSetFruits.length == this.options.length
      this.allCheckedMenuSet = this.MenuSetFruits.length == this.options.length
    },
    setState() {
      this.indeterminate =  this.fruits.length > 0 && this.fruits.length < this.options.length;
      this.allChecked = this.fruits.length == this.options.length;
    }
  }
}
</script>

<style scoped>
.ant-select-selection--single {
  width: 160px;
}
</style>