<template>
  <div class="login">
    <div style="width: 100%; height: 100%;float: left;">
      <div style="width: 50%; height: 100%;float: left;border-radius: 50px 0px 0px 50px">
        <img src="../assets/photo-1553736026-ff14d158d222.jpg" style="width: 100%; height: 100%;border-radius: 50px 0px 0px 50px;box-shadow: 0 0 20px -5px ;"/>
      </div>
      <div style="width: 50%;height: 100%;float: left;border-radius: 0px 50px 50px 0px;box-shadow: 0 0 20px -5px ;">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1 style="text-align: center">系统</h1>
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
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
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
          if (this.customForm.username === 'admin' && this.customForm.password === 'admin'){
            sessionStorage.setItem('token',true)
            this.$router.push({
              path: '/Show'
            })
          }
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
  /*background-color: aqua;*/
}
</style>