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
		    <el-table-column prop="cell" label="卡号"></el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="sex" label="性别"></el-table-column>
		    <el-table-column prop="grade" label="等级"></el-table-column>
		    <el-table-column prop="balance" label="余额"></el-table-column>
		    <el-table-column prop="status" label="状态"></el-table-column>
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
		          cell: '15218263842',
		          name: '王小虎',
		          sex: '男',
		          grade: '普通会员',
		          balance: 200,
		          status: '正常'
		        }, {
		          cell: '15218263842',
		          name: '王小虎',
		          sex: '男',
		          grade: '普通会员',
		          balance: 200,
		          status: '正常'
		        }, {
		          cell: '15218263842',
		          name: '王小虎',
		          sex: '男',
		          grade: '普通会员',
		          balance: 200,
		          status: '正常'
		        }, {
		          cell: '15218263842',
		          name: '王小虎',
		          sex: '男',
		          grade: '普通会员',
		          balance: 200,
		          status: '正常'
		        }, {
		          cell: '15218263842',
		          name: '王小虎',
		          sex: '男',
		          grade: '普通会员',
		          balance: 200,
		          status: '正常'
		        }, {
		          cell: '15218263842',
		          name: '王小虎',
		          sex: '男',
		          grade: '普通会员',
		          balance: 200,
		          status: '正常'
		        }, {
		          cell: '15218263842',
		          name: '王小虎',
		          sex: '男',
		          grade: '普通会员',
		          balance: 200,
		          status: '正常'
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