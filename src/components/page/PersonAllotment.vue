<template>
  <div class="container project">
    <div class="handle-box">
        <label for="">业务方向</label>
        <el-select v-model="query.entrydirection" filterable placeholder="请选择" class="handle-select mr10">
            <el-option key="0" label="请选择" value="0"></el-option>
            <el-option key="1" label="业务方向1" value="1"></el-option>
            <el-option key="2" label="业务方向2" value="2"></el-option>
        </el-select>
        <label for="">项目名称</label>
        <el-select v-model="query.entryName" filterable placeholder="请选择" class="handle-select mr10">
            <el-option key="0" label="请选择" value="0"></el-option>
            <el-option key="1" label="项目1" value="1"></el-option>
            <el-option key="2" label="项目2" value="2"></el-option>
        </el-select>
        <label for="">任务名称</label>
        <el-select v-model="query.taskName" filterable placeholder="请选择" class="handle-select mr10">
            <el-option key="0" label="请选择" value="0"></el-option>
            <el-option key="1" label="项目1" value="1"></el-option>
            <el-option key="2" label="项目2" value="2"></el-option>
        </el-select>
        <label for="">人员姓名</label>
        <el-input v-model="query.name" placeholder="请输入" class="handle-select mr10"></el-input>
        <label for="">时间段</label>
        <div class="handle-date mr10">
            <el-date-picker
            v-model="query.timeSlot"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            >
            </el-date-picker>
        </div>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      ref="ProjectTbale"
      class="table"
      max-height="500"
      header-cell-class-name="table-header">
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      >           
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand" v-for="(item, index) in props.row.taskarr" :key="index">
            <el-form-item label="项目名称">
              <span>{{ item.pname }}</span>
            </el-form-item>
            <el-form-item label="任务名称">
              <span>{{ item.tname }}</span>
            </el-form-item>
            <el-form-item label="在项时间">
              <span>{{ item.inpTime }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ item.inStatus }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> 
      
      <el-table-column
        label="姓名"
        prop="userName"
        align="center"
      >           
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex"
        align="center"
      >           
      </el-table-column>
      <el-table-column
        label="所属公司"
        prop="companyid"
        align="center"
      >           
      </el-table-column>
      <el-table-column
        label="技能"
        prop="skillid"
        align="center"
      >           
      </el-table-column>
      <el-table-column
        label="级别"
        prop="level"
        align="center"
      >           
      </el-table-column>
      <el-table-column
        label="所属项目"
        prop="inProject"
        align="center"
      >           
      </el-table-column>
      <el-table-column
        label="所在任务"
        prop="inTask"
        align="center"
      >           
      </el-table-column>
      <el-table-column
        label="所在任务时间"
        prop="timeSlot"
        width="180"
        align="center"
      >           
      </el-table-column>
      <el-table-column
        label="预估出项时间"
        prop="outTime"
        align="center"
      >           
      </el-table-column>
      <el-table-column align="center" width="80" label="操作">
        <el-button type="text">分配任务</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      query:{
        entrydirection:"",
        entryName:"",
        taskName:"",
        timeSlot:"",
        name:""
      },
      tableData:[
        {
          userName:"xxx",
          sex:"男",
          companyid:"xx",
          skillid:"Java前端设计师",
          level:'中级中',
          inProject:'可视化',
          inTask:"三维球",
          timeSlot:'2020-09-01 - 2020-10-11',
          outTime:'2020-10-11',
          taskarr:[
            {
              pname:'项目1',
              tname:'任务1',
              inpTime:'2020-01-20 - 2020-10-20',
              inStatus:'长期在项'
            },{
              pname:'项目2',
              tname:'任务2',
              inpTime:'2020-5-20 - 2020-6-20',
              inStatus:'借调'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
    .el-table.insideTable th{
        background:#ecf5ff !important;
    }
    .el-table__expanded-cell{
        padding:0;
    }
    .addProject.addlay>div:nth-child(2){
        padding:10px 20px;
    }
    .addProject .tableBox .el-form-item__content{
        width:100%;
    }
    .addProject .el-input--suffix .el-input__inner{
        padding:10px;
    }
    .addProject .el-date-editor .el-range-input{
        width: 43%;
    }
    .addProject .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--small{
        padding:0 0 0 10px;
        width: 165px;
    }
    .addProject .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--small i{
        display: none;
    }
    .addProject .el-range-editor--small .el-range__close-icon,.addProject .el-range-editor--small .el-range__icon{
      display: none;
    }
    .addProject .el-date-editor .el-range-input{
      width:45%;
    }
</style>
<style scoped>
.project.container{
    padding-bottom: 0;
}
.handle-box {
    height:70px;
    /* margin-bottom: 20px; */
}

.handle-select {
    width: 120px;
}
.handle-date{
    width:180px;
    display: inline-block;
}
.handle-input {
    width: 220px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
    /* height:calc(100% - 70px); */
    /* height: 530px; */
    overflow: auto;
}
.red {
    color: #ff0000;
}
.green{
    color:goldenrod;
}
.mr10 {
    margin-right: 15px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.taskList{
    width:100%;
    /* max-height: 250px;
    overflow: auto; */
    position: relative;
    margin:0;
}
.addBtn{
    position: absolute;
    top:10px;
    right:15px;
    z-index: 10;
}
.el-range-editor--small.el-input__inner{
    width:180px;
}
.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
    line-height: 1;
    vertical-align: bottom;
}
.projectFooter{
    padding:0 20px 20px
}

</style>