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
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="stockNo" label="单号"></el-table-column>
        <el-table-column prop="stockGoodsNo" label="商品编号"></el-table-column>
        <el-table-column prop="stockGoodsName" label="商品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stockGoodsIn" label="商品进价"></el-table-column>
        <el-table-column prop="stockGoodsQuantity" label="进货数量"></el-table-column>
        <el-table-column prop="stockGoodsTotal" label="合计"></el-table-column>
        <el-table-column prop="stockInTime" label="进货时间"></el-table-column>
        <el-table-column prop="stockWarehouse" label="入库仓库"></el-table-column>
        </el-table-column>
    </el-table>
    <div class="myPagination">
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        findContent: '',  ////搜索内容
        tableData: [{   ////表格数据
              stockNo: '20180304',
              stockGoodsNo: '546171115',
              stockGoodsName: '休闲裤',
              stockGoodsIn: 100,
              stockGoodsQuantity: 20,
              stockGoodsTotal: 2000,
              stockInTime: '2018-03-12',
              stockWarehouse: '1号'
            }, {
              stockNo: '20180304',
              stockGoodsNo: '546171115',
              stockGoodsName: '休闲裤',
              stockGoodsIn: 100,
              stockGoodsQuantity: 20,
              stockGoodsTotal: 2000,
              stockInTime: '2018-03-12',
              stockWarehouse: '1号'
            }, {
              stockNo: '20180304',
              stockGoodsNo: '546171115',
              stockGoodsName: '休闲裤',
              stockGoodsIn: 100,
              stockGoodsQuantity: 20,
              stockGoodsTotal: 2000,
              stockInTime: '2018-03-12',
              stockWarehouse: '1号'
            }, {
              stockNo: '20180304',
              stockGoodsNo: '546171115',
              stockGoodsName: '休闲裤',
              stockGoodsIn: 100,
              stockGoodsQuantity: 20,
              stockGoodsTotal: 2000,
              stockInTime: '2018-03-12',
              stockWarehouse: '1号'
            }, {
              stockNo: '20180304',
              stockGoodsNo: '546171115',
              stockGoodsName: '休闲裤',
              stockGoodsIn: 100,
              stockGoodsQuantity: 20,
              stockGoodsTotal: 2000,
              stockInTime: '2018-03-12',
              stockWarehouse: '1号'
            }, {
              stockNo: '20180304',
              stockGoodsNo: '546171115',
              stockGoodsName: '休闲裤',
              stockGoodsIn: 100,
              stockGoodsQuantity: 20,
              stockGoodsTotal: 2000,
              stockInTime: '2018-03-12',
              stockWarehouse: '1号'
            }, {
              stockNo: '20180304',
              stockGoodsNo: '546171115',
              stockGoodsName: '休闲裤',
              stockGoodsIn: 100,
              stockGoodsQuantity: 20,
              stockGoodsTotal: 2000,
              stockInTime: '2018-03-12',
              stockWarehouse: '1号'
            }],
            multipleSelection: []
      }
    },
    methods:{
      handleSelectionChange(val) {
          this.multipleSelection = val;
        }
    }
  }
</script>

<style></style>