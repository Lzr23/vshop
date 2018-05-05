<template>
  <div>
  	<div class="block">
	    <el-date-picker
	    v-model="dateSelected"
	    type="daterange"
	    align="right"
	    value-format="timestamp"
	    unlink-panels
	    range-separator="至"
	    start-placeholder="开始日期"
	    end-placeholder="结束日期"
	    @change="getOrder"
	    :picker-options="pickerOptions2">
	    </el-date-picker>
		</div>
	
	<el-table
        :data="orderList"
        tooltip-effect="dark"
        v-loading="loading"
        style="width: 100%">
        <el-table-column type="expand">
	      <template slot-scope="props">
	      	<table class="expandTalbe">
	      		<thead>
	      			<th>商品编号</th>
	      			<th>商品名称</th>
	      			<th>单价</th>
	      			<th>数量</th>
	      			<th>小计</th>
	      		</thead>
	      		<tr v-for="goods in props.row.cartList" class="expandTr">
		      		<td>{{ goods.goodsId }}</td>
		      		<td>{{ goods.goodsName }}</td>
		      		<td>{{ goods.goodsOut }}</td>
		      		<td>{{ goods.goodsNum }}</td>
		      		<td>{{ goods.goodsOut * goods.goodsNum }}</td>
		      	</tr>
	      	</table>
	      </template>
	    </el-table-column>
        <el-table-column prop="orderId" label="订单号"></el-table-column>
        <el-table-column prop="member.memberCell" label="会员手机号"></el-table-column>
        <el-table-column prop="orderCount" label="商品总数"></el-table-column>
        <el-table-column prop="orderTotal" label="合计"></el-table-column>
        <el-table-column prop="orderDate" label="下单时间"></el-table-column>
        </el-table-column>
    </el-table>
    
    <div class="myPagination">
		<el-pagination
			background
			layout="prev, pager, next"
			page-size='7'
			:current-page.sync="page"
  			@current-change="handleCurrentChange"
			:total="orderTotal">
		</el-pagination>
	</div>
	
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
      	pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateSelected: '',   //////选中日期
        orderTotal: 0, ////订单总数
				page: 1,  /////当前第几页
				pageSize: 7,  ///////一页7条数据
				loading: false,       // 是否正在加载
				orderAll: [],  ////全部订单
		    orderList: []  ////订单列表
      }
    },
    methods:{
    	handleCurrentChange(val) {  ////改变当前页数
			  this.page = val
			  this.getOrderList()
			},
			getOrderList() {   ///////获取订单列表
				var params = {
		   		page: this.page,
	    		pageSize: this.pageSize,
		   	}
				let skip = (this.page - 1) * this.pageSize
				this.orderList = this.orderAll.slice(skip , skip + this.pageSize)
//		   	this.$http.get('/orders/list', {params})
//		   	.then(res => {
//		   		res = res.data
//		   		if (res.status == '1') {
//		   			this.orderList = res.result.list
//		   		}
//		   	})
			},
			getOrder() {   ////////根据日期筛选订单
				this.loading = true
				this.$http.get('/orders/all').then(res => {
					res = res.data
					this.loading = false
					let list = []
					if (this.dateSelected == '') {  /////未选择时间，返回全部订单
							list = res.result.list
					} else {
						res.result.list.forEach(item => {  ////////根据时间筛选订单
							let orderDate = Date.parse(item.orderDate)
							if (orderDate >= this.dateSelected[0] && orderDate <= this.dateSelected[1]) {
								list.push(item)
							}
						})
					}
					this.orderAll = list
					this.orderTotal = list.length
					this.getOrderList()
				})
			}
    },
    mounted() {
	    this.getOrder()
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