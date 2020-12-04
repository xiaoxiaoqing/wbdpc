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
      
      <!-- <el-table-column type="expand">
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
            <el-form-item label="任务状态">
              <span>{{ item.inTask }}</span>
            </el-form-item>
            <el-form-item label="人员状态">
              <span>{{ item.inStatus }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>  -->
      <el-table-column type="expand" prop="taskarr">
        <template slot-scope="scope">
          <el-table :data="scope.row.taskarr" size="mini" border class="taskDetail">
            <el-table-column
                prop="pname"
                label="项目名称"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">{{ scope.row.pname }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.pname"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="tname"
                label="任务名称"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">{{ scope.row.tname }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.tname"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="inStatus"
                label="人员状态"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">
                    <el-tag 
                    :type="scope.row.inStatus==='借调'?'warning':''"
                    effect="plain"
                    >{{scope.row.inStatus}}
                    </el-tag>
                  </div>
                  <div v-else>
                    <el-input v-model="scope.row.inStatus"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="inTask"
                label="任务状态"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">
                    <el-tag 
                      :type="scope.row.inTask==='进行中'?'danger':'success'"
                      >{{scope.row.inTask}}
                    </el-tag>
                  </div>
                  <div v-else>
                    <el-input v-model="scope.row.inTask"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="inpTime"
                label="在项时间"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">{{ scope.row.inpTime }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.inpTime"></el-input>
                  </div>
                </template>
              </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      >           
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
        width="120"
        align="center"
      >           
      </el-table-column>
      <el-table-column align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button 
          type="text"
          icon="el-icon-document"
          @click="pDetail(scope.$index, scope.row)"
          >详情</el-button>
          <el-button type="text" 
          icon="el-icon-share"
          @click="taskAllocation(scope.$index, scope.row)"
          >分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 任务分配弹出框 -->
    <el-dialog title="任务分配" class="taskVisible" custom-class="taskVisible" :visible.sync="taskVisible" width="50%">
      <el-form :inline="true" ref="form" :model="form" label-width="85px">
        <el-form-item label="业务方向" style="width: 45%">
          <el-input v-model="form.businessDirection"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" style="width: 45%">
          <el-input v-model="form.proname"></el-input>
        </el-form-item>
        <el-form-item label="任务名称" style="width: 45%">
          <el-input v-model="form.taname"></el-input>
        </el-form-item>
        <el-form-item label="任务编号" style="width: 45%">
          <el-input v-model="form.taskNumber"></el-input>
        </el-form-item>
        <el-form-item label="任务地点" style="width: 45%">
          <el-input v-model="form.taskPlace"></el-input>
        </el-form-item>
        <el-form-item label="任务负责人" style="width: 45%">
          <el-input v-model="form.tleader"></el-input>
        </el-form-item>
        <el-form-item label="任务描述" style="width: 45%">
          <el-input v-model="form.tDescribe"></el-input>
        </el-form-item>
        <el-form-item label="时间段" style="width: 50%">
          <el-date-picker
            v-model="form.tTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            >
            </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit()">确 定</el-button>
      </span>
    </el-dialog>
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
              inTask:"已完成",
              inStatus:'长期在项'
            },{
              pname:'项目2',
              tname:'任务2',
              inpTime:'2020-5-20 - 2020-6-20',
              inTask:"进行中",
              inStatus:'借调'
            },{
              pname:'项目3',
              tname:'任务3',
              inpTime:'2020-5-20 - 2020-6-20',
              inTask:"进行中",
              inStatus:'借调'
            },{
              pname:'项目4',
              tname:'任务4',
              inpTime:'2020-5-20 - 2020-6-20',
              inTask:"进行中",
              inStatus:'借调'
            },{
              pname:'项目5',
              tname:'任务5',
              inpTime:'2020-5-20 - 2020-6-20',
              inTask:"进行中",
              inStatus:'借调'
            }
          ]
        }
      ],
      form:{},
      taskVisible:false
    }
  },
  methods:{
    //任务详情
    pDetail(index,row){
      let $table = this.$refs.ProjectTbale;
      $table.toggleRowExpansion(row, true);
    },
    //任务分配
    taskAllocation(index,row){
      this.taskVisible = true
    }
  }
}
</script>

<style>
    .el-table.taskDetail th{
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
    .el-table form{
      display: inline-block;
      width: 24%;
      box-shadow: #c6e0fd 0 0 6px;
      border-radius: 2px;
      padding: 10px;
      padding-right: 0;
      box-sizing: border-box;
      margin-right: 1%;
      margin-bottom: 1%;
    }
    /* .taskDetail th{
      background-color: #66b1ff !important;
      border:0 none;
    }
    .taskDetail thead{
      color: #fff;
    } */
</style>
<style scoped>
.taskDetail{
  box-shadow: #3a8ee6 0 0 7px;
  border:0 none;
}

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
.taskVisible .el-range-editor--small.el-input__inner{
  width:215px;
}
.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
    line-height: 1;
    vertical-align: bottom;
}
.projectFooter{
    padding:0 20px 20px
}

</style>