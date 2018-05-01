<template>
  <div>
    <div class="table-function">
      <el-button type="primary" plain size='small'>新增</el-button>
      <el-button type="primary" plain size='small'>修改</el-button>
      <el-button type="primary" plain size='small'>删除</el-button>
    </div>
    <div class="table-search">
      <el-input placeholder="输入产品名称/编码" prefix-icon="el-icon-search" v-model="findContent"></el-input>
      <el-button type="primary" plain size='small'>查询</el-button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange">
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
        <el-table-column prop="stockInTime" label="进货时间"></el-table-column>
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
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        findContent: '',  ////搜索内容
        goodsTotal: 0, ////商品总数
				page: 1,  /////当前第几页
				pageSize: 7,  ///////一页7条数据
				loading: false,       // 是否正在加载
			  stockSelected: [],   ////选中商品
        tableData: [{   ////表格数据
		      stockId: '20180304',
		      goodsList: [{
		      	goodsId: '546171115',
		          goodsName: '休闲裤',
		          goodsIn: 100,
		          quantity: 20,
		          total: 2000,
		      },
		      {
		      	goodsId: '546171115',
		          goodsName: '休闲裤',
		          goodsIn: 100,
		          quantity: 20,
		          total: 2000,
		      }],
		      stockQuantity: 40,
		      stockTotal: 0,
		      stockInTime: '2018-03-12',
		    }],
	    	multipleSelection: []
      }
    },
    computed: {
    	
    },
    methods:{
      handleSelectionChange(val) {
	      this.stockSelected = val;
	    },
	    handleCurrentChange(val) {  ////改变当前页数
		   	this.page = val
		   	this.getGoodsList()
		  },
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