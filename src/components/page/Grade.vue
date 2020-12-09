<template>
    <div class="userBaseInfo">
        <div class="container">
            <div class="handle-box">
              <div>
                <span>姓名</span>
                <el-select
                  v-model="searchObj.name"
                  filterable
                  remote
                  clearable
                  placeholder="请输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <span>业务方向</span>
                <el-select v-model="searchObj.direction" filterable placeholder="请选择业务方向">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <el-button icon="el-icon-search" type="primary">搜索</el-button>
              <el-button icon="el-icon-plus" type="primary" @click="addBtn" style="float:right;">新建</el-button>
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
                    <el-button
                        class="color-red"
                        type="text"
                        :icon="'el-icon-delete'"
                        @click="tableDelete(scope.$index, scope.row)"
                      >删除
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
            <el-button @click="formClose">取 消</el-button>
            <el-button type="primary" @click="formSure">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
.userBaseInfo {
  .handle-box {
    margin-bottom: 20px;
    >div {
      display: inline-block;
      margin-right: 20px;
      .el-input {
        width: 200px
      }
    }
  }
}
.color-red {
  color: red;
}
</style>
<script>
export default {
    data() {
      return {
        input: '',
        formDialog:false,
        pageTotal: 3,
        nameValue: '',
        options: [],
        value: [],
        list: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"],
        options2: [{
          value: '选项1',
          label: '方向1'
        }, {
          value: '选项2',
          label: '方向2'
        }, {
          value: '选项3',
          label: '方向3'
        }, {
          value: '选项4',
          label: '方向4'
        }, {
          value: '选项5',
          label: '方向5'
        }],
        searchObj: {
          name: '',
          direction: ''
        },
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
    mounted() {
      this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
    },
    methods: {
      getList() {
        // ajax({data:''}).then(res => {})
      },
      formSure() {
        this.formDialog = false
      },
      formClose() {
        this.formDialog = false
      },
      addBtn () {
        this.form = {}
        this.formDialog = true
      },
      tableEdit() {
        this.formDialog = true
      },
      tableDelete() {
        console.log('删除')
      },
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    }
}
</script>