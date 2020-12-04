<template>
  <div class="projeckD">
    <div class="pSearch">
      <el-tooltip class="item" effect="dark" content="项目搜索" placement="right-end">
        <el-button 
          type="primary" 
          title="项目搜索"
          icon="el-icon-search" 
          @click="sideSearch = !sideSearch"
          circle>
        </el-button>
      </el-tooltip>
    </div>
    <div class="sidebar" v-show="sideSearch">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="rgba(81,106,142,.6)"
        text-color="#fff"
        active-text-color="#ffd04b"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :unique-opened="true"
        >
        <el-submenu  v-for="(item,idx) in treeData" :key="idx" :index="idx">
          <template slot="title">
            <span slot="title">{{item.ks}}</span>
          </template>
          <el-menu-item v-for="(val,inx) in item.ry" :key="inx" :index="idx+'-'+inx">
            <span>{{val.name}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-row :gutter="20" class="row-bg">
      <el-col :span="6" v-for="(item,index) in list" :key="index">
        <el-card class="box-card" @click.native="goTask">
          <div slot="header" class="clearfix">
            <span>{{item.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
          </div>
          <div>项目科室：{{item.num}}</div>
          <div>主管领导：{{item.num}}</div>
          <div>项目编号：{{item.num}}</div>
          <div>业务方向：{{item.can}}</div>
          <div>评审单号：{{item.bill}}</div>
          <div>可用经费：{{item.maney}}</div>
          <div>项目负责人：{{item.people}}</div>
          <div>工作量预计：{{item.day}}</div>
          <div></div>
          <div></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
        {
        name: '东部大队',
        num:'XM-1112',
        can:'GUI，C4D，pr',
        people:'东吉英',
        bill:'TK-2345',
        maney:'$5236244',
        day:'10',

        },
      ],
      treeData:[
        {
          ks:'科室1',
          ry:[
            {
              name:'人员1'
            },{
              name:'人员2'
            },{
              name:'人员3'
            },{
              name:'人员4'
            }
          ]
        },{
          ks:'科室2',
          ry:[
            {
              name:'人员1'
            },{
              name:'人员2'
            },{
              name:'人员3'
            },{
              name:'人员4'
            }
          ]
        },{
          ks:'科室3',
          ry:[
            {
              name:'人员1'
            },{
              name:'人员2'
            },{
              name:'人员3'
            },{
              name:'人员4'
            }
          ]
        },{
          ks:'科室4',
          ry:[
            {
              name:'人员1'
            },{
              name:'人员2'
            },{
              name:'人员3'
            },{
              name:'人员4'
            }
          ]
        },{
          ks:'科室5',
          ry:[
            {
              name:'人员1'
            },{
              name:'人员2'
            },{
              name:'人员3'
            },{
              name:'人员4'
            }
          ]
        }
      ],
      isCollapse:false,
      sideSearch:false
    }
  },
  //科室一级，人员二级，项目三级
  methods: {
    handleOpen(key, keyPath) {
      console.log(key,keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key,keyPath)
    },
    handleSelect(key, keyPath){
      console.log(key,keyPath)
    },
    goTask() {
      console.log(1)
      this.$router.push({path:'/task'})
    }
  }
}
</script>
<style lang="less" scoped>
  .projeckD{
    height:100%;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .pSearch{
    position: absolute;
    z-index: 11;
    top: 0;
    transform: rotate(90deg);
  }
  .sidebar{
    height: 100%;
    // background: rgba(81,106,142,.5);
    overflow-y: auto;
    box-sizing: border-box;
    border:0 none;
    padding:0 !important;
    position: absolute;
    width:15%;
    z-index: 10;
    top:7px;
  }
  .sidebar .el-menu{
    padding-top:35px;
  }
  .row-bg {
    // padding: 10px 0;
    background-color: #f9fafc;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    height: 100%;
  }
  .col-bg {
    margin: 0 20px 30px 0;
    flex: 1;
    margin-left: 30px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    margin-bottom: 20px;
  }
  .cardcontent{
    height: 100%;
    overflow: auto;
    background:#f0f0f0;
  }
</style>