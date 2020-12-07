<template>
  <div class="userBaseInfo">
    <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 外包人员信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
    <div class="container">
      <div class="handle-box">
        <label for="">公司名称</label>
        <el-select
          v-model="query.company"
          filterable
          placeholder="请选择"
          class="mr10"
        >
          <el-option key="-1" label="请选择" value=""></el-option>
          <el-option
            v-for="(item, index) in companyArr"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <label for="">职位</label>
        <el-select v-model="query.position" placeholder="请选择" class="mr10">
          <el-option
            key="1"
            label="Java前端设计师"
            value="Java前端设计师"
          ></el-option>
          <el-option
            key="2"
            label="java后台工程师"
            value="java后台工程师"
          ></el-option>
          <el-option
            key="3"
            label="C#开发工程师"
            value="C#开发工程师"
          ></el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addCompany"
          >新增</el-button
        >
      </div>
      <el-table
        :data="tableData"
        ref="userTbale"
        class="table"
        max-height="500"
        :show-header="false"
        header-cell-class-name="table-header"
      >
        <el-table-column type="expand" prop="children">
          <template slot-scope="scope">
            <el-table :data="scope.row.children" size="mini" border class="usertable">
              <el-table-column
                label="序号"
                type="index"
                width="50"
                fixed
                align="center"
              >
                           
              </el-table-column>
              <el-table-column
                prop="userName"
                label="人员姓名"
                width="100"
                fixed
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">{{ scope.row.userName }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.userName"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="school"
                label="学校"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">{{ scope.row.school }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.userName"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">{{ scope.row.education }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.userName"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="learning"
                label="学习经历"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">{{ scope.row.learning }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.userName"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                align="center"
                width="80"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">
                    {{ scope.row.sex == "0" ? "男" : "女" }}
                  </div>
                  <div v-else>
                    <el-select
                      size="mini"
                      v-model="scope.row.sex"
                      placeholder="请选择"
                    >
                      <el-option key="1" label="男" value="0"></el-option>
                      <el-option key="2" label="女" value="1"></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="createtime"
                label="入所时间"
                align="center"
                width="150"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.newEdit">
                    {{ scope.row.createtime }}
                  </div>
                  <div v-else>
                    <el-date-picker
                      v-model="scope.row.createtime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="telnum" label="电话" align="center">
                <template slot-scope="scope">
                  <div v-if="!scope.row.isEdit">{{ scope.row.telnum }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.telnum"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                align="center"
                width="200"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.isEdit">{{ scope.row.address }}</div>
                  <div v-else>
                    <el-input v-model="scope.row.address"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="skillid" label="技能" align="center" width="130">
                <template slot-scope="scope">
                  <div v-if="!scope.row.isEdit">{{ scope.row.skillid }}</div>
                  <div v-else>
                    <el-select
                      size="mini"
                      v-model="scope.row.skillid"
                      placeholder="请选择"
                    >
                      <el-option
                        key="1"
                        label="Java前端设计师"
                        value="Java前端设计师"
                      ></el-option>
                      <el-option
                        key="2"
                        label="java后台工程师"
                        value="java后台工程师"
                      ></el-option>
                      <el-option
                        key="3"
                        label="C#开发工程师"
                        value="C#开发工程师"
                      ></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                align="center"
                width="100"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.isEdit">
                    {{ scope.row.status == "0" ? "在职" : "离职" }}
                  </div>
                  <div v-else>
                    <el-select
                      size="mini"
                      v-model="scope.row.status"
                      placeholder="请选择"
                    >
                      <el-option key="1" label="在职" value="0"></el-option>
                      <el-option key="2" label="离职" value="1"></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" align="center" width="150"> 
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    :icon="
                      scope.row.isEdit
                        ? 'el-icon-check'
                        : 'el-icon-edit-outline'
                    "
                    @click="userEdit(scope.$index, scope.row)"
                    >{{ scope.row.isEdit ? "完成" : "编辑" }}</el-button
                  >
                  <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="userDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="" align="left">
          <template slot-scope="scope">
            <div>{{ scope.row.companyName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="" width="180" align="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-plus"
              class="green"
              @click="userAdd(scope.$index, scope.row)"
              >添加</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="green"
              @click="companyDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-table
                :data="tableData"
                stripe
                class="table"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center">
                    <template slot-scope="scope">{{scope.row.sex==0?'男':'女'}}</template>
                </el-table-column>
                <el-table-column label="电话" align="center">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column prop="date" label="入所时间" align="center"></el-table-column>
                <el-table-column prop="position" label="职位" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='空闲'?'success':(scope.row.state==='在项'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="level" label="级别" align="center"></el-table-column>
                <el-table-column prop="ratingTime" label="评级时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit-outline"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table> -->
     
    </div>

    <!-- 新增弹出框 -->
    <el-dialog title="新增公司" :visible.sync="addVisible" width="50%">
      <el-form :inline="true" ref="form" :model="form" label-width="70px">
        <el-form-item label="公司名称" style="width: 45%">
          <el-input v-model="form.companys"></el-input>
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
import { getUseinfo } from "@/http/index.js"; // 导入我们的api接口
export default {
  name: "basetable",
  data() {
    return {
      query: {
        company: "",
        time: "",
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [
        {
          companyName: "炎石",
          companyid: "11",
          children: [
            {
              wxuserid: "1",
              userName: "李世赢",
              sex: "0",
              telnum: "12345678",
              address: "石家庄正定",
              companyid: "11",
              skillid: "Java前端设计师",
              createtime: "2020-10-01",
              status: "0",
            },
            {
              wxuserid: "2",
              userName: "许浩峰",
              sex: "0",
              telnum: "12345678",
              address: "石家庄保定",
              companyid: "11",
              skillid: "Java前端设计师",
              createtime: "2020-05-01",
              status: "0",
            },
          ],
        },
        {
          companyName: "崇达",
          companyid: "22",
          children: [
            {
              wxuserid: "3",
              userName: "崔媛媛",
              sex: "1",
              telnum: "12345678",
              address: "石家庄正定",
              companyid: "22",
              skillid: "C#开发工程师",
              createtime: "2020-04-01",
              status: "0",
            },
            {
              wxuserid: "4",
              userName: "王鸣",
              sex: "0",
              telnum: "12345678",
              address: "石家庄赵县",
              companyid: "22",
              skillid: "C#开发工程师",
              createtime: "2020-02-01",
              status: "0",
            },
          ],
        },
        {
          companyName: "汉佳",
          companyid: "33",
          children: [
            {
              wxuserid: "5",
              userName: "李萌",
              sex: "1",
              telnum: "12345678",
              address: "石家庄正定",
              companyid: "33",
              skillid: "C#开发工程师",
              createtime: "2010-04-01",
              status: "0",
            },
          ],
        },
      ],
      multipleSelection: [],
      delList: [],
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      companyArr: [
        {
          name: "盈浩源",
          id: "01",
        },
        {
          name: "赤霄",
          id: "02",
        },
        {
          name: "汉佳",
          id: "03",
        },
        {
          name: "炎石",
          id: "04",
        },
      ],
      companyName: "",
    };
  },
  created() {
    this.getData();
    this.getdata();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      // this.tableData = this.data1.list;
      this.pageTotal = this.data1.pageTotal || 50;
    },
    //新增公司
    addCompany(){
      this.form = {}
      this.addVisible = true; 
    },
    // 保存编辑
    saveEdit() {
      let obj = {
        companyName: this.form.companys,
        companyid: "00",
        children:[]
      }
      if(this.form.companys){
        this.tableData.unshift(obj)
        this.addVisible = false;
      }else{
        this.$message.warning("请填写公司名称");
      }
    },
    // 触发搜索按钮
    handleSearch() {
      console.log(this.query, ";;;;;;;");
      this.$set(this.query, "pageIndex", 1);
      this.companyArr.map((item) => {
        if (item.id == this.query.company) {
          this.companyName = item.name;
        }
      });
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    //获取数据
    getdata() {
      getUseinfo().then((data) => {
        console.log(data);
      });
    },
    //添加人员
    userAdd(index, row) {
      console.log(index, row);
      let $table = this.$refs.userTbale;
      let can = true;
      let newUser = {
        wxuserid: "00",
        userName: "",
        sex: "0",
        telnum: "",
        address: "",
        companyid: row.companyid,
        skillid: "",
        createtime: "",
        status: "0",
        isEdit: true,
        newEdit: true,
      };
      if (row.children) {
        row.children.map((item) => {
          if (item.wxuserid == "00") {
            can = false;
          }
        });
        if (can) {
          row.children.unshift(newUser);
        } else {
          this.$message.warning("请先保存已添加人员!");
        }
      } else {
        this.tableData[index].children = [];
        this.tableData[index].children.unshift(newUser);
      }
      $table.toggleRowExpansion(row, true);
    },
    //公司删除
    companyDelete(index,row){
      this.$confirm("删除公司，其公司人员也将删除，确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message.success("删除成功");
        })
        .catch(() => {});
    },
    //人员编辑
    userEdit(index, row) {
      if (row.isEdit) {
        this.$delete(row, "isEdit");
        this.$delete(row, "newEdit");
      } else {
        this.$set(row, "isEdit", true);
      }
    },
    //人员删除
    userDelete(index, row) {
      let idx = 0;
      this.tableData.map((inx, item) => {
        if (item.companyid == row.companyid) {
          idx = inx;
        }
      });
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.tableData[idx].children.splice(index, 1);
          this.$message.success("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
.userBaseInfo .handle-box {
  margin-bottom: 20px;
}

.userBaseInfo .handle-select {
  width: 120px;
}
.el-table.usertable th{
  background:#ecf5ff !important;
}
.userBaseInfo .handle-input {
  width: 220px;
  display: inline-block;
}
.userBaseInfo .table {
  width: 100%;
  font-size: 14px;
}
.userBaseInfo .red {
  color: #ff0000;
}
.userBaseInfo .mr10 {
  margin-right: 15px;
}
.userBaseInfo .table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.userBaseInfo .el-range-editor--small.el-input__inner {
  width: 220px;
}
.userBaseInfo .el-table__expanded-cell {
  padding: 0;
  border: 0 none;
}
.userBaseInfo .el-table td div {
  border-top: none;
}
.userBaseInfo .el-date-editor.el-input,
.userBaseInfo .el-date-editor.el-input__inner {
  width: 130px;
}
</style>
