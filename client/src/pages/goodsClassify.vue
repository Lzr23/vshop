<template>
	<div>
		<div class="table-function">
			<el-button type="primary" plain size='small'>新增</el-button>
			<el-button type="primary" plain size='small'>修改</el-button>
			<el-button type="primary" plain size='small'>删除</el-button>
		</div>
		<el-table
		    ref="multipleTable"
		    :data="classifyList"
		    tooltip-effect="dark"
		     v-loading="loading"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"></el-table-column>
		    <el-table-column prop="name" label="分类名称"></el-table-column>
		    <el-table-column prop="parent" label="父级分类">
		    </el-table-column>
		</el-table>
		<div class="myPagination">
			<el-pagination
				background
				layout="prev, pager, next"
				:current-page.sync="page"
      			@current-change="handleCurrentChange"
				:total="total">
			</el-pagination>
		</div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				page: 1, /////当前第几页
				pageSize: 7, ///////一页7条数据
				total: 0, /////分类总数
				loading: false, // 是否正在加载
				
				classifyList: [   ////分类列表
//				{   
//		          name: '休闲裤',
//		          parent: '下装'
//		        }, {
//		          name: '休闲裤',
//		          parent: '下装'
//		        }, {
//		          name: '休闲裤',
//		          parent: '下装'
//		        }, {
//		          name: '休闲裤',
//		          parent: '下装'
//		        }
		        ],
		        multipleSelection: []
			}
		},
		methods:{
			handleSelectionChange(val) {
		      this.multipleSelection = val;
		   },
		   handleCurrentChange(val) {  ////改变当前页数
		   	this.page = val
		   	this.getClassify()
		   },
		   getClassify() {
		   	var params = {
		   		page: this.page,
        		pageSize: this.pageSize
		   	}
		   	this.loading = true
		   	this.$http.get('/classifys/list', {params})
		   	.then(res => {
		   		res = res.data
		   		this.loading = false
		   		if (res.status == '1') {
		   			this.classifyList = res.result.list
		   		}
		   	})
		   },
		   getAll() {
		   	this.$http.get('/classifys/all')
		   	.then(res => {
		   		res = res.data
		   		if (res.status == '1') {
		   			this.total = res.count
		   		}
		   	})
		   }
		},
		mounted() {
			this.getClassify()
			this.getAll()
		}
	}
</script>

<style></style>