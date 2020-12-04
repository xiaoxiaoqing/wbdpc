<template>
    <div class="container maintain">
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
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建</el-button>
        </div>
            <el-table
                :data="tableData"
                ref="ProjectTbale"
                class="table"
                max-height="500"
                header-cell-class-name="table-header">   
                <el-table-column type="expand" prop="children" >
                    <template slot-scope="scope">
                        <el-table :data="scope.row.children"  size="mini" class="insideTable addProject">
                            <el-table-column type="index" width="30" fixed>
                            </el-table-column>
                            <el-table-column prop="taskName" label="任务名称" fixed align="center">
                                <template slot-scope="scope">
                                    <div v-if="!scope.row.isEdit">{{ scope.row.taskName }}</div>
                                    <div v-else>
                                        <el-input v-model="scope.row.taskName"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskNumber" label="任务编号" align="center">
                                 <template slot-scope="scope">
                                    <div v-if="!scope.row.isEdit">{{ scope.row.taskNumber }}</div>
                                    <div v-else>
                                        <el-input v-model="scope.row.taskNumber"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="workPlace" label="任务地点" align="center">
                                <template slot-scope="scope">
                                    <div v-if="!scope.row.isEdit">{{ scope.row.workPlace }}</div>
                                    <div v-else>
                                        <el-input v-model="scope.row.workPlace"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="workLeader" label="任务负责人" align="center">
                                <template slot-scope="scope">
                                    <div v-if="!scope.row.isEdit">{{ scope.row.workLeader }}</div>
                                    <div v-else>
                                        <el-input v-model="scope.row.workLeader"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="worker" label="人员" align="center">
                                <template slot-scope="scope">
                                    <div v-if="!scope.row.isEdit">{{ scope.row.worker }}</div>
                                    <div v-else>
                                        <el-cascader 
                                            size="mini" 
                                            v-model="scope.row.worker" 
                                            :options="personnelList" 
                                            :show-all-levels="false" 
                                            :props="{ multiple: true }"
                                            placeholder="请选择">
                                        </el-cascader>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="rangeTime" label="时间段" width="190" align="center">
                                <template slot-scope="scope">
                                    <div v-if="!scope.row.isEdit">{{ scope.row.rangeTime }}</div>
                                    <div v-else>
                                        <el-date-picker
                                            v-model="scope.row.rangeTime"
                                            type="daterange"
                                            width="180"
                                            value-format="yyyy-MM-dd"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            >
                                        </el-date-picker>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskDescrip" label="任务描述" width="160" align="center">
                                <template slot-scope="scope">
                                    <div v-if="!scope.row.isEdit">{{ scope.row.taskDescrip }}</div>
                                    <div v-else>
                                        <el-input type="textarea" size="mini" v-model="scope.row.taskDescrip" placeholder="请输入"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskState" label="任务状态" align="center">
                                <template slot-scope="scope">
                                    <div v-if="!scope.row.isEdit">
                                        <el-tag
                                            :type="scope.row.taskState==='进行中'?'success':'danger'"
                                        >{{scope.row.taskState}}</el-tag>
                                    </div>
                                    <div v-else>
                                        <el-select size="mini" v-model="scope.row.taskState" placeholder="请选择">
                                            <el-option key="0" label="请选择" value="0"></el-option>
                                            <el-option key="1" label="未开始" value="1"></el-option>
                                            <el-option key="2" label="进行中" value="2"></el-option>
                                            <el-option key="3" label="暂停" value="3"></el-option>
                                        </el-select>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" align="center" width="80" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="taskEdit(scope.row)" :icon="scope.row.isEdit ? 'el-icon-check' : 'el-icon-edit'" :title="scope.row.isEdit ? '完成' : '编辑'"></el-button>
                                    <el-button type="text" @click="taskDelete(scope.$index, scope.row)" title="删除" icon="el-icon-delete"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>

                <el-table-column prop="projectName" label="项目名称" align="center">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isTrue">{{ scope.row.projectName }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.projectName"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="projectNumber" label="项目编号" align="center">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isTrue">{{ scope.row.projectNumber }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.projectNumber"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="direction" label="业务方向" align="center">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isTrue">{{ scope.row.direction }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.direction"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="projectLeader" label="项目负责人" align="center">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isTrue">{{ scope.row.projectLeader }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.projectLeader"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="orderNum" label="采购评审单号" align="center">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isTrue">{{ scope.row.orderNum }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.orderNum"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="procurementFunds" label="采购评审可用经费" align="center">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isTrue">{{ scope.row.procurementFunds }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.procurementFunds"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="workload" label="工作量预计" align="center">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isTrue">{{ scope.row.workload }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.workload"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            :icon="scope.row.isTrue ? 'el-icon-check' : 'el-icon-edit-outline'"
                            @click="handleEdit(scope.$index, scope.row)"
                        >{{scope.row.isTrue ? '完成' : '编辑'}}</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-plus"
                            class="green"
                            @click="taskAdd(scope.$index, scope.row)"
                        >添加</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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
        <!-- 新增弹出框 -->
        <el-dialog title="项目新增" class="addProject" custom-class="addProject addlay" :visible.sync="newlyBuild" width="60%" top="10vh" :close-on-click-modal="false">
            <el-form :inline="true" ref="form" :model="form" label-width="125px">
                <el-form-item label="项目名称" style="width:45%;" >
                    <el-input v-model="form.projectName" placeholder="请输入" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item label="项目编号">
                    <el-input v-model="form.projectNumber" placeholder="请输入" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item label="业务方向" style="width:45%;">
                    <el-input v-model="form.direction" placeholder="请输入" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人" >
                    <el-input v-model="form.projectLeader" placeholder="请输入" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item label="采购评审单号" style="width:45%;">
                    <el-input v-model="form.orderNum" placeholder="请输入" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item label="采购评审可用经费" >
                    <el-input v-model="form.procurementFunds" placeholder="请输入" class="handle-input mr10"></el-input>
                </el-form-item>
                 <el-form-item label="工作量预计" style="width:45%;">
                    <el-input v-model="form.workload" placeholder="请输入" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item class="tableBox" style="width:100%;">
                    <label for="">任务列表</label>
                    <div class="taskList">
                        <el-button class="addBtn" type="text" icon="el-icon-plus" size="mini" @click="addDemo"></el-button>
                        <el-table max-height="250" :data="testData" size="mini" border style="width: 100%" ref="demoTable">
                            <el-table-column type="index" width="30" fixed>
                            </el-table-column>
                            <el-table-column prop="taskName" label="任务名称" width="120" fixed>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.taskName" placeholder="请输入"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskNumber" label="任务编号" width="120">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.taskNumber" placeholder="请输入"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="workPlace" label="工作地点"  width="120">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.workPlace" placeholder="请输入"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="workLeader" label="现场负责人" width="95">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-model="scope.row.workLeader" placeholder="请输入"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="worker" label="任务人员" width="120">
                                <template slot-scope="scope">
                                    <el-cascader 
                                        size="mini" 
                                        v-model="scope.row.worker" 
                                        :options="personnelList" 
                                        :show-all-levels="false" 
                                        :props="{ multiple: true }"
                                        placeholder="请选择">
                                    </el-cascader>
                                </template>
                            </el-table-column>
                            <el-table-column class="taskTime" prop="rangeTime" label="时间段" width="185">
                                <template slot-scope="scope">
                                    <el-date-picker
                                        v-model="scope.row.rangeTime"
                                        type="daterange"
                                        width="180"
                                        value-format="yyyy-MM-dd"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        >
                                    </el-date-picker>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskDescrip" label="任务描述" width="200">
                                <template slot-scope="scope">
                                    <el-input type="textarea" size="mini" v-model="scope.row.taskDescrip" placeholder="请输入"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskState" label="任务状态">
                                <template slot-scope="scope">
                                    <el-select size="mini" v-model="scope.row.taskState" placeholder="请选择">
                                        <el-option key="0" label="请选择" value="0"></el-option>
                                        <el-option key="1" label="未开始" value="1"></el-option>
                                        <el-option key="2" label="进行中" value="2"></el-option>
                                        <el-option key="3" label="暂停" value="3"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="" width="40" fixed="right">
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        icon="el-icon-delete"
                                        @click="newDelete(scope.$index, scope.row)"
                                    ></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer projectFooter">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query:{
                entrydirection:"",
                entryName:"",
                timeSlot:"",
                name:"",
                pageIndex: 1,
                pageSize: 10
            },
            newlyBuild:false,
            form: {},
            tableData: [
                {
                    id:'1',
                    projectName:"项目1" ,
                    projectNumber:'xxxx1',
                    direction:'可视化',
                    projectLeader:'负责人1',
                    orderNum:"001",
                    procurementFunds:"100000",
                    workload:'60',
                    children:[
                        {
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
                        }
                    ]
                },{
                    id:"2",
                    projectName:"项目2" ,
                    projectNumber:'xxxx2',
                    direction:'可视化',
                    projectLeader:'负责人2',
                    orderNum:"002",
                    procurementFunds:"200000",
                    workload:'120',
                },{
                    id:"3",
                    projectName:"项目3" ,
                    projectNumber:'xxxx3',
                    direction:'可视化',
                    projectLeader:'负责人3',
                    orderNum:"003",
                    procurementFunds:"300000",
                    workload:'130',
                    
                }
            ],//项目列表
            pageTotal: 0,
            testData: [],//任务列表
            currentRow: null,
            personnelList:[{
                value: 'hanjia',
                label:'汉佳',
                children:[
                    {
                        value:'1',
                        label:'李萌'
                    }
                ],
            },{
                value:'yinghaoyuan',
                label:'盈浩源',
                children:[
                    {
                        value:'01',
                        label:'张伟'
                    }
                ],
            },{
                value:'chixiao',
                label:'赤霄',
                children:[{
                    value:'02',
                    label:'王皓轩'
                },{
                    value:'03',
                    label:'王旭峰'
                }]
            }]//人员列表
        }
    },
    created(){
        this.pageTotal = this.tableData.length
    },
    methods:{
        // 触发搜索按钮
        handleSearch() {
            console.log(this.query,";;;;;;;")
            this.$set(this.query, 'pageIndex', 1);
        },
        getData() {
            this.tableData = this.data1.list;
            this.pageTotal = this.data1.pageTotal || 50;
        },
        handlePageChange(e){
            this.query.pageIndex = e
            //this.$set(this.query, 'pageIndex', e);
        },
        //项目删除
        handleDelete(index, r) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                this.$message.success('删除成功');
                this.tableData.splice(index, 1);
            })
            .catch(() => {});
        },
        //项目编辑
        handleEdit(index,row){
            // 动态设置数据并通过这个数据判断显示方式
            if (row.isTrue) {
                this.$delete(row, 'isTrue')
            } else {
                this.$set(row, 'isTrue', true);
            }
        },
        //添加任务列表
        taskAdd(index,row){
            let $table = this.$refs.ProjectTbale
            let newTask = {
                taskName:"",
                taskNumber:"",
                workPlace:"",
                workLeader:"",
                worker:"",
                rangeTime:"",
                taskDescrip:"",
                taskState:"1",
                id:"00",
                rowIdx :index,
                isEdit:true
            }
            let can = true
            if(row.children){
                row.children.map(item=>{
                    if(item.id == '00'){
                        can = false
                    }
                })
                if(can){
                    row.children.push(newTask)
                }else{
                    this.$message.warning('请先保存已添加任务!'); 
                }
            }else{
                this.tableData[index].children = []
                this.tableData[index].children.push(newTask)
            }
            $table.toggleRowExpansion(row,true)
        },
        //编辑任务列表
        taskEdit(row){
            // 动态设置数据并通过这个数据判断显示方式
            if (row.isEdit) {
            this.$delete(row, 'isEdit')
            } else {
            this.$set(row, 'isEdit', true);
            }
        },
        //删除任务列表
        taskDelete(index,row){
            let idx = 0;
            if(row.id=="00"){
                idx = row.rowIdx
            }else{
                this.tableData.map((item,index)=>{
                    console.log(item)
                    if(item.children && item.children.length>0){
                        item.children.map(val=>{
                            if(val.id==row.id){
                                idx = index
                            }
                        })
                    }
                })
            }
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                this.tableData[idx].children.splice(index, 1);
                this.$message.success('删除成功');
            })
            .catch(() => {});
        },
        //新建项目
        handleAdd(){
            this.newlyBuild = true
            let rwList = {
                taskName:"",
                taskNumber:"",
                workPlace:"",
                workLeader:"",
                worker:"",
                rangeTime:"",
                taskDescrip:"",
                taskState:"",
            }
            this.testData = []
            this.testData.push(rwList);
        },
        addDemo(){
            var d = {
                date: '',
                sex: 1,
                name: '',
                age: 1,
                isSB: true,
                address: ''
            };
            this.testData.push(d);
        },
        
        //新增任务删除
        newDelete(index,r){
            this.testData.splice(index, 1)
        }
    }
}
</script>
<style>
    .el-table.insideTable th{
        background:#ecf5ff !important;
    }
    .maintain .el-table__expanded-cell{
        background:#ebeef5;
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
    width:220px;
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
    width:220px;
}
.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
    line-height: 1;
    vertical-align: bottom;
}
.projectFooter{
    padding:0 20px 20px
}

</style>