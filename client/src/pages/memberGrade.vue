<template>
	<div>
		<div class="table-function">
			<el-button type="primary" plain size='small'>新增</el-button>
			<el-button type="primary" plain size='small'>修改</el-button>
			<el-button type="primary" plain size='small'>删除</el-button>
		</div>
		<el-table
		    ref="multipleTable"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"></el-table-column>
		    <el-table-column prop="name" label="等级名称"></el-table-column>
		    <el-table-column prop="discount" label="等级折扣"></el-table-column>
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
		          name: '普通会员',
		          discount: 0.7
		        }, {
		          name: '白银会员',
		          discount: 0.7
		        }, {
		          name: '黄金会员',
		          discount: 0.7
		        }, {
		          name: '钻石会员',
		          discount: 0.7
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