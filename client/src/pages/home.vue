<template>
  <div class="homeContainer">
    <ul class="todayCount">
      <li>
        <div class="todayTotal">
          <p>今日收入</p>
          <h1>65450<span>元</span></h1>
        </div>
        <ul class="todayDetail">
          <li>
            <p>现金</p>
            <p>1200</p>
          </li>
          <li>
            <p>银行卡</p>
            <p>6800</p>
          </li>
          <li>
            <p>储蓄卡</p>
            <p>1200</p>
          </li>
          <li>
            <p>微信</p>
            <p>5850</p>
          </li>
          <li>
            <p>支付宝</p>
            <p>6840</p>
          </li>
          <li>
            <p>优惠券</p>
            <p>500</p>
          </li>
          <li>
            <p>其他</p>
            <p>0</p>
          </li>
        </ul>
      </li>

      <li>
        <div class="todayTotal">
          <p>会员总数</p>
          <h1>3000<span>人</span></h1>
        </div>
        <ul class="todayDetail">
          <li>
            <p>今日新增</p>
            <p>10</p>
          </li>
          <li>
            <p>昨日新增</p>
            <p>20</p>
          </li>
        </ul>
      </li>

      <li>
        <div class="todayTotal">
          <p>今日消费收入</p>
          <h1>65450<span>元</span></h1>
        </div>
        <ul class="todayDetail">
          <li>
            <p>会员消费</p>
            <p>41650</p>
          </li>
          <li>
            <p>散客消费</p>
            <p>25120</p>
          </li>
        </ul>
      </li>
    </ul>
    <div class="theYear" ref='theYear'></div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
          option: {
            title: {
              text: '今年销售走势'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['总销售收入金额', '毛利润']
            },
            xAxis: {
              axisLabel: {
                textStyle: {
                  fontSize: 16
                }
              },
              data: ['一季度', '二季度', '三季度', '四季度']
            },
            yAxis: {},
            series: [{
              name: '总销售收入金额',
              type: 'line',
              data: [2000, 5000, 2462, 3034],
              smooth: false
            }, {
              name: '毛利润',
              type: 'line',
              data: [3000, 3210, 5874, 4345],
              smooth: false
            }]
          }
        }
      },
      mounted() {
        this.setEchart()
      },
      methods: {
        setEchart() {
          let theYear = this.$echarts.init(this.$refs.theYear)
          theYear.setOption(this.option)
        }
      }
  }
</script>

<style>
  .homeContainer {
    padding: 20px 40px 0 40px;
  }
  
  .todayCount {
    display: flex;
    justify-content: space-between;
  }
  
  .todayCount>li {
    width: 30%;
    height: 170px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
  }
  
  .todayCount>li:nth-child(1) {
    background: #00d093;
  }
  
  .todayCount>li:nth-child(2) {
    background: #ea68a2;
  }
  
  .todayCount>li:nth-child(3) {
    background: #13b5b1;
  }
  
  .todayTotal {
    width: 100%;
    height: 100px;
    color: #FFFFFF;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
  }
  
  .todayTotal p {
    font-size: 16px;
    margin: 0;
  }
  
  .todayTotal h1 {
    font-size: 54px;
    text-align: center;
    padding: 0;
  }
  
  .todayTotal h1 span {
    font-size: 26px;
    margin-left: 10px;
  }
  
  .todayDetail {
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #FFFFFF;
  }
  
  .todayDetail>li p {
    color: #808080;
    margin: 0;
    text-align: center;
    font-size: 12px;
  }
  
  .theYear {
    width: 100%;
    height: 380px;
    margin-top: 40px;
  }
</style>