<template>
  <div>
    <div class="table-function">
      <el-button type="primary" plain size='small'>新增</el-button>
      <el-button type="primary" plain size='small'>上架</el-button>
      <el-button type="primary" plain size='small'>下架</el-button>
      <el-button type="primary" plain size='small'>修改</el-button>
      <el-button type="primary" plain size='small'>删除</el-button>
    </div>
    <div class="table-search">
      <el-input placeholder="输入产品名称/编码" prefix-icon="el-icon-search" v-model="findContent"></el-input>
      <el-button type="primary" plain size='small'>查询</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="goodsNo" label="编码"></el-table-column>
      <el-table-column prop="goodsName" label="名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsClassify" label="分类"></el-table-column>
      <el-table-column prop="goodsIn" label="进价"></el-table-column>
      <el-table-column prop="goodsOut" label="售价"></el-table-column>
      <el-table-column prop="goodsStatus" label="状态"></el-table-column>
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
          findContent: '', ////搜索内容
          tableData: [{ ////表格数据
            goodsNo: '20182452',
            goodsName: '男士无敌帅气休闲裤',
            goodsClassify: '休闲裤',
            goodsIn: 50,
            goodsOut: 100,
            goodsStatus: '正常'
          }, {
            goodsNo: '20182452',
            goodsName: '男士无敌帅气休闲裤',
            goodsClassify: '休闲裤',
            goodsIn: 50,
            goodsOut: 100,
            goodsStatus: '正常'
          }, {
            goodsNo: '20182452',
            goodsName: '男士无敌帅气休闲裤',
            goodsClassify: '休闲裤',
            goodsIn: 50,
            goodsOut: 100,
            goodsStatus: '正常'
          }, {
            goodsNo: '20182452',
            goodsName: '男士无敌帅气休闲裤',
            goodsClassify: '休闲裤',
            goodsIn: 50,
            goodsOut: 100,
            goodsStatus: '正常'
          }, {
            goodsNo: '20182452',
            goodsName: '男士无敌帅气休闲裤',
            goodsClassify: '休闲裤',
            goodsIn: 50,
            goodsOut: 100,
            goodsStatus: '正常'
          }, {
            goodsNo: '20182452',
            goodsName: '男士无敌帅气休闲裤',
            goodsClassify: '休闲裤',
            goodsIn: 50,
            goodsOut: 100,
            goodsStatus: '正常'
          }, {
            goodsNo: '20182452',
            goodsName: '男士无敌帅气休闲裤',
            goodsClassify: '休闲裤',
            goodsIn: 50,
            goodsOut: 100,
            goodsStatus: '正常'
          }],
          multipleSelection: []
        }
      },
      methods: {
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
      }
  }
</script>

<style></style>