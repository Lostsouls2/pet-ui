<template>
  <div>
    <v-more-panel>
      <v-form slot="form">
        <v-form-item label="角色">
          <v-input placeholder="请输入管理员名称"></v-input>
        </v-form-item>
        <v-form-item label="状态">
          <v-select placeholder="请选择状态" style="width: 160px;" notfound="无法找到" :data="[{value: '1', label: '启用'}, {value: '2', label: '停用'}]"></v-select>
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
        </template>
      </v-data-table>
    </div>
    <v-modal :title="modelTitle" :visible="customFooterVisible" @cancel="customFooterCancel">
      <v-form direction="horizontal" :model="customForm" :rules="customRules" ref="customRuleForm">
        <v-form-item label="角色" :label-col="labelCol" :wrapper-col="wrapperCol" prop="account" has-feedback>
          <v-input size="large" v-model="customForm.account"></v-input>
        </v-form-item>
        <v-form-item label="手机" :label-col="labelCol" :wrapper-col="wrapperCol" prop="phone" has-feedback>
          <v-input size="large" v-model="customForm.phone"></v-input>
        </v-form-item>
        <v-form-item label="邮箱" :label-col="labelCol" :wrapper-col="wrapperCol" prop="mailbox" has-feedback>
          <v-input size="large" v-model="customForm.mailbox"></v-input>
        </v-form-item>
        <v-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol" prop="state">
          <!--          <v-input size="large" v-model="customForm.state"></v-input>-->
          <v-select v-model="customForm.state" placeholder="请选择状态" notfound="无法找到" :data="[{value: '1', label: '区域1'}, {value: '2', label: '区域2'}]"></v-select>
        </v-form-item>
        <v-form-item label="权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="power">
          <!--          <v-input size="large" v-model="customForm.power"></v-input>-->
          <v-select v-model="customForm.power" placeholder="请选择管理员" notfound="无法找到" :data="[{value: '1', label: '区域1'}, {value: '2', label: '区域2'}]"></v-select>
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
    let validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.customForm.account !== '') {
          // this.$refs.customRuleForm.validateField('account');
        }
        callback();
      }
    };
    // let validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'));
    //   } else {
    //     if (this.customForm.password !== '') {
    //       // this.$refs.customRuleForm.validateField('password');
    //     }
    //     callback();
    //   }
    // };
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (this.customForm.phone !== '') {
          // this.$refs.customRuleForm.validateField('phone');
        }
        callback();
      }
    };
    let validateMailbox = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (this.customForm.mailbox !== '') {
          // this.$refs.customRuleForm.validateField('mailbox');
        }
        callback();
      }
    };
    let validateState = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择状态'));
      } else {
        if (this.customForm.state !== '') {
          // this.$refs.customRuleForm.validateField('state');
        }
        callback();
      }
    };
    let validatePower = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择管理员'));
      } else {
        if (this.customForm.power !== '') {
          // this.$refs.customRuleForm.validateField('power');
        }
        callback();
      }
    };
    return {
      customFooterVisible: false,
      customFooterLoading: false,
      loadData(pramas) {
        return axios.get('/datatable.json',pramas).then(res =>{
          return res.data;
        });
      },
      columns:[
        {title:"角色",field:'account',width:'16.6%'},
        {title:"状态",field:'state',width:'16.6%'},
        {title:"创建人",field:'phone',width:'16.6%'},
        {title:"创建时间",field:'mailbox',width:'16.6%'},
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
        // password: [{
        //   required: true,
        //   message: '请输入密码'
        // },
        //   {
        //     validator: validatePass
        //   }
        // ],
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
    edit: function (obj){
      this.customFooterVisible = true
      this.modelTitle = '编辑'
      this.customForm.account = obj.account
      // this.customForm.password = obj.password
      this.customForm.phone = obj.phone
      this.customForm.mailbox = obj.mailbox
      this.customForm.state = '1'
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