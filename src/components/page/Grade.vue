<template>
    <div class="userBaseInfo">
        <div class="container">
            <div class="handle-box">
              <div>
                <span>姓名</span>
                <el-input 
                  placeholder="请输入姓名"
                  v-model="input">
                </el-input>
              </div>
              <div>
                <span>业务方向</span>
                <el-input 
                  placeholder="请输入业务方向"
                  v-model="input">
                </el-input>
              </div>
            </div>
            <el-table
              border
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="levelid"
                label="评价等级"
                width="180">
              </el-table-column>
              <el-table-column
                prop="number"
                width="180"
                label="完成任务数量">
              </el-table-column>
              <el-table-column
                prop="can"
                width="180"
                label="业务方向">
              </el-table-column>
              <el-table-column
                prop="aditor"
                width="180"
                label="评价人">
              </el-table-column>
              <el-table-column
                prop="view"
                label="评价意见">
              </el-table-column>
              <el-table-column
                prop="createtime"
                label="评价时间"
                width="240">
              </el-table-column>
              <el-table-column label="操作" fixed="right" align="center" width="240">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        :icon="'el-icon-edit'"
                        @click="tableEdit(scope.$index, scope.row)"
                      >编辑
                    </el-button>
                </template>
            </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!--  -->
        <el-dialog :visible.sync="formDialog">
          <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <span>{{form.name}}</span>
            </el-form-item>
            <el-form-item label="评价等级" :label-width="formLabelWidth">
              <el-input v-model="form.levelid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="完成任务数量" :label-width="formLabelWidth">
              <el-input v-model="form.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="业务方向" :label-width="formLabelWidth">
              <el-input v-model="form.can" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="评价人" :label-width="formLabelWidth">
              <span>{{form.aditor}}</span>
            </el-form-item>
            <el-form-item label="评价意见" :label-width="formLabelWidth">
              <el-input v-model="form.view" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="formDialog = false">取 消</el-button>
            <el-button type="primary" @click="formDialog = false">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
.handle-box {
  >div {
    display: inline-block;
    margin-right: 20px;
    .el-input {
      width: 200px
    }
  }
}
</style>
<script>
export default {
    data() {
      return {
        input: '',
        formDialog:false,
        pageTotal: 3,
        query: {
            company: '',
            time:"",
            pageIndex: 1,
            pageSize: 10
        },
        form: {
          name: '王小虎',
          aditor: '陈路路',
          number: '5',
          can: '动效、地图',
          levelid: '高级',
          view: '',
        },
        formLabelWidth: '120px',
        tableData: [{
            name: '王小虎',
            aditor: '陈路路',
            number: '5',
            can: '动效、地图',
            levelid: '高级',
            view: '工作很细心',
            createtime: '2020-11-29'
          },
          {
            name: '张笋伞',
            aditor: '东吉英',
            number: '2',
            can: '动效',
            levelid: '初级（中）',
            view: '工作很细心',
            createtime: '2020-11-29'
          },
          {
            name: '李狗蛋',
            aditor: '赵泽天',
            number: '4',
            can: 'GUI、C4D',
            levelid: '中级（上）',
            view: '工作很细心',
            createtime: '2020-11-29'
          }]
      }
    },
    created() {
    },
    methods: {
      tableEdit() {
        this.formDialog = true
      },
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
      },
    }
}
</script>