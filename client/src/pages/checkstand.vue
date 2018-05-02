<template>
  <div>
  	<el-header>
      <nav-header></nav-header>
    </el-header>
  	<div class='mainLeft'>
  		<el-autocomplete
		  v-model="memnerFindInput"
		  :fetch-suggestions="querySearchAsync"
		  placeholder="请输入会员手机"
		  style="width:100%"
		  clearable
		  @select="handleSelect">
		  </el-autocomplete>
			<div class='cart'>
				<div class='memberInfo'>
					<p><span>{{member.memberCell || "会员姓名"}}</span><span>{{member.memberSex || "会员性别"}}</span></p>
					<p><span>折扣：{{member.discount}}</span><span>余额：{{member.memberBalance}}</span></p>
				</div>
				<div class='cartContainer'>
					<table class='cartTable'>
						<thead>
							<tr>
								<th>商品名称</th>
								<th>数量</th>
								<th>单价</th>
								<th>小计</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in cartList">
								<td>{{item.goodsName}}</td>
								<td>
									<el-input-number size="mini" v-model="item.goodsNum" :min='1'></el-input-number>
								</td>
								<td>{{item.goodsPrice}}</td>
								<td>{{item.goodsNum*item.goodsPrice}}</td>
								<td><el-button type="danger" size='mini'>删除</el-button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class='cartBottom'>
				<p>总价：<span class='cartTotal'>500</span></p>
				<el-button type="warning" size='medium '>结账</el-button>
			</div>
  	</div>
  	<div class='mainRight'>
  		<el-input
			  placeholder="请输入商品编号/名称"
			  prefix-icon="el-icon-search"
			  size="small"
			  v-model="goodsFindInput"
			>
			</el-input>
			<ul class="classifyList">
				<li v-for="classify in classifys">
			    <el-dropdown>
			      <span class="el-dropdown-link" @click="getGoodsByClassify(classify.classifyP)">
			        {{classify.classifyP}}<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			      	<span v-for="classifyC in classify.classifyC" @click="getGoodsByClassify(classifyC.classifyName)">
			      		<el-dropdown-item>{{classifyC.classifyName}}</el-dropdown-item>
			      	</span>
			        
			      </el-dropdown-menu>
			    </el-dropdown>
				</li>
			</ul>
		  <ul class='goodsList'>
		  	<li v-for="good in goodsList">
		  			<img v-lazy="good.goodsImg"/>
		  			<p class='goodsName' :title='good.goodsName'>{{good.goodsName}}</p>
		  			<p>￥:<span class='goodsPrice'>{{good.goodsOut}}</span></p>
		  	</li>
		  </ul>
  	</div>
  </div>
</template>

<script>
	import NavHeader from '../components/NavHeader'
  export default {
  	data() {
  		return {
  			memnerFindInput: '',    ///////查询会员关键字
  			allMember: [],   //////所有会员
        timeout:  null,   /////会员查询间隔
  			goodsFindInput: '',     //////查询商品关键字
  			member: {},   ///////选中会员
  			classifys: [],     //////商品分类列表
  			cartList: [    /////购物车列表
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			}
  			],
  			goodsList: [
  			{
  				goodsPic: 'goods.png',
  				goodsName: '球衣aaaaaaaaaaaaaa',
  				goodsPrice: 50.5
  			},
  			{
  				goodsPic: 'goods.png',
  				goodsName: '球衣aaaaaaaaaaaaaa',
  				goodsPrice: 50.5
  			},
  			{
  				goodsPic: 'goods.png',
  				goodsName: '球衣aaaaaaaaaaaaaa',
  				goodsPrice: 50.5
  			}
  			]
  		}
  	},
  	components: {
    	NavHeader
   	},
  	computed:{
  		
  	},
  	methods: {
  		/////////////////处理会员查询
  		querySearchAsync(queryString, cb) {
        var restaurants = this.allMember;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString) === 0);
        };
      },
      handleSelect(item) {  /////选中会员
      	let params = {
      		memberCard: item.value
      	}
        this.$http.get('/cashier/getMember', {params})
		   	.then(res => {
		   		res = res.data
		   		if (res.status == '1') {
		   			this.member = res.result
		   			this.member.discount = res.discount
		   		}
		   	})
      },
      getAllMember() {  ////////获取所有会员
      	this.$http.get('/members/all')
		   	.then(res => {
		   		res = res.data
		   		if (res.status == '1') {
		   			res.result.list.forEach(item => {
		   				let newMember = {
		   					"value": item.memberCell
		   				}
		   				this.allMember.push(newMember)
		   			})
		   		}
		   	})
      },
      getAllClassify() {  //////获取所有商品分类
      	this.$http.get('/cashier/allClassify')
		   	.then(res => {
		   		res = res.data
		   		if (res.status == '1') {
		   			this.classifys = res.result
		   		}
		   	})
      },
      getGoodsByClassify(classifyName) {
      	let params = {
      		classifyName
      	}
      	this.$http.get('/cashier/getGoodsByClassify', {params})
      	.then(res => {
      		res = res.data
      		if (res.status == '1') {
		   			this.goodsList = res.result
		   		}
      	})
      }
  	},
  	mounted() {
  		this.getAllMember()
  		this.getAllClassify()
  	}
		
  }
</script>

<style>
	.mainLeft{
		width: 40%;
		position: absolute;
		left: 0;
		top: 60px;
		bottom: 0;
		padding: 0 10px;
		box-sizing: border-box;
		border-right: 1px solid #DCDFE6;
	}
	.memberInfo{
		border-bottom: 1px solid #CCCCCC;
		padding-bottom: 10px;
	}
	.memberInfo p{
		font-size: 14px;
		display: flex;
		justify-content: space-around;
	}
	.cart{
		position: absolute;
		top: 40px;
		bottom: 100px;
		left: 10px;
		right: 10px;
	}
	.cartContainer{
		position: relative;
		width: 100%;
		height: 99%;
		overflow-y: auto;
	}
	.cartTable{
		width: 100%;
		text-align: center;
	}
	.cartTable thead{
		font-weight: 800;
	}
	.cartTable tr{
		line-height: 40px;
	}
	.cartBottom{
		width: 90%;
		position: absolute;
		bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.cartTotal{
		font-size: 30px;
		color: #FF0000;
	}
	
	.mainRight{
		position: absolute;
		left: 40%;
		right: 0;
		top: 60px;
		bottom: 0;
		padding: 0 10px;
	}
	.goodsList{
		position: absolute;
		left: 0;
		right: 0;
		top: 75px;
		bottom: 0;
		padding: 10px;
		overflow-y: auto;
	}
	.goodsList li{
		width: 25%;
		box-sizing: border-box;
		padding: 20px;
		float: left;
	}
	.goodsList li img{
		width: 100%;
		height: 80px;
	}
	.goodsName{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.goodsPrice{
		font-size: 20px;
		color: #FF0000;
	}
	.classifyList{
		display: flex;
		overflow-x: auto;
	}
	.classifyList li{
		line-height: 30px;
		padding: 0 10px;
	}
	.classifyList li span{
		font-size: 16px;
		cursor: pointer;
	}
</style>