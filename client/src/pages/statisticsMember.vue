<template>
	<div>
		<div class="overflowHiddeng">
			<div class="relative">
				<h3>消费概况</h3>
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
				<div class="statisticsItem">
					<h4>会员消费</h4>
					<p>总消费金额：￥{{memberTotal}}</p>
					<p>总消费笔数：{{memberCount}}笔</p>
					<p>日均消费额：{{memberDayTotal}}</p>
					<p>日均成交数：{{memberDayCount}}笔</p>
				</div>
				<div class="statisticsItem">
					<h4>非会员消费</h4>
					<p>总消费金额：￥{{unMemberTotal}}</p>
					<p>总消费笔数：{{unMemberCount}}笔</p>
					<p>日均消费额：{{unMemberDayTotal}}</p>
					<p>日均成交数：{{unMemberDayCount}}笔</p>
				</div>
				<div class="memberAndNot" ref='memberAndNot'></div>
			</div>
			<div class="statisticsTable">
				<h4>会员热卖TOP10</h4>
				<el-table :data="memberTable" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsNum" label="销售数量">
					</el-table-column>
				</el-table>
			</div>
			<div class="statisticsTable">
				<h4>非会员热卖TOP10</h4>
				<el-table :data="unMemberTable" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsNum" label="销售数量">
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div>
			<div class="relative">
				<h3>男女消费统计</h3>
				<div class="statisticsItem">
					<h4>男士消费</h4>
					<p>总消费金额：￥{{maleTotal}}</p>
					<p>总消费笔数：{{maleCount}}笔</p>
					<p>日均消费额：{{maleDayTotal}}</p>
					<p>日均成交数：{{maleDayCount}}笔</p>
				</div>
				<div class="statisticsItem">
					<h4>女士消费</h4>
					<p>总消费金额：￥{{femaleTotal}}</p>
					<p>总消费笔数：{{femaleCount}}笔</p>
					<p>日均消费额：{{femaleDayTotal}}</p>
					<p>日均成交数：{{femaleDayCount}}笔</p>
				</div>
				<div class="maleAndFemale" ref='maleAndFemale'></div>
				<div class="statisticsTable">
				<h4>男士热卖TOP10</h4>
				<el-table :data="maleTable" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsNum" label="销售数量">
					</el-table-column>
				</el-table>
			</div>
			<div class="statisticsTable">
				<h4>女士热卖TOP10</h4>
				<el-table :data="femaleTable" stripe style="width: 100%">
					<el-table-column prop="sort" label="排名">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称">
					</el-table-column>
					<el-table-column prop="goodsNum" label="销售数量">
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
				v1: 20,
				v2: 80,
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
								value: 0,
								name: '会员'
							},
							{
								value: 0,
								name: '散客'
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
								value: 0,
								name: '男士'
							},
							{
								value: 0,
								name: '女士'
							}

						],
					}]
				}
			}
		},
		computed: {
			dayCount() {  //////////计算日期数
				let day = 0
				let days = 0
				if (this.dateSelected == '') {
					let day1 = '', day2 = ''
					this.orderList.forEach((item,index) => {
						if (index == 0) {
							day1 = item.orderDate
						}
						if (index == (this.orderList.length-1)) {
							day2 = item.orderDate
						}
					})
					days = Date.parse(day2) - Date.parse(day1)
				} else {
					days = this.dateSelected[1] - this.dateSelected[0]
				}
				day = parseInt(days / (1000 * 60 * 60 * 24))
				return day+1
			},
			memberTotal() { /////////会员消费金额
				let total = 0
				this.orderList.forEach(item => {
					if (item.member.memberCell != '散客') {
						total += item.orderTotal
					}
				})
				return total
			},
			memberCount() {  //////会员消费笔数
				let count = 0
				this.orderList.forEach(item => {
					if (item.member.memberCell != '散客') {
						count ++
					}
				})
				return count
			},
			memberDayTotal() {  ///////会员日均消费
				let dayTotal = parseFloat(this.memberTotal / this.dayCount).toFixed(2)
				return dayTotal
			},
			memberDayCount() {  ///////会员日均笔数
				let dayCount = parseFloat(this.memberCount / this.dayCount).toFixed(2)
				return dayCount
			},
			unMemberTotal() { /////////散客消费金额
				let total = 0
				this.orderList.forEach(item => {
					if (item.member.memberCell == '散客') {
						total += item.orderTotal
					}
				})
				return total
			},
			unMemberCount() {  //////散客消费笔数
				let count = 0
				this.orderList.forEach(item => {
					if (item.member.memberCell == '散客') {
						count ++
					}
				})
				return count
			},
			unMemberDayTotal() {  ///////散客日均消费
				let dayTotal = parseFloat(this.unMemberTotal / this.dayCount).toFixed(2)
				return dayTotal
			},
			unMemberDayCount() {  ///////散客日均笔数
				let dayCount = parseFloat(this.unMemberCount / this.dayCount).toFixed(2)
				return dayCount
			},
			memberPercent() {  /////获取会员消费额占比
				let total = this.memberTotal + this.unMemberTotal
				return (this.memberTotal / total).toFixed(2) * 100
			},
			unMemberPercent() {  /////获取散客消费额占比
				let total = this.memberTotal + this.unMemberTotal
				return (this.unMemberTotal / total).toFixed(2) * 100
			},
			memberTable() {   //////会员Top10
				let list = []
				this.orderList.forEach(order => {   ////////获取会员的所有消费商品列表
					if (order.member.memberCell != '散客') {
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
					}
				})
				let result = []   ////////排序，获取前10
				list = list.sort(this.sortGoods("goodsNum"))
				list.forEach((item,index) => {
					if (index < 10){
						item.sort = index + 1
						result.push(item)
					}
				})
				return result
			},
			unMemberTable() {  //////散客Top10
				let list = []
				this.orderList.forEach(order => {   ////////获取散客的所有消费商品列表
					if (order.member.memberCell == '散客') {
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
					}
				})
				let result = []   ////////排序，获取前10
				list = list.sort(this.sortGoods("goodsNum"))
				list.forEach((item,index) => {
					if (index < 10){
						item.sort = index + 1
						result.push(item)
					}
				})
				return result
			},
			maleTotal() { /////////男士消费金额
				let total = 0
				this.orderList.forEach(item => {
					if (item.member.memberSex == '男') {
						total += item.orderTotal
					}
				})
				return total
			},
			femaleTotal() { /////////女士消费金额
				let total = 0
				this.orderList.forEach(item => {
					if (item.member.memberSex == '女') {
						total += item.orderTotal
					}
				})
				return total
			},
			maleCount() {  //////男士消费笔数
				let count = 0
				this.orderList.forEach(item => {
					if (item.member.memberSex == '男') {
						count ++
					}
				})
				return count
			},
			femaleCount() {  //////女士消费笔数
				let count = 0
				this.orderList.forEach(item => {
					if (item.member.memberSex == '女') {
						count ++
					}
				})
				return count
			},
			maleDayTotal() {  ///////男士日均消费
				let dayTotal = parseFloat(this.maleTotal / this.dayCount).toFixed(2)
				return dayTotal
			},
			maleDayCount() {  ///////男士日均笔数
				let dayCount = parseFloat(this.maleCount / this.dayCount).toFixed(2)
				return dayCount
			},
			femaleDayTotal() {  ///////女士日均消费
				let dayTotal = parseFloat(this.femaleTotal / this.dayCount).toFixed(2)
				return dayTotal
			},
			femaleDayCount() {  ///////女士日均笔数
				let dayCount = parseFloat(this.femaleCount / this.dayCount).toFixed(2)
				return dayCount
			},
			malePercent() {  /////获取男士消费额占比
				let total = this.maleTotal + this.femaleTotal
				return (this.maleTotal / total).toFixed(2) * 100
			},
			femalePercent() {  /////获取女士消费额占比
				let total = this.maleTotal + this.femaleTotal
				return (this.femaleTotal / total).toFixed(2) * 100
			},
			maleTable() {  ////男士Top10
				let list = []
				this.orderList.forEach(order => {   ////////获取男士的所有消费商品列表
					if (order.member.memberSex == '男') {
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
					}
				})
				let result = []   ////////排序，获取前10
				list = list.sort(this.sortGoods("goodsNum"))
				list.forEach((item,index) => {
					if (index < 10){
						item.sort = index + 1
						result.push(item)
					}
				})
				return result
			},
			femaleTable() {  ////女士Top10
				let list = []
				this.orderList.forEach(order => {   ////////获取女士的所有消费商品列表
					if (order.member.memberSex == '女') {
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
					}
				})
				let result = []   ////////排序，获取前10
				list = list.sort(this.sortGoods("goodsNum"))
				list.forEach((item,index) => {
					if (index < 10){
						item.sort = index + 1
						result.push(item)
					}
				})
				return result
			}
		},
		methods: {
			setEchart() {
				///////设置会员和非会员消费占比
				this.memberAndNotOption.series[0].data[0].value = this.memberPercent
				this.memberAndNotOption.series[0].data[1].value = this.unMemberPercent
				let memberAndNot = this.$echarts.init(this.$refs.memberAndNot)
				memberAndNot.setOption(this.memberAndNotOption)
				
				/////设置男士女士消费占比
				this.maleAndFemaleOption.series[0].data[0].value = this.malePercent
				this.maleAndFemaleOption.series[0].data[1].value = this.femalePercent
				let maleAndFemale = this.$echarts.init(this.$refs.maleAndFemale)
				maleAndFemale.setOption(this.maleAndFemaleOption)
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