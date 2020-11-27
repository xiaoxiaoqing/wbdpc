<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 外包人员信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <label for="">公司名称</label>
                <el-select v-model="query.company" filterable placeholder="请选择" class="handle-select mr10">
                    <!-- <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option> -->
                    <el-option key="-1" label="请选择" value=""></el-option>
                    <el-option v-for="(item,index) in companyArr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <label for="">职位</label>
                <el-select v-model="query.position" placeholder="请选择" class="handle-select mr10">
                    <el-option key="1" label="前端" value="前端"></el-option>
                    <el-option key="2" label="java" value="java"></el-option>
                    <el-option key="3" label="测试" value="测试"></el-option>
                </el-select>
                <label for="">时间段</label>
                <!-- <el-input v-model="query.time" placeholder="请选择" class="handle-input mr10"></el-input> -->

                <div class="handle-input mr10">
                    <el-date-picker
                    v-model="query.time"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </div>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <p>{{companyName}}</p>
            <el-table
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

        <!-- 编辑弹出框 -->
        <el-dialog title="人员详情" :visible.sync="editVisible" width="50%">
            <el-form :inline="true" ref="form" :model="form" label-width="70px">
                <el-form-item label="姓名" style="width:45%;" >
                    <label>{{form.name}}</label>
                </el-form-item>
                <el-form-item label="性别">
                    <label>{{form.sex==0 ? "男" : "女"}}</label>
                </el-form-item>
                <el-form-item label="住址" style="width:45%;">
                    <label>{{form.address}}</label>
                </el-form-item>
                <el-form-item label="电话">
                    <label>{{form.money}}</label>
                </el-form-item>
                <el-form-item label="所属公司" style="width:45%;">
                    <label>{{form.companyName}}</label>
                </el-form-item>
                <el-form-item label="入所时间">
                    <label>{{form.date}}</label>
                </el-form-item>
                <el-form-item label="职位" style="width:45%;">
                    <label>{{form.position}}</label>
                </el-form-item>
                <el-form-item label="评级时间">
                   <span>{{form.ratingTime}}</span>
                </el-form-item>
                <el-form-item label="状态" style="width:45%;">
                    <el-select v-model="form.state" placeholder="请选择" class="handle-select mr10">
                        <el-option key="1" label="空闲" value="空闲"></el-option>
                        <el-option key="2" label="在项" value="在项"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="级别">
                    <el-select v-model="form.level" placeholder="请选择" class="handle-select mr10">
                        <el-option key="1" label="初级下" value="0"></el-option>
                        <el-option key="2" label="初级中" value="1"></el-option>
                        <el-option key="3" label="初级上" value="2"></el-option>
                        <el-option key="4" label="中级下" value="3"></el-option>
                        <el-option key="5" label="中级中" value="4"></el-option>
                        <el-option key="6" label="中级上" value="5"></el-option>
                        <el-option key="7" label="高级" value="6"></el-option>
                    </el-select>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getUseinfo } from '@/http/index.js';// 导入我们的api接口
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                company: '',
                time:"",
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            companyArr:[
                {
                    name:'盈浩源',
                    id:'01'
                },{
                   name:'赤霄',
                    id:'02' 
                },{
                   name:'汉佳',
                    id:'03' 
                },{
                   name:'炎石',
                    id:'04' 
                }
            ],
            companyName:"",
            data1:{
                "list": [{
                    "id": 1,
                    "name": "张三",
                    "money": 123456789,
                    "sex":0,
                    "position":"前端",
                    "address": "广东省东莞市长安镇",
                    "state": "空闲",
                    "date": "2019-11-1",
                    "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
                },
                {
                    "id": 2,
                    "name": "李四",
                    "sex":0,
                    "money": 456123456,
                    "position":"前端",
                    "address": "广东省广州市白云区",
                    "state": "空闲",
                    "date": "2019-10-11",
                    "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
                },
                {
                    "id": 3,
                    "name": "王五",
                    "sex":1,
                    "money": 123456789,
                    "position":"后台",
                    "address": "湖南省长沙市",
                    "state": "在项",
                    "date": "2019-11-11",
                    "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
                },
                {
                    "id": 4,
                    "name": "赵六",
                    "sex":1,
                    "money": 123456000,
                    "position":"后台",
                    "address": "福建省厦门市鼓浪屿",
                    "state": "在项",
                    "date": "2019-10-20",
                    "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
                }
            ],
            "pageTotal": 4
            }
        };
    },
    created() {
        this.getData();
        this.getdata()
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            this.tableData = this.data1.list;
            this.pageTotal = this.data1.pageTotal || 50;
        },
        // 触发搜索按钮
        handleSearch() {
            console.log(this.query,";;;;;;;")
            this.$set(this.query, 'pageIndex', 1);
            this.companyArr.map(item=>{
                if(item.id==this.query.company){
                    this.companyName = item.name
                }
            })
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
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
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            console.log(this.form,"lllll")
            this.editVisible = false;
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //获取数据
        getdata(){
            getUseinfo().then(data=>{
                console.log(data)
            })
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 220px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
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
.el-range-editor--small.el-input__inner{
    width:220px;
}
</style>
