<template>
  <div style="padding-top:20px;">
    <el-row>
      <el-col :span="14" class="mr-20">
        <div class="order">
          <el-card class="order-card">
            <div slot="header" class="clearfix top">
              <span>东部大队</span>
            </div>
            <div class="bottom">
              <el-row type="flex" justfiy="content">
                <el-col>业务方向<div class="mt-10">地图</div></el-col>
                <el-col>负责人<div class="mt-10">东吉英</div></el-col>
                <el-col>项目时间<div class="mt-10">2010-10至2021-06</div></el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <div class="task">
          <el-card>
            <div slot="header" class="clearfix top">
              <span>任务列表</span>
            </div>
            <div class="task-content bottom">
              <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="taskName"
                  label="任务名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="taskNumber"
                  label="任务编号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="workPlace"
                  label="任务地点">
                </el-table-column>
                <el-table-column
                  prop="workLeader"
                  label="任务负责人">
                </el-table-column>
                <el-table-column
                  prop="taskDescrip"
                  label="任务描述">
                </el-table-column>
                <el-table-column
                  prop="rangeTime"
                  label="时间段"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="taskState"
                  label="任务状态">
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="9">
        <el-card :style="{'height': rightHeight+'px'}">
          <div style="text-align: center">
            <el-transfer
              style="text-align: left; display: inline-block"
              v-model="value4"
              filterable
              :left-default-checked="[2, 3]"
              :right-default-checked="[1]"
              :titles="['推荐', '已派']"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }"
              @change="handleChange"
              :data="data">
              <span slot-scope="{ option }"> {{ option.key }}-{{ option.label }}</span>
              <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
              <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
            </el-transfer>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `李晓辉,3D`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        rightHeight: '',
        data: generateData(),
        value: [1],
        value4: [1],
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        },
        tableData: [{
            id:'11',
            taskName:"任务1",
            taskNumber:"rrr1",
            workPlace:"所内3楼",
            workLeader:"领导1",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述1",
            taskState:"进行中",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        },{
            id:'12',
            taskName:"任务2",
            taskNumber:"rrr2",
            workPlace:"所内3楼",
            workLeader:"领导2",
            worker:"人员1，人员2",
            rangeTime:"2020-10-01-2020-11-01",
            taskDescrip:"描述2",
            taskState:"暂停",
        }]
      }
    },
    methods: {
      methods: {
        handleChange(value, direction, movedKeys) {
          console.log(value, direction, movedKeys);
          console.log('test')
        }
      },
      getHeight() {
        this.rightHeight = window.innerHeight - 154

      }
    },
    created() { 
      this.getHeight()
    }
  }
</script>
<style lang="less" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
  .mr-20 {
    margin-right: 20px
  }
  .order-card {
    color: #fff;
    width: 100%;
    height: 100px;
    background: linear-gradient(90deg,#60b2fb,#6485f6);
    /deep/ .el-card__header {
      padding: 0;
    }
  }
  .top {
    padding: 10px 40px;
    span {
      font-size: 20px;
    }
  }
  .bottom {
    padding: 0 20px;
    .mt-10 {
      margin-top: 10px;
    }
  }
  .task {
    margin-top: 20px;
  }
  .right-height {

  }
</style>