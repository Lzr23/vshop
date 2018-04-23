<template>
	<div>
		<div class="table-function">
			<el-button type="primary" plain size='small' @click="showGradeAdd">新增</el-button>
			<el-button type="primary" plain size='small' @click="showGradeEdit">修改</el-button>
			<el-button type="primary" plain size='small' @click="showGradeDelete">删除</el-button>
		</div>
		<el-table ref="multipleTable" v-loading="loading" :data="gradeList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="gradeName" label="等级名称"></el-table-column>
			<el-table-column prop="gradeDiscount" label="等级折扣"></el-table-column>
		</el-table>

		<el-dialog title="等级新增" :visible.sync="gradeAddVisible">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
				<el-form-item label="等级名称" prop="gradeName">
					<el-input v-model="ruleForm.gradeName" :disabled='isEdit'></el-input>
				</el-form-item>
				<el-form-item label="等级折扣" prop="gradeDiscount">
					<el-input v-model="ruleForm.gradeDiscount" type='number' placeholder='输入0~1之间的折扣'></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="gradeAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
			</div>
		</el-dialog>
		
		<el-dialog title="删除等级" :visible.sync="deleteVisible">
			<span>确认删除所有选中等级？</span>
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
				loading: false, // 是否正在加载
				gradeList: [], /////会员列表

				ruleForm: {
					gradeName: '',
					gradeDiscount: ''
				},
				rules: {
					gradeName: {
						required: true,
						message: '请输入等级名称',
						trigger: 'blur'
					},
					gradeDiscount: {
						required: true,
						message: '请输入等级折扣',
						trigger: 'blur'
					}
				},
				gradeSelected: [], ///选中等级
				isEdit: false, ///是否为编辑状态

				gradeAddVisible: false, /////等级新增是否可见
				deleteVisible: false  ////等级删除是否可见
			}
		},
		methods: {
			handleSelectionChange(val) {
				this.gradeSelected = val;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.isEdit) {
							this.$http.post('/grades/gradeEdit', this.ruleForm)
								.then(res => {
									res = res.data
									this.$message(res.msg)
									this.gradeAddVisible = false
									this.getGradeList()
								})
						} else {
							this.$http.post('/grades/gradeAdd', this.ruleForm)
								.then(res => {
									res = res.data
									this.$message(res.msg)
									this.gradeAddVisible = false
									this.getGradeList()
								})
						}
					} else {
						return false;
					}
				});
			},
			getGradeList() { /////获取等级列表
				var params = {
					page: this.page,
					pageSize: this.pageSize
				}
				this.loading = true
				this.$http.get('/grades/list', {
						params
					})
					.then(res => {
						res = res.data
						this.loading = false
						if(res.status == '1') {
							this.gradeList = res.result.list
							this.total = res.result.count
						}
					})
			},
			showGradeAdd() {
				this.gradeAddVisible = true
				this.ruleForm.gradeName = '',
				this.ruleForm.gradeDiscount = ''
			},
			showGradeEdit() {
				if (this.gradeSelected.length == 0) {
		   			this.$message('请选中一个要充值的会员对象')
			   	} else if (this.gradeSelected.length >1) {
			   		this.$message('最多选择一个')
			   	} else {
			   		this.gradeAddVisible = true
					this.isEdit = true
					this.ruleForm.gradeName = this.gradeSelected[0].gradeName,
					this.ruleForm.gradeDiscount = this.gradeSelected[0].gradeDiscount
			   	}
			},
			showGradeDelete() {
				if (this.gradeSelected.length == 0) {
		   			this.$message('请选中要删除的会员对象')
			   	} else {
			   		this.deleteVisible = true
			   	}
			},
			deleteConfirm() {
				let params = {
					grades: this.gradeSelected
				}
				this.$http.post('/grades/gradeDelete', params)
				.then(res => {
					res = res.data
					this.$message(res.msg)
					this.deleteVisible = false
					this.getGradeList()
				})
			}
		},
		mounted() {
			this.getGradeList()
		}
	}
</script>

<style></style>