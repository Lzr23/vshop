<template>
  <div>
    <div class="table-function">
      <el-button type="primary" plain size='small'>新增</el-button>
      <el-button type="primary" plain size='small'>修改</el-button>
      <el-button type="primary" plain size='small'>删除</el-button>
    </div>
    <div class="table-search">
      <el-input placeholder="输入仓库名称/编码" prefix-icon="el-icon-search" v-model="findContent"></el-input>
      <el-button type="primary" plain size='small'>查询</el-button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="warehouseNo" label="编码"></el-table-column>
        <el-table-column prop="warehouseName" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="warehouseManager" label="管理员"></el-table-column>
        <el-table-column prop="warehouseCell" label="联系电话"></el-table-column>
        <el-table-column prop="warehouseAddress" label="仓库地址"></el-table-column>
        <el-table-column prop="warehouseStatus" label="状态"></el-table-column>
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
              warehouseNo: '20182452',
              warehouseName: '中心仓库',
              warehouseManager: '小李',
              warehouseCell: 1384215601,
              warehouseAddress: '长沙望城',
              warehouseStatus: '正常'
            }, {
              warehouseNo: '20182452',
              warehouseName: '中心仓库',
              warehouseManager: '小李',
              warehouseCell: 1384215601,
              warehouseAddress: '长沙望城',
              warehouseStatus: '正常'
            }, {
              warehouseNo: '20182452',
              warehouseName: '中心仓库',
              warehouseManager: '小李',
              warehouseCell: 1384215601,
              warehouseAddress: '长沙望城',
              warehouseStatus: '正常'
            }, {
              warehouseNo: '20182452',
              warehouseName: '中心仓库',
              warehouseManager: '小李',
              warehouseCell: 1384215601,
              warehouseAddress: '长沙望城',
              warehouseStatus: '正常'
            }, {
              warehouseNo: '20182452',
              warehouseName: '中心仓库',
              warehouseManager: '小李',
              warehouseCell: 1384215601,
              warehouseAddress: '长沙望城',
              warehouseStatus: '正常'
            }, {
              warehouseNo: '20182452',
              warehouseName: '中心仓库',
              warehouseManager: '小李',
              warehouseCell: 1384215601,
              warehouseAddress: '长沙望城',
              warehouseStatus: '正常'
            }, {
              warehouseNo: '20182452',
              warehouseName: '中心仓库',
              warehouseManager: '小李',
              warehouseCell: 1384215601,
              warehouseAddress: '长沙望城',
              warehouseStatus: '正常'
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