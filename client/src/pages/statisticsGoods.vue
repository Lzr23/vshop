<template>
	<div>
		<h3>商品销售量</h3>
		<div class="table-function">
			<el-button type="primary" plain size='small'>本周</el-button>
			<el-button type="primary" plain size='small'>本月</el-button>
			<el-button type="primary" plain size='small'>今年</el-button>
		</div>
		<h4 style="text-align: left;">商品销售金额TOP10</h4>
		<div class="goodsSaleAmount" ref='goodsSaleAmount'></div>

		<h4 style="text-align: left;">商品销售量TOP10</h4>
		<div class="goodsSaleQuantity" ref='goodsSaleQuantity'></div>

		<h4>会员消费TOP10</h4>
		<el-table :data="goodsSaleData" stripe style="width: 100%">
			<el-table-column prop="sort" label="排名">
			</el-table-column>
			<el-table-column prop="goodsName" label="商品名称">
			</el-table-column>
			<el-table-column prop="goodsQuantity" label="销售数量">
			</el-table-column>
			<el-table-column prop="goodsAmount" label="销售总额">
			</el-table-column>
			<el-table-column prop="goodsProfit" label="毛利润">
			</el-table-column>
			<el-table-column prop="goodsDayProfit" label="日均利润">
			</el-table-column>
		</el-table>

		<div class="relative">
			<h3>商品分类统计</h3>
			<div class="table-function">
				<el-button type="primary" plain size='small'>本周</el-button>
				<el-button type="primary" plain size='small'>本月</el-button>
				<el-button type="primary" plain size='small'>今年</el-button>
			</div>
			<div class="statisticsTable" style="width:50%;margin-left: 0;">
				<el-table :data="classifyData" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="classifyName" label="分类名称">
					</el-table-column>
					<el-table-column prop="classifyParent" label="父级分类">
					</el-table-column>
					<el-table-column prop="classifyQuantity" label="销售数量">
					</el-table-column>
					<el-table-column prop="classifyAmount" label="销售金额">
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
				saleAmountOption: {
					title: {
						text: '商品销售金额TOP10'
					},
					tooltip: {},
					legend: {
						data: ['销售额']
					},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "雪纺衫", "裤子", "高跟鞋", "袜子"]
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
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销售量',
						type: 'bar',
						data: [200, 182, 158, 144, 132, 123, 101, 98, 89, 78],
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
				},
				goodsSaleData: [{
					sort: 1,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 2,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 3,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 4,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 5,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 6,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 7,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 8,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 9,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}, {
					sort: 10,
					goodsName: '白色T恤1',
					goodsQuantity: 120,
					goodsAmount: 123201,
					goodsProfit: 73230,
					goodsDayProfit: 13230
				}],
				classifyData: [{
					sort: 1,
					classifyName: '牛仔裤',
					classifyParent: '下装',
					classifyQuantity: 500,
					classifyAmount: 43220
				},{
					sort: 2,
					classifyName: 'T恤',
					classifyParent: '上装',
					classifyQuantity: 400,
					classifyAmount: 36210
				},{
					sort: 3,
					classifyName: '休闲裤',
					classifyParent: '下装',
					classifyQuantity: 300,
					classifyAmount: 33220
				},{
					sort: 4,
					classifyName: '衬衫',
					classifyParent: '上装',
					classifyQuantity: 20,
					classifyAmount: 27220
				},{
					sort: 5,
					classifyName: '卫衣',
					classifyParent: '上装',
					classifyQuantity: 200,
					classifyAmount: 13220
				}]
			}
		},
		mounted() {
			this.setEchart()
		},
		methods: {
			setEchart() {
				let goodsSaleAmount = this.$echarts.init(this.$refs.goodsSaleAmount)
				goodsSaleAmount.setOption(this.saleAmountOption)
				let goodsSaleQuantity = this.$echarts.init(this.$refs.goodsSaleQuantity)
				goodsSaleQuantity.setOption(this.saleQuantityOption)
				let classifySale = this.$echarts.init(this.$refs.classifySale)
				classifySale.setOption(this.classifyOption)
			}
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