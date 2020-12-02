<template>
  <div>
    <el-row :gutter="0" class="row-bg">
      <el-col :span="7" v-for="(item,index) in list" :key="index" class="col-bg">
        <el-card class="box-card" @click.native="goTask">
          <div slot="header" class="clearfix">
            <span>{{item.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
          </div>
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
      ]
    }
  },
  methods: {
    goTask() {
      console.log(1)
      this.$router.push({path:'/task'})
    }
  }
}
</script>
<style lang="less" scoped>
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;

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
    width: 480px;
  }
</style>