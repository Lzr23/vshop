<template>
	<div>
		<div class="table-function">
			<el-button type="primary" plain size='small' @click='showAdd'>新增</el-button>
			<el-button type="primary" plain size='small' @click='showEdit'>修改</el-button>
			<el-button type="primary" plain size='small' @click='showDelete'>删除</el-button>
		</div>
		<el-table
		    ref="multipleTable"
		    :data="classifyList"
		    tooltip-effect="dark"
		     v-loading="loading"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"></el-table-column>
		    <el-table-column prop="classifyName" label="分类名称"></el-table-column>
		    <el-table-column prop="classifyP" label="父级分类">
		    </el-table-column>
		</el-table>
		<div class="myPagination">
			<el-pagination
				background
				layout="prev, pager, next"
				page-size='7'
				:current-page.sync="page"
      			@current-change="handleCurrentChange"
				:total="total">
			</el-pagination>
		</div>
		
		<el-dialog title="分类新增" :visible.sync="classifyAddVisible">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
				<el-form-item label="分类名称" prop="classifyName">
					<el-input v-model="ruleForm.classifyName"></el-input>
				</el-form-item>
				<el-form-item label="父级分类" prop="classifyP">
					<el-select v-model="ruleForm.classifyP" style='width: 100%;' :disabled="classifySelected[0] && classifySelected[0].classifyP == '顶级菜单'">
						<el-option label="顶级菜单" value="顶级菜单"></el-option>
						<el-option v-for="(P, index) in classifyP" :key="index" :label="P.classifyName" :value="P.classifyName"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="classifyAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
			</div>
		</el-dialog>
		
		<el-dialog title="删除分类" :visible.sync="deleteVisible">
			<span>即将删除选中分类及其所有子分类，确认？</span>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="deleteVisible = false">取 消</el-button>
		    <el-button type="primary" @click="deleteConfirm">确 定</el-button>
		  </div>
		</el-dialog>
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
				
				ruleForm: {
					classifyName: '',
					classifyP: ''
				},
				rules: {
					classifyName: {
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					},
					classifyP: {
						required: true,
						message: '请选择父级分类',
						trigger: 'blur'
					}
				},
				classifyList: [],   ////分类列表
		        classifyP: [],   /////父级分类列表
		        classifySelected: [],  ////选中分类
		        isEdit: false, ///是否为编辑状态
		        
		        classifyAddVisible: false,  ///新增弹框可见否
		        deleteVisible: false  ///删除弹框可见否
			}
		},
		methods:{
			handleSelectionChange(val) {
		      this.classifySelected = val;
		   },
		   handleCurrentChange(val) {  ////改变当前页数
		   	this.page = val
		   	this.getClassify()
		   },
		   submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.isEdit) {
							let params = {
								newClassify: this.ruleForm,
								old: this.classifySelected[0]
							}
							this.$http.post('/classifys/edit', params)
								.then(res => {
									res = res.data
									this.$message(res.msg)
									this.classifyAddVisible = false
									this.getClassify()
									this.getAll()
								})
						} else {
							this.$http.post('/classifys/add', this.ruleForm)
								.then(res => {
									res = res.data
									this.$message(res.msg)
									this.classifyAddVisible = false
									this.getClassify()
									this.getAll()
								})
						}
					} else {
						return false;
					}
				});
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
		   			this.total = res.result.count
		   		}
		   	})
		   },
		   getParent() {
		   	this.$http.get('/classifys/parent')
		   	.then(res => {
		   		res = res.data
		   		if (res.status == '1') {
		   			this.classifyP = res.result.list
		   		}
		   	})
		   },
		   showAdd() {
		   	this.getParent()
		   	this.classifyAddVisible = true
			this.ruleForm.classifyName = ''
			this.ruleForm.classifyP = ''
		   },
		   showEdit() {
				if (this.classifySelected.length == 0) {
		   			this.$message('请选中一个要充值的会员对象')
			   	} else if (this.classifySelected.length >1) {
			   		this.$message('最多选择一个')
			   	} else {
			   		this.getParent()
			   		this.classifyAddVisible = true
					this.isEdit = true
					this.ruleForm.classifyName = this.classifySelected[0].classifyName,
					this.ruleForm.classifyP = this.classifySelected[0].classifyP
			   	}
			},
			showDelete() {
				if (this.classifySelected.length == 0) {
		   			this.$message('请选中要删除的分类')
			   	} else {
			   		this.deleteVisible = true
			   	}
			},
			deleteConfirm() {
				let params = {
					classifys: this.classifySelected
				}
				this.$http.post('/classifys/delete', params)
				.then(res => {
					res = res.data
					this.$message(res.msg)
					this.deleteVisible = false
					this.getClassify()
					this.getAll()
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