<template>
  <div class="login">
    <div style="width: 50%;background-color: black; height: 100%;float: left;">
      <img src="../assets/logo.png">
    </div>
    <div style="background-color: #42b983;width: 50%;height: 100%;float: left;">
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <v-form direction="horizontal" :model="customForm" :rules="customRules" ref="customRuleForm">
        <v-form-item label="账户" :label-col="labelCol" :wrapper-col="wrapperCol" prop="username" has-feedback>
          <v-input type="text" size="large" v-model="customForm.username"></v-input>
        </v-form-item>
        <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password" has-feedback>
          <v-input type="password" size="large" v-model="customForm.password"></v-input>
        </v-form-item>
        <v-form-item :wrapper-col="{offset:10, span: 14 }">
          <v-button type="primary" style="margin-right:10px" @click.prevent="submitForm('customRuleForm')">提交</v-button>
<!--          <v-button type="ghost" @click.prevent="resetForm('customRuleForm')">重置</v-button>-->
        </v-form-item>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'));
      } else {
        // if (this.customForm.checkPass !== '') {
        //   this.$refs.customRuleForm.validateField('checkPass');
        // }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.customForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      customForm: {
        username: '',
        password: ''
      },
      customRules: {
        username: [{
          required: true,
          message: '请输入账户'
        },
          {
            validator: validateName
          }
        ],
        password: [{
          required: true,
          message: '请输入密码'
        },
          {
            validator: validatePass
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
  methods: {
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
    }
  }
}
</script>

<style scoped>
.login{
  width: 800px;
  height: 500px;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  background-color: aqua;
}
</style>