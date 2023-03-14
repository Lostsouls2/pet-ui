<template>
  <div>
    <v-more-panel>
      <v-form slot="form">
        <v-form-item label="账号">
          <v-input placeholder="请输入账号"></v-input>
        </v-form-item>
        <v-form-item label="密码">
          <v-input type="password" placeholder="请输入密码"></v-input>
        </v-form-item>
        <v-form-item label="手机">
          <v-input placeholder="请输入手机"></v-input>
        </v-form-item>
        <v-form-item label="邮箱">
          <v-input placeholder="请输入邮箱"></v-input>
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
          <div v-if="props.column.field=='state'">
            <div v-if="props.content === 0">
              <v-badge status="success"></v-badge>
            </div>
            <div v-else-if="props.content === 1">
              <v-badge status="error"></v-badge>
            </div>
          </div>
          <div v-else-if="props.column.field=='power'">
            <div v-for="(item,index) in powerDic">
              <div v-if="props.content === powerDic[index].value">
                <span>{{powerDic[index].label}}</span>
              </div>
            </div>
          </div>
          <span v-else v-html="props.content"></span>
          <div v-if="props.column.field=='action'">
            <v-button type="primary" shape="circle" icon="edit" @click="edit(props.item)"></v-button>
            <span style="margin: 1px"></span>
            <v-button type="error" shape="circle" icon="close"></v-button>
          </div>
        </template>
      </v-data-table>
    </div>
    <v-modal :title="modelTitle" :visible="customFooterVisible" @cancel="customFooterCancel">
      <v-form direction="horizontal" :model="customForm" :rules="customRules" ref="customRuleForm">
        <v-form-item label="账号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="account" has-feedback>
          <v-input size="large" v-model="customForm.account"></v-input>
        </v-form-item>
        <v-form-item label="手机" :label-col="labelCol" :wrapper-col="wrapperCol" prop="phone" has-feedback>
          <v-input size="large" v-model="customForm.phone"></v-input>
        </v-form-item>
        <v-form-item label="邮箱" :label-col="labelCol" :wrapper-col="wrapperCol" prop="mailbox" has-feedback>
          <v-input size="large" v-model="customForm.mailbox"></v-input>
        </v-form-item>
        <v-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol" prop="state">
          <v-select v-model="customForm.state" placeholder="请选择状态" notfound="无法找到" :data="selectDic"></v-select>
        </v-form-item>
        <v-form-item label="权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="power">
          <v-select v-model="customForm.power" placeholder="请选择管理员" notfound="无法找到" :data="powerDic"></v-select>
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
  name: 'Account',
  created () {
    let itself = this
    axios.get('/role.json').then(res => {
      let powerDics = []
      for (let index in res.data.result){
        powerDics.push({
          value: res.data.result[index].id,
          label: res.data.result[index].role
        })
      }
      itself.powerDic = powerDics;
    })
  },
  data: function () {
    let validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        callback();
      }
    };
    let validateMailbox = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
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
    let validatePower = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择管理员'));
      } else {
        callback();
      }
    };
    return {
      customFooterVisible: false,
      customFooterLoading: false,
      selectDic: [{value: 0, label: '启用'}, {value: 1, label: '停用'}],
      powerDic: null,
      loadData(pramas) {
        return axios.get('/datatable.json',pramas).then(res =>{
          return res.data;
        });
      },
      columns:[
        {title:"账号",field:'account',width:'16.6%'},
        {title:"手机",field:'phone',width:'16.6%'},
        {title:"邮箱",field:'mailbox',width:'16.6%'},
        {title:"状态",field:'state',width:'16.6%'},
        {title:"权限",field:'power',width:'16.6%'},
        {title:"操作",field:'action',width:'16.6%'}
      ],
      modelTitle: '',
      customForm: {
        account: '',
        password: '',
        phone: '',
        mailbox: '',
        state: '',
        power: ''
      },
      customRules: {
        account: [{
          required: true,
          message: '请输入账号'
        },
          {
            validator: validateAccount
          }
        ],
        phone: [{
          required: true,
          message: '请输入手机号'
        },
          {
            validator: validatePhone
          }
        ],
        mailbox: [{
          required: true,
          message: '请输入邮箱'
        },
          {
            validator: validateMailbox
          }
        ],
        state: [{
          required: true,
          message: '请选择状态'
        },
          {
            validator: validateState
          }
        ],
        power: [{
          required: true,
          message: '请选择管理员'
        },
          {
            validator: validatePower
          }
        ]
      },
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }
  },
  methods:{
    // 编辑
    edit: function (obj){
      this.customFooterVisible = true
      this.modelTitle = '编辑'
      this.customForm.account = obj.account
      this.customForm.phone = obj.phone
      this.customForm.mailbox = obj.mailbox
      this.customForm.state = obj.state
      this.customForm.power = obj.power
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
    }
  }
}
</script>

<style scoped>
.ant-select-selection--single {
  width: 160px;
}
</style>