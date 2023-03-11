<template>
  <div>
    <v-more-panel>
      <v-form slot="form">
        <v-form-item label="菜单">
          <v-input placeholder="请输入菜单名称"></v-input>
        </v-form-item>
        <v-form-item label="状态">
          <v-select placeholder="请选择状态" style="width: 160px;" notfound="无法找到" :data="[{value: '1', label: '启用'}, {value: '2', label: '停用'}]"></v-select>
        </v-form-item>
      </v-form>
      <v-button slot="control" type="primary" html-type="button" icon="search">查询</v-button>
      <span slot="control" style="margin: 2px"></span>
      <v-button slot="control" type="primary" html-type="button" icon="plus" @click="add">添加</v-button>
    </v-more-panel>
    <v-data-table :data='loadData' :columns='columns' tree-table :tree-option='treeOption'>
      <template slot="td" slot-scope="props">
        <div v-if="props.column.field ==='action' && props.item.pid !== 0">
          <v-button type="primary" shape="circle" icon="edit" @click="edit(props.item)"></v-button>
          <span style="margin: 1px"></span>
          <v-button type="error" shape="circle" icon="close"></v-button>
        </div>
<!--        <div v-if="props.column.field ==='add'">-->
<!--          <div v-if="props.content === 0">-->
<!--            <v-button type="error">禁用</v-button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <span v-else v-html="props.content"></span>-->
      </template>
    </v-data-table>
    <v-modal :title="modelTitle" :visible="systemFooterVisible" @cancel="systemFooterCancel">
      <v-form direction="horizontal" :model="systemForm" :rules="systemRules" ref="systemRuleForm">
        <v-form-item label="菜单名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="menuName" >
          <v-input size="large" v-model="systemForm.menuName"></v-input>
        </v-form-item>
        <v-form-item label="添加" :label-col="labelCol" :wrapper-col="wrapperCol" prop="add" >
          <v-radio-group v-model="systemForm.add" :data="[{value: '1', text: '线上品牌商赞助'},{value: '2', text: '线下场地免费'}]"></v-radio-group>
        </v-form-item>
        <v-form-item label="编辑" :label-col="labelCol" :wrapper-col="wrapperCol" prop="edit" >
          <v-radio-group v-model="systemForm.edit" :data="[{value: '1', text: '线上品牌商赞助'},{value: '2', text: '线下场地免费'}]"></v-radio-group>
        </v-form-item>
        <v-form-item label="删除" :label-col="labelCol" :wrapper-col="wrapperCol" prop="del">
          <v-radio-group v-model="systemForm.del" :data="[{value: '1', text: '线上品牌商赞助'},{value: '2', text: '线下场地免费'}]"></v-radio-group>
        </v-form-item>
        <v-form-item label="其他" :label-col="labelCol" :wrapper-col="wrapperCol" prop="other">
          <v-radio-group v-model="systemForm.other" :data="[{value: '1', text: '线上品牌商赞助'},{value: '2', text: '线下场地免费'}]"></v-radio-group>
        </v-form-item>
        <v-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol" prop="state">
          <v-radio-group v-model="systemForm.state" :data="[{value: '1', text: '线上品牌商赞助'},{value: '2', text: '线下场地免费'}]"></v-radio-group>
        </v-form-item>
      </v-form>
      <div slot="footer">
        <v-button key="cancel" type="ghost" size="large" @click="systemFooterCancel('systemRuleForm')">
          返 回
        </v-button>
        <v-button key="confirm" type="primary" size="large" :loading="systemFooterLoading" @click="systemFooterOk('systemRuleForm')">
          提 交
        </v-button>
      </div>
    </v-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Menu',
  data: function () {
    let validateMenuName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入菜单名称'));
      } else {
        callback();
      }
    };
    // let validateAdd = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请选择状态'));
    //   } else {
    //     callback();
    //   }
    // };
    // let validateEdit = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请选择状态'));
    //   } else {
    //     callback();
    //   }
    // };
    // let validateDel = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请选择状态'));
    //   } else {
    //     callback();
    //   }
    // };
    // let validateOther = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请选择状态'));
    //   } else {
    //     callback();
    //   }
    // };
    let validateState = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择状态'));
      } else {
        callback();
      }
    };
    return {
      loadData(pramas) {
        return axios.get('/asyn.json',pramas).then(res =>{
          return res.data;
        });
      },
      columns:[
        {title:"菜单",field:'menuName',width:'22.28%'},
        {title:"添加",field:'add',width:'12.28%'},
        {title:"编辑",field:'edit',width:'12.28%'},
        {title:"删除",field:'del',width:'12.28%'},
        {title:"其他",field:'other',width:'12.28%'},
        {title:"状态",field:'state',width:'14.28%'},
        {title:"操作",field:'action',width:'14.28%'}
      ],
      treeOption:{
        isAsync: true,
        loadChildren: function(pramas){
          console.log(pramas)
          return axios.get("/tes.json",pramas).then(res =>{
            return res.data;
          });
        }
      },
      modelTitle: '',
      systemForm: {
        menuName: '',
        add: '',
        edit: '',
        del: '',
        other: '',
        state: ''
      },
      systemFooterVisible: false,
      systemFooterLoading: false,
      systemRules: {
        menuName: [{
          required: true,
          message: '请输入菜单名称'
        },
          {
            validator: validateMenuName
          }
        ],
        add: [{
          required: true,
          message: '请选择状态'
        },
          {
            validator: validateState
          }
        ],
        edit: [{
          required: true,
          message: '请选择状态'
        },
          {
            validator: validateState
          }
        ],
        del: [{
          required: true,
          message: '请选择状态'
        },
          {
            validator: validateState
          }
        ],
        other: [{
          required: true,
          message: '请选择状态'
        },
          {
            validator: validateState
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
      }
    }
  },
  methods: {
    systemFooterCancel () {
      // 返回及重置
      for(var key in this.systemForm){
        delete this.systemForm[key];
      }
      this.systemFooterVisible = false;
    },
    systemFooterOk (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 对话框将在两秒后关闭 */
          this.systemFooterLoading = true;
          setTimeout(() => {
            this.systemFooterVisible = false;
            this.systemFooterLoading = false;
          }, 2000);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    edit: function (obj){
      this.systemFooterVisible = true
      this.modelTitle = '编辑'
      // this.customForm.account = obj.account
      // // this.customForm.password = obj.password
      // this.customForm.phone = obj.phone
      // this.customForm.mailbox = obj.mailbox
      // this.customForm.state = '1'
      // this.customForm.power = obj.power
    },
    add(){
      this.systemFooterVisible = true
      this.modelTitle = '新增'
    }
  }
}
</script>

<style scoped>

</style>