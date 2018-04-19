<template>
	<div>
		<div class="table-function">
			<el-button type="primary" plain size='small' @click="gotoAdd">新增</el-button>
			<el-button type="primary" plain size='small' @click='showRecharge'>充值</el-button>
			<el-button type="primary" plain size='small'>修改密码</el-button>
			<el-button type="primary" plain size='small'>挂失</el-button>
			<el-button type="primary" plain size='small'>取挂</el-button>
			<el-button type="primary" plain size='small'>修改</el-button>
			<el-button type="primary" plain size='small'>删除</el-button>
		</div>
		<div class="table-search">
			<el-input placeholder="输入会员卡号/姓名" prefix-icon="el-icon-search" v-model="findContent"></el-input>
			<el-button type="primary" plain size='small'>查询</el-button>
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
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				findContent: '',  ////搜索内容
				memberTotal: 0, ////会员总数
				page: 1,  /////当前第几页
				pageSize: 7,  ///////一页10条数据
				loading: false,       // 是否正在加载
				memberList: [],  /////会员列表
		        memberSelected: [],  /////选中的会员
		        
		        rechargeForm: {  //////充值表单
		        	amount: ''
		        },
		        rechargeVisible: false  //////充值弹框是否可见
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
		   				item.memberStatus = item.memberStatus ? '正常' : '挂失中'
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
		   }
		},
		mounted() {
			this.getMemberList()
			this.getAllMember()
		}
	}
</script>

<style></style>