<template>
	<div>
		<div class="table-function">
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
		</div>
		<h4 style="text-align: left;">商品销售金额TOP10</h4>
		<div class="goodsSaleAmount" ref='goodsSaleAmount'></div>

		<h4 style="text-align: left;">商品销售量TOP10</h4>
		<div class="goodsSaleQuantity" ref='goodsSaleQuantity'></div>

		<div class="relative">
			<h3>商品分类Top5</h3>
			<div class="statisticsTable" style="width:50%;margin-left: 0;">
				<el-table :data="classifyTable" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsClassifyC" label="分类名称">
					</el-table-column>
					<el-table-column prop="goodsClassifyP" label="父级分类">
					</el-table-column>
					<el-table-column prop="goodsNum" label="销售数量">
					</el-table-column>
					<el-table-column prop="goodsTotal" label="销售金额">
					</el-table-column>
				</el-table>
			</div>
			<div class="classifySale" ref='classifySale'></div>
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
		        orderList: [],  //////订单列表
				saleAmountOption: {
					title: {
						text: '商品销售金额TOP10'
					},
					tooltip: {},
					legend: {
						data: ['销售额']
					},
					xAxis: {
						data: []
					},
					yAxis: {},
					series: [{
						name: '销售额',
						type: 'bar',
						data: [7200, 5182, 5158, 4144, 3132, 3123, 2101, 1928, 1189, 878],
						itemStyle: {
							normal: {
								color: function(params) {
									var colorList = ['rgb(205,85,85)', 'rgb(210,105,30)', 'rgb(0,139,0)', 'rgb(178,58,238)', 'rgb(54,100,139)',
										'rgb(205,85,85)', 'rgb(210,105,30)', 'rgb(0,139,0)', 'rgb(178,58,238)', 'rgb(54,100,139)'
									];
									return colorList[params.dataIndex];
								}
							},
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				},
				saleQuantityOption: {
					title: {
						text: '商品销售量TOP10'
					},
					tooltip: {},
					legend: {
						data: ['销售量']
					},
					xAxis: {
						data: []
					},
					yAxis: {},
					series: [{
						name: '销售量',
						type: 'bar',
						data: [],
						itemStyle: {
							normal: {
								color: function(params) {
									var colorList = ['rgb(205,85,85)', 'rgb(210,105,30)', 'rgb(0,139,0)', 'rgb(178,58,238)', 'rgb(54,100,139)',
										'rgb(205,85,85)', 'rgb(210,105,30)', 'rgb(0,139,0)', 'rgb(178,58,238)', 'rgb(54,100,139)'
									];
									return colorList[params.dataIndex];
								}
							},
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				},
				classifyOption: {
					title: {
						text: '商品分类占比',
						left: 'center',
						top: 20,
						textStyle: {
							color: '#ccc'
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {d}%"
					},
					visualMap: {
						show: false,
						min: 500,
						max: 600,
						inRange: {
							colorLightness: [0, 1]
						}
					},
					series: [{
						name: '商品分类占比',
						type: 'pie',
						clockwise: 'true',
						startAngle: '0',
						radius: '60%',
						center: ['50%', '50%'],
						data: [{
								value: 40,
								name: '牛仔裤'
							},
							{
								value: 30,
								name: 'T恤'
							},
							{
								value: 20,
								name: '休闲裤'
							},
							{
								value: 7,
								name: '衬衫'
							},
							{
								value: 3,
								name: '卫衣'
							}

						],
					}]
				}
			}
		},
		computed: {
			goodsAmountList() { /////////商品销售金额TOP10
				let list = []
				this.orderList.forEach(order => {  /////获取所有商品销售额
					order.cartList.forEach(cart => {
						if (list.length == 0) {
							let goods = {
								goodsId: cart.goodsId,
								goodsName: cart.goodsName,
								goodsTotal: cart.goodsOut * cart.goodsNum
							}
							list.push(goods)
						} else {
							let isExist = false
							list.forEach(item => {
								if (cart.goodsId == item.goodsId) {
									item.goodsTotal += (cart.goodsOut * cart.goodsNum)
									isExist = true
									return
								}
							})
							if (!isExist) {
								let goods = {
									goodsId: cart.goodsId,
									goodsName: cart.goodsName,
									goodsTotal: cart.goodsOut * cart.goodsNum
								}
								list.push(goods)
							}
						}
					})
				})
				
				let amountName = [] /////商品前10名称
				let amount = []  ////商品前10销售额
				list = list.sort(this.sortGoods("goodsTotal"))
				list.forEach((item,index) => {
					if (index < 10){
						amountName.push(item.goodsName)
						amount.push(item.goodsTotal)
					}
				})
				
				return {amountName, amount}
			},
			goodsCountList() { /////////商品销售量TOP10
				let list = []
				this.orderList.forEach(order => {  /////获取所有商品销售量
					order.cartList.forEach(cart => {
						if (list.length == 0) {
							let goods = {
								goodsId: cart.goodsId,
								goodsName: cart.goodsName,
								goodsNum: cart.goodsNum
							}
							list.push(goods)
						} else {
							let isExist = false
							list.forEach(item => {
								if (cart.goodsId == item.goodsId) {
									item.goodsNum += cart.goodsNum
									isExist = true
									return
								}
							})
							if (!isExist) {
								let goods = {
									goodsId: cart.goodsId,
									goodsName: cart.goodsName,
									goodsNum: cart.goodsNum
								}
								list.push(goods)
							}
						}
					})
				})
				
				let countName = [] /////商品前10名称
				let count = []  ////商品前10销售量
				list = list.sort(this.sortGoods("goodsNum"))
				list.forEach((item,index) => {
					if (index < 10){
						countName.push(item.goodsName)
						count.push(item.goodsNum)
					}
				})
				
				return {countName, count}
			},
			classifyTable() { //////分类Top5
				let list = []
				this.orderList.forEach(order => {  /////获取所有分类销售额
					order.cartList.forEach(cart => {
						if (list.length == 0) {
							let goods = {
								goodsClassifyC: cart.goodsClassifyC,
								goodsClassifyP: cart.goodsClassifyP,
								goodsNum: cart.goodsNum,
								goodsTotal: cart.goodsNum * cart.goodsOut
							}
							list.push(goods)
						} else {
							let isExist = false
							list.forEach(item => {
								if (cart.goodsClassifyC == item.goodsClassifyC) {
									item.goodsNum += cart.goodsNum
									item.goodsTotal += (cart.goodsNum * cart.goodsOut)
									isExist = true
									return
								}
							})
							if (!isExist) {
								let goods = {
									goodsClassifyC: cart.goodsClassifyC,
									goodsClassifyP: cart.goodsClassifyP,
									goodsNum: cart.goodsNum,
									goodsTotal: cart.goodsNum * cart.goodsOut
								}
								list.push(goods)
							}
						}
					})
				})
				
				let result = [] /////排序，获取前5
				list = list.sort(this.sortGoods("goodsTotal"))
				list.forEach((item,index) => {
					if (index < 5){
						item.sort = index + 1
						result.push(item)
					}
				})
				
				return result
			},
			classifyPercent() { //////分类Top5占比
				let list = []
				let total = 0
				this.classifyTable.forEach(item => {
					total += item.goodsTotal
				})
				this.classifyTable.forEach(item => {
					let percent = {
						value: (item.goodsTotal / total).toFixed(2) * 100,
						name: item.goodsClassifyC
					}
					list.push(percent)
				})
				return list
			}
		},
		methods: {
			setEchart() {
				///////////设置商品销售额Top10
				this.saleAmountOption.xAxis.data = this.goodsAmountList.amountName
				this.saleAmountOption.series[0].data = this.goodsAmountList.amount
				let goodsSaleAmount = this.$echarts.init(this.$refs.goodsSaleAmount)
				goodsSaleAmount.setOption(this.saleAmountOption)
				
				///////////设置商品销售量Top10
				this.saleQuantityOption.xAxis.data = this.goodsCountList.countName
				this.saleQuantityOption.series[0].data = this.goodsCountList.count
				let goodsSaleQuantity = this.$echarts.init(this.$refs.goodsSaleQuantity)
				goodsSaleQuantity.setOption(this.saleQuantityOption)
				
				/////////设置商品分类Top5
				this.classifyOption.series[0].data = this.classifyPercent
				let classifySale = this.$echarts.init(this.$refs.classifySale)
				classifySale.setOption(this.classifyOption)
			},
			getOrder() {   ////////根据日期筛选订单
				this.$http.get('/orders/all').then(res => {
					res = res.data
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
					this.orderList = list
					this.setEchart()
				})
			},
			sortGoods(target) {
				return function(a,b){
			        var value1 = a[target];
			        var value2 = b[target];
			        return value2 - value1;
			    }
			}
		},
		mounted() {
			this.getOrder()
		}
	}
</script>

<style>
	h3 {
		margin: 20px 0;
	}
	
	.goodsSaleAmount {
		width: 100%;
		height: 400px;
	}
	
	.goodsSaleQuantity {
		width: 100%;
		height: 400px;
	}
	.classifySale{
		width: 350px;
		height: 350px;
		position: absolute;
		right: 50px;
		top: 40px;
	}
</style>