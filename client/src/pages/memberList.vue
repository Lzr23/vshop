<template>
	<div>
		<div class="table-function">
			<el-button type="primary" plain size='small'>新增</el-button>
			<el-button type="primary" plain size='small'>充值</el-button>
			<el-button type="primary" plain size='small'>修改密码</el-button>
			<el-button type="primary" plain size='small'>挂失</el-button>
			<el-button type="primary" plain size='small'>修改</el-button>
			<el-button type="primary" plain size='small'>删除</el-button>
		</div>
		<div class="table-search">
			<el-input placeholder="输入会员卡号/姓名" prefix-icon="el-icon-search" v-model="findContent"></el-input>
			<el-button type="primary" plain size='small'>查询</el-button>
		</div>
		<el-table
		    ref="multipleTable"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"></el-table-column>
		    <el-table-column label="日期">
		      <template slot-scope="scope">{{ scope.row.date }}</template>
		    </el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="address" label="地址" show-overflow-tooltip>
		    </el-table-column>
		</el-table>
		<div class="myPagination">
			<el-pagination background layout="prev, pager, next" :total="100">
			</el-pagination>
		</div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				findContent: '',  ////搜索内容
				tableData: [{   ////表格数据
		          date: '2016-05-03',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-04',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-01',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-08',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-06',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-07',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }],
		        multipleSelection: []
			}
		},
		methods:{
			handleSelectionChange(val) {
	        this.multipleSelection = val;
	      }
		}
	}
</script>

<style></style>