<template>
  <div>
    <div class="table-function">
      <el-button type="primary" plain size='small' @click="gotoAdd">新增</el-button>
      <el-button type="primary" plain size='small' @click="gotoEdit">修改</el-button>
      <el-button type="primary" plain size='small' @click="showUp">上架</el-button>
      <el-button type="primary" plain size='small' @click="showDown">下架</el-button>
      <el-button type="primary" plain size='small' @click="showStock">进货</el-button>
    </div>
    <div class="table-search">
      <el-input placeholder="输入产品名称/编码" clearable prefix-icon="el-icon-search" v-model="findContent"></el-input>
      <el-button type="primary" plain size='small' @click="getGoodsList()">查询</el-button>
    </div>
    <el-table ref="multipleTable" :data="goodsList" v-loading="loading" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="goodsId" label="编码"></el-table-column>
      <el-table-column prop="goodsName" label="名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsClassifyP" label="大分类"></el-table-column>
      <el-table-column prop="goodsClassifyC" label="小分类"></el-table-column>
      <el-table-column prop="goodsIn" label="进价"></el-table-column>
      <el-table-column prop="goodsOut" label="售价"></el-table-column>
      <el-table-column prop="goodsStock" label="库存"></el-table-column>
      <el-table-column prop="goodsStatus" label="状态"></el-table-column>
      </el-table-column>
    </el-table>
    <div class="myPagination">
			<el-pagination
				background
				layout="prev, pager, next"
				:current-page.sync="page"
      			@current-change="handleCurrentChange"
				:total="goodsTotal">
			</el-pagination>
		</div>
    
    <el-dialog title="下架" :visible.sync="downVisible">
			<span>确认下架所有选中商品？</span>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="downVisible = false">取 消</el-button>
		    <el-button type="primary" @click="turnDown">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="上架" :visible.sync="upVisible">
			<span>确认上架所有选中商品？</span>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="upVisible = false">取 消</el-button>
		    <el-button type="primary" @click="turnUp">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="进货" :visible.sync="stockVisible">
			<table class="stockTable">
				<thead>
					<th>商品编号</th>
					<th>商品名称</th>
					<th>进货数量</th>
					<th>小计</th>
				</thead>
				<tbody>
					<tr v-for="goods in goodsSelected">
						<td>{{goods.goodsId}}</td>
						<td>{{goods.goodsName}}</td>
						<td><el-input v-model="goods.quantity" min="0" type="number" placeholder="请输入进货数量"></el-input></td>
						<td>{{goods.goodsIn * goods.quantity}}</td>
					</tr>
				</tbody>
			</table>
			<h3 style="padding: 10px 20px;">合计:<span class="colorRed">{{stockTotal}}</span>元</h3>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="stockVisible = false">取 消</el-button>
		    <el-button type="primary" @click="stockIn">确 定</el-button>
		  </div>
		</el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
        return {
          findContent: '', ////搜索内容
          goodsTotal: 0, ////商品总数
					page: 1,  /////当前第几页
					pageSize: 7,  ///////一页7条数据
					loading: false,       // 是否正在加载
					goodsList: [],  /////商品列表
          goodsSelected: [],   ////选中商品
          
          
          downVisible: false,  ////下架弹框
          upVisible: false,   /////上架弹框
          stockVisible: false,  ////进货弹框
          
        }
      },
      computed: {
      	stockTotal () {
      		var total = 0
      		this.goodsSelected.forEach(item => {
      			total += item.goodsIn * item.quantity
      		})
      		return total
      	}
      },
      methods: {
        handleSelectionChange(val) {
          this.goodsSelected = val;
        },
        handleCurrentChange(val) {  ////改变当前页数
			   	this.page = val
			   	this.getGoodsList()
			  },
			  getGoodsList() {   /////获取查询的商品
			   	var params = {
			   		page: this.page,
        		pageSize: this.pageSize,
        		findContent: this.findContent
			   	}
			   	this.loading = true
			   	this.$http.get('/goods/list', {params})
			   	.then(res => {
			   		res = res.data
			   		this.loading = false
			   		if (res.status == '1') {
			   			this.goodsList = res.result.list
			   			this.goodsList.forEach(item => {
		   				item.goodsStatus = item.goodsStatus ? '正常' : '已下架'
			   			})
			   		}
			   	})
			  },
			  getAllGoods() {   /////获取商品总数
			   	this.$http.get('/goods/all')
			   	.then(res => {
			   		res = res.data
			   		if (res.status == '1') {
			   		this.goodsTotal = res.count
			   		}
			   	})
			  },
			  gotoAdd() {    ////跳转到新增页面
			   	this.$router.push({
	          path: '/backEnd/GoodsAdd'
	        })
			  },
			  showUp() {
			  	if (this.goodsSelected.length == 0) {
			   		this.$message('请选中要上架的商品')
			   	} else {
			   		this.upVisible = true
			   	}
			  },
			  showDown() {
			  	if (this.goodsSelected.length == 0) {
			   		this.$message('请选中要上架的商品')
			   	} else {
			   		this.downVisible = true
			   	}
			  },
			  showStock() {
			  	if (this.goodsSelected.length == 0) {
			   		this.$message('请选中要进货的商品')
			   	} else {
			   		this.goodsSelected.forEach(item => {
	          	this.$set(item, "quantity", 0)
	          	this.$set(item, "total", 0)
	          })
			   		this.stockVisible = true
			   	}
			  },
			  turnUp() {   ////////商品上架
			  	this.upVisible = false
			   	let params = {
			   		goods: this.goodsSelected
			   	}
			   	this.$http.post('/goods/up', params)
			   	.then(res => {
			   		res = res.data
			   		this.$message(res.msg)
		   			this.getGoodsList()
			   	})
			  },
			  turnDown() {   //////商品下架
			  	this.downVisible = false
			   	let params = {
			   		goods: this.goodsSelected
			   	}
			   	this.$http.post('/goods/down', params)
			   	.then(res => {
			   		res = res.data
			   		this.$message(res.msg)
		   			this.getGoodsList()
			   	})
			  },
			  gotoEdit() {  ////修改商品信息
			   	if (this.goodsSelected.length == 0) {
			   		this.$message('请选中一个要修改的商品')
			   	} else if (this.goodsSelected.length >1) {
			   		this.$message('最多选择一个')
			   	} else {
			   		this.$router.push({
			   		  	name: 'goodsAdd',
			          path: '/backEnd/goodsAdd',
			          params: {goodsId: this.goodsSelected[0].goodsId}
			        })
			   	}
			  },
			  stockIn() {  //////进货
			  	this.stockVisible = false
			  	let params = {
			  		goodsList: this.goodsSelected
			  	}
			  	this.$http.post('/stocks/goodsIn', params)
			  	.then(res => {
			  		res = res.data
			  		this.$message(res.msg)
			  		this.getGoodsList()
			  	})
			  }
      },
      mounted() {
      	this.getGoodsList()
				this.getAllGoods()
      }
  }
</script>

<style>
	.stockTable{
		width: 100%;
		text-align: center;
	}
	.stockTable th{
		text-align: center;
	}
	.stockTable input{
		width: 100px;
	}
</style>