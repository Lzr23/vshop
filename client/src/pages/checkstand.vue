<template>
  <div>
  	<el-header>
      <nav-header></nav-header>
    </el-header>
  	<div class='mainLeft'>
  		<el-input
			  placeholder="请输入会员姓名/手机号"
			  prefix-icon="el-icon-search"
			  size="small"
			  v-model="memnerFindInput"
			  clearable>
			</el-input>
			<div class='cart'>
				<div class='memberInfo'>
					<p><span>会员姓名</span><span>手机号</span></p>
					<p><span>折扣：7折</span><span>余额：300</span></p>
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
			  clearable>
			</el-input>
			<el-tabs v-model="classifyId" @tab-click="handleClick">
		    <el-tab-pane label="用户管理" name="c1"></el-tab-pane>
		    <el-tab-pane label="配置管理" name="c2"></el-tab-pane>
		    <el-tab-pane label="角色管理" name="c3"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c4"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c5"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c6"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c7"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c8"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c9"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c10"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c11"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c12"></el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="c13"></el-tab-pane>
		  </el-tabs>
		  <ul class='goodsList'>
		  	<li v-for="good in goodsList">
		  			<img v-lazy="'/static/'+good.goodsPic"/>
		  			<p class='goodsName' :title='good.goodsName'>{{good.goodsName}}</p>
		  			<p>￥:<span class='goodsPrice'>{{good.goodsPrice}}</span></p>
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
  			memnerFindInput: '',
  			goodsFindInput: '',
  			classifyId: 'c1',
  			cartList: [
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
	  			{
	  				goodsName: '球衣',
	  				goodsNum: 2,
	  				goodsPrice: 50.5
	  			},
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
  	computed:{
  		
  	},
  	methods: {
  		handleClick(tab, event) {
        console.log(tab, event);
      }
  	},
		components: {
    	NavHeader
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
</style>