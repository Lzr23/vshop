<template>
	<div>
		<div class="overflowHiddeng">
			<div class="relative">
				<h3>消费概况</h3>
				<div class="table-function">
					<el-button type="primary" plain size='small'>本周</el-button>
					<el-button type="primary" plain size='small'>本月</el-button>
					<el-button type="primary" plain size='small'>今年</el-button>
				</div>
				<div class="statisticsItem">
					<h4>会员消费</h4>
					<p>总消费金额：￥12341.63</p>
					<p>总消费笔数：64笔</p>
					<p>日均消费额：432.5</p>
					<p>日均成交数：13笔</p>
				</div>
				<div class="statisticsItem">
					<h4>非会员消费</h4>
					<p>总消费金额：￥12341.63</p>
					<p>总消费笔数：64笔</p>
					<p>日均消费额：432.5</p>
					<p>日均成交数：13笔</p>
				</div>
				<div class="memberAndNot" ref='memberAndNot'></div>
			</div>
			<div class="statisticsTable">
				<h4>会员热卖TOP10</h4>
				<el-table :data="memberData" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsQuantity" label="销售数量">
					</el-table-column>
				</el-table>
			</div>
			<div class="statisticsTable">
				<h4>非会员热卖TOP10</h4>
				<el-table :data="memberData" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsQuantity" label="销售数量">
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div>
			<div class="relative">
				<h3>男女消费统计</h3>
				<div class="table-function">
					<el-button type="primary" plain size='small'>本周</el-button>
					<el-button type="primary" plain size='small'>本月</el-button>
					<el-button type="primary" plain size='small'>今年</el-button>
				</div>
				<div class="statisticsItem">
					<h4>男士消费</h4>
					<p>总消费金额：￥12341.63</p>
					<p>总消费笔数：64笔</p>
					<p>日均消费额：432.5</p>
					<p>日均成交数：13笔</p>
				</div>
				<div class="statisticsItem">
					<h4>女士消费</h4>
					<p>总消费金额：￥12341.63</p>
					<p>总消费笔数：64笔</p>
					<p>日均消费额：432.5</p>
					<p>日均成交数：13笔</p>
				</div>
				<div class="maleAndFemale" ref='maleAndFemale'></div>
				<div class="statisticsTable">
				<h4>男士热卖TOP10</h4>
				<el-table :data="sexData" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsQuantity" label="销售数量">
					</el-table-column>
				</el-table>
			</div>
			<div class="statisticsTable">
				<h4>女士热卖TOP10</h4>
				<el-table :data="sexData" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsQuantity" label="销售数量">
					</el-table-column>
				</el-table>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				memberAndNotOption: {
					title: {
						text: '会员消费占比',
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
						name: '会员消费占比',
						type: 'pie',
						clockwise: 'true',
						startAngle: '0',
						radius: '60%',
						center: ['50%', '50%'],
						data: [{
								value: 73,
								name: '会员'
							},
							{
								value: 27,
								name: '非会员'
							}

						],
					}]
				},
				maleAndFemaleOption: {
					title: {
						text: '男女消费占比',
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
						name: '男女消费占比',
						type: 'pie',
						clockwise: 'true',
						startAngle: '0',
						radius: '60%',
						center: ['50%', '50%'],
						data: [{
								value: 35,
								name: '男士'
							},
							{
								value: 65,
								name: '女士'
							}

						],
					}]
				},
				memberData: [{
					sort: 1,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 2,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 3,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 4,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 5,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 6,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 7,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 8,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 9,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 10,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}],
				sexData: [{
					sort: 1,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 2,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 3,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 4,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 5,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 6,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 7,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 8,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 9,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}, {
					sort: 10,
					goodsName: '白色T恤1',
					goodsQuantity: 120
				}]
			}
		},
		mounted() {
			this.setEchart()
		},
		methods: {
			setEchart() {
				let memberAndNot = this.$echarts.init(this.$refs.memberAndNot)
				memberAndNot.setOption(this.memberAndNotOption)
				let maleAndFemale = this.$echarts.init(this.$refs.maleAndFemale)
				maleAndFemale.setOption(this.maleAndFemaleOption)
			}
		}
	}
</script>

<style>
	h3 {
		margin: 20px 0;
	}
	
	.memberAndNot {
		width: 350px;
		height: 350px;
		position: absolute;
		right: 30px;
		top: 30px;
	}
	.maleAndFemale{
		width: 350px;
		height: 350px;
		position: absolute;
		right: 30px;
		top: 30px;
	}
</style>