<template>
	<div>
		<div class="table-function">
			<el-button type="primary" plain size='small' @click="gotoAdd">新增</el-button>
			<el-button type="primary" plain size='small' @click='gotoEdit'>修改</el-button>
			<el-button type="primary" plain size='small' @click='showRecharge'>充值</el-button>
			<el-button type="primary" plain size='small' @click='showChangePass'>修改密码</el-button>
			<el-button type="primary" plain size='small' @click='showLoss'>冻结</el-button>
			<el-button type="primary" plain size='small' @click='showNormal'>解冻</el-button>
		</div>
		<div class="table-search">
			<el-input placeholder="输入会员卡号" prefix-icon="el-icon-search" v-model="findContent"></el-input>
			<el-button type="primary" plain size='small' @click="getMemberList()">查询</el-button>
		</div>
		<el-table
		    ref="multipleTable"
		    :data="memberList"
		    v-loading="loading"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"></el-table-column>
		    <el-table-column prop="memberCell" label="卡号"></el-table-column>
		    <el-table-column prop="memberSex" label="性别"></el-table-column>
		    <el-table-column prop="memberGrade" label="等级"></el-table-column>
		    <el-table-column prop="memberBalance" label="余额"></el-table-column>
		    <el-table-column prop="memberStatus" label="状态"></el-table-column>
		    <el-table-column prop="memberRemark" label="备注"></el-table-column>
		    </el-table-column>
		</el-table>
		<div class="myPagination">
			<el-pagination
				background
				layout="prev, pager, next"
				:current-page.sync="page"
      			@current-change="handleCurrentChange"
				:total="memberTotal">
			</el-pagination>
		</div>
		
		<el-dialog title="会员充值" :visible.sync="rechargeVisible">
		  <el-form :model="rechargeForm">
		    <el-form-item label="充值金额">
		      <el-input v-model="rechargeForm.amount" type='number'></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="rechargeVisible = false">取 消</el-button>
		    <el-button type="primary" @click="rechargeConfirm">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="修改密码" :visible.sync="changePasswordVisible">
		  <el-form :model="changePasswordForm">
		    <el-form-item label="旧密码">
		      <el-input v-model="changePasswordForm.old"></el-input>
		    </el-form-item>
		    <el-form-item label="新密码">
		      <el-input v-model="changePasswordForm.newPass"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码">
		      <el-input v-model="changePasswordForm.newConfirm"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="changePasswordVisible = false">取 消</el-button>
		    <el-button type="primary" @click="changePassword">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="冻结" :visible.sync="lossVisible">
			<span>确认冻结所有选中会员？</span>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="lossVisible = false">取 消</el-button>
		    <el-button type="primary" @click="turnLoss">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="解冻" :visible.sync="normalVisible">
			<span>确认冻结所有选中会员？</span>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="normalVisible = false">取 消</el-button>
		    <el-button type="primary" @click="turnNormal">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				findContent: '',  ////搜索内容
				memberTotal: 0, ////会员总数
				page: 1,  /////当前第几页
				pageSize: 7,  ///////一页7条数据
				loading: false,       // 是否正在加载
				memberList: [],  /////会员列表
		        memberSelected: [],  /////选中的会员
		        
		        rechargeForm: {  //////充值表单
		        	amount: ''
		        },
		        changePasswordForm: {  ////修改密码表单
		        	old: '',
		        	newPass: '',
		        	newConfirm: ''
		        },
		        rechargeVisible: false,  //////充值弹框是否可见
		        changePasswordVisible: false,  /////修改密码弹框是否可见
		        lossVisible: false,   /////冻结弹框是否可见
		        normalVisible: false  /////解冻弹框是否可见
			}
		},
		methods:{
			handleSelectionChange(val) {  ////改变当前选中会员
		    	this.memberSelected = val;
		   },
		   handleCurrentChange(val) {  ////改变当前页数
		   	this.page = val
		   	this.getMemberList()
		   },
		   getMemberList() {   /////获取查询的会员
		   	var params = {
		   		page: this.page,
        		pageSize: this.pageSize,
        		findContent: this.findContent
		   	}
		   	this.loading = true
		   	this.$http.get('/members/list', {params})
		   	.then(res => {
		   		res = res.data
		   		this.loading = false
		   		if (res.status == '1') {
		   			this.memberList = res.result.list
		   			this.memberList.forEach(item => {
		   				item.memberStatus = item.memberStatus ? '正常' : '冻结中'
		   			})
		   		}
		   	})
		   },
		   getAllMember() {   /////获取会员总数
		   	this.$http.get('/members/all')
		   	.then(res => {
		   		res = res.data
		   		if (res.status == '1') {
		   			this.memberTotal = res.count
		   		}
		   	})
		   },
		   gotoAdd() {    ////跳转到新增页面
		   	this.$router.push({
	          path: '/backEnd/memberAdd'
	        })
		   },
		   showRecharge() {    ////显示充值弹框
		   	if (this.memberSelected.length == 0) {
		   		this.$message('请选中一个要充值的会员对象')
		   	} else if (this.memberSelected.length >1) {
		   		this.$message('最多选择一个')
		   	} else {
		   		this.rechargeVisible = true
		   	}
		   },
		   rechargeConfirm() {   ////确认充值
		   	this.rechargeVisible = false
		   	let params = {
		   		memberCard: this.memberSelected[0].memberCell,
		   		amount: this.rechargeForm.amount
		   	}
		   	this.$http.post('/members/recharge', params)
		   	.then(res => {
		   		res = res.data
		   		if (res.status == '1') {
		   			this.getMemberList()
		   			this.$message(res.msg)
		   		} else {
					this.$message(res.msg)
				}
		   	})
		   },
		   showChangePass() {   ///显示修改密码弹框
		   	if (this.memberSelected.length == 0) {
		   		this.$message('请选中一个要修改的会员对象')
		   	} else if (this.memberSelected.length >1) {
		   		this.$message('最多选择一个')
		   	} else {
		   		this.changePasswordVisible = true
		   	}
		   },
		   changePassword() {   /////修改密码
		   	this.changePasswordVisible = false
		   	let params = {
		   		memberCard: this.memberSelected[0].memberCell,
		   		old: this.changePasswordForm.old,
		   		newPass: this.changePasswordForm.newPass
		   	}
		   	this.$http.post('/members/changePass', params)
		   	.then(res => {
		   		res = res.data
	   			this.$message(res.msg)
		   	})
		   },
		   showLoss() {  ////显示冻结弹框
		   	if (this.memberSelected.length == 0) {
		   		this.$message('请选中要冻结的会员对象')
		   	} else {
		   		this.lossVisible = true
		   	}
		   },
		   showNormal() {   /////显示解冻弹框
		   	if (this.memberSelected.length == 0) {
		   		this.$message('请选中要解冻的会员对象')
		   	} else {
		   		this.normalVisible = true
		   	}
		   },
		   turnLoss() {  /////冻结
		   	this.lossVisible = false
		   	let params = {
		   		members: this.memberSelected
		   	}
		   	this.$http.post('/members/loss', params)
		   	.then(res => {
		   		res = res.data
		   		this.$message(res.msg)
	   			this.getMemberList()
		   	})
		   },
		   turnNormal() {  ////解冻
		   	this.normalVisible = false
		   	let params = {
		   		members: this.memberSelected
		   	}
		   	this.$http.post('/members/normal', params)
		   	.then(res => {
		   		res = res.data
		   		this.$message(res.msg)
	   			this.getMemberList()
		   	})
		   },
		   gotoEdit() {  ////修改会员信息
		   	if (this.memberSelected.length == 0) {
		   		this.$message('请选中一个要修改的会员对象')
		   	} else if (this.memberSelected.length >1) {
		   		this.$message('最多选择一个')
		   	} else {
		   		this.$router.push({
		   		  name: 'memberAdd',
		          path: '/backEnd/memberAdd',
		          params: {memberCard: this.memberSelected[0].memberCell}
		        })
		   	}
		   }
		},
		mounted() {
			this.getMemberList()
			this.getAllMember()
		}
	}
</script>

<style></style>