<template>
  <v-form direction="horizontal" :model="customForm" :rules="customRules" ref="customRuleForm">
    <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="pass" has-feedback>
      <v-input type="password" size="large" v-model="customForm.pass"></v-input>
    </v-form-item>
    <v-form-item label="确认密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="checkPass" has-feedback>
      <v-input type="password" size="large" v-model="customForm.checkPass"></v-input>
    </v-form-item>
    <v-form-item label="年龄" :label-col="labelCol" :wrapper-col="wrapperCol" prop="age" has-feedback>
      <v-input size="large" v-model="customForm.age"></v-input>
    </v-form-item>
    <v-form-item label="年龄" :label-col="labelCol" :wrapper-col="wrapperCol" prop="age1">
<!--      <v-input size="large" v-model="customForm.age1"></v-input>-->
      <v-select v-model="customForm.age1" placeholder="请选择状态" notfound="无法找到" :data="[{value: '1', label: '区域1'}, {value: '2', label: '区域2'}]"></v-select>
    </v-form-item>
    <v-form-item label="年龄" :label-col="labelCol" :wrapper-col="wrapperCol" prop="age2">
<!--      <v-input size="large" v-model="customForm.age2"></v-input>-->
      <v-select v-model="customForm.age2" placeholder="请选择状态" notfound="无法找到" :data="[{value: '1', label: '区域1'}, {value: '2', label: '区域2'}]"></v-select>
    </v-form-item>
    <v-form-item label="年龄" :label-col="labelCol" :wrapper-col="wrapperCol" prop="age3" has-feedback>
      <v-input size="large" v-model="customForm.age3"></v-input>
    </v-form-item>
    <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="account" has-feedback>
      <v-input size="large" v-model="customForm.account"></v-input>
    </v-form-item>
    <v-form-item :wrapper-col="{offset:6, span: 14 }">
      <v-button type="primary" style="margin-right:10px" @click.prevent="submitForm('customRuleForm')">提交</v-button>
      <v-button type="ghost" @click.prevent="resetForm('customRuleForm')">重置</v-button>
    </v-form-item>
  </v-form>
</template>

<script>
export default {
  name: 'test',
  data() {
    var checkAge = (rule, value, callback) => {
      var age = parseInt(value, 10);

      setTimeout(() => {
        if (!Number.isInteger(age)) {
          callback(new Error('请输入数字值'));
        } else {
          if (age < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    let validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.customForm.account !== '') {
          this.$refs.customRuleForm.validateField('account');
        }
        callback();
      }
    };
    var checkAge1 = (rule, value, callback) => {
      var age = parseInt(value, 10);

      setTimeout(() => {
        if (!Number.isInteger(age)) {
          callback(new Error('请输入数字值'));
        } else {
          if (age < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkAge2 = (rule, value, callback) => {
      var age = parseInt(value, 10);

      setTimeout(() => {
        if (!Number.isInteger(age)) {
          callback(new Error('请输入数字值'));
        } else {
          if (age < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkAge3 = (rule, value, callback) => {
      // var age = parseInt(value, 10);

      if (value === '') {
        callback(new Error('请输入账号'));
      }else{
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.customForm.checkPass !== '') {
          this.$refs.customRuleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
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
        pass: '',
        checkPass: '',
        age: '',
        account: ''
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
        pass: [{
          required: true,
          message: '请输入密码'
        },
          {
            validator: validatePass
          }
        ],
        checkPass: [{
          required: true,
          message: '请再次输入密码'
        },
          {
            validator: validatePass2
          }
        ],
        age: [{
          required: true,
          message: '请填写年龄'
        },
          {
            validator: checkAge
          }
        ],
        age1: [{
          required: true,
          message: '请填写年龄'
        },
          {
            validator: checkAge1
          }
        ],
        age2: [{
          required: true,
          message: '请填写年龄'
        },
          {
            validator: checkAge2
          }
        ],
        age3: [{
          required: true,
          message: '请填写年龄'
        },
          {
            validator: checkAge3
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

</style>