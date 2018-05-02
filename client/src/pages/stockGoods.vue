<template>
  <div>
    <div class="table-search">
      <el-input placeholder="输入产品名称/编码" prefix-icon="el-icon-search" v-model="findContent"></el-input>
      <el-button type="primary" plain size='small'>查询</el-button>
    </div>
    <el-table
        :data="stockList"
        tooltip-effect="dark"
        v-loading="loading"
        style="width: 100%">
        <el-table-column type="expand">
	      <template slot-scope="props">
	      	<table class="expandTalbe">
	      		<thead>
	      			<th>商品编号</th>
	      			<th>商品名称</th>
	      			<th>商品进价</th>
	      			<th>进货数量</th>
	      			<th>小计</th>
	      		</thead>
	      		<tr v-for="goods in props.row.goodsList" class="expandTr">
		      		<td>{{ goods.goodsId }}</td>
		      		<td>{{ goods.goodsName }}</td>
		      		<td>{{ goods.goodsIn }}</td>
		      		<td>{{ goods.quantity }}</td>
		      		<td>{{ goods.total }}</td>
		      	</tr>
	      	</table>
	        <!--<el-form label-position="left" inline class="demo-table-expand">
	          <el-form-item label="商品名称">
	            <span></span>
	          </el-form-item>
	        </el-form>-->
	      </template>
	    </el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="stockId" label="单号"></el-table-column>
        <el-table-column prop="stockQuantity" label="进货数量"></el-table-column>
        <el-table-column prop="stockTotal" label="合计"></el-table-column>
        <el-table-column prop="stockDate" label="进货时间"></el-table-column>
        </el-table-column>
    </el-table>
    
    <div class="myPagination">
			<el-pagination
				background
				layout="prev, pager, next"
				page-size='7'
				:current-page.sync="page"
      			@current-change="handleCurrentChange"
				:total="stocksTotal">
			</el-pagination>
		</div>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        findContent: '',  ////搜索内容
        stocksTotal: 0, ////库存总数
				page: 1,  /////当前第几页
				pageSize: 7,  ///////一页7条数据
				loading: false,       // 是否正在加载
			  stockList: []  ////库存 列表
      }
    },
    methods:{
	    handleCurrentChange(val) {  ////改变当前页数
		   	this.page = val
		   	this.getStockList()
		  },
		  getStockList() {  /////获取库存列表
		  	var params = {
		   		page: this.page,
	    		pageSize: this.pageSize,
	    		findContent: this.findContent
		   	}
		   	this.loading = true
		   	this.$http.get('/stocks/list', {params})
		   	.then(res => {
		   		res = res.data
		   		this.loading = false
		   		if (res.status == '1') {
		   			this.stockList = res.result.list
		   		}
		   	})
		  },
		  getAllStocks() {   /////获取库存总数
		   	this.$http.get('/stocks/all')
		   	.then(res => {
		   		res = res.data
		   		if (res.status == '1') {
		   		this.stocksTotal = res.result.count
		   		}
		   	})
		  }
    },
    mounted() {
    	this.getStockList()
    	this.getAllStocks()
    }
  }
</script>

<style>
.expandTalbe{
	width: 100%;
	text-align: center;
}
.expandTalbe th{
	text-align: center;
}
.expandTr{
	width: 100%
}
</style>