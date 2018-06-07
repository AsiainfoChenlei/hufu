<template>
<div class="grade">
	<div class="title">
		<div class="text">
			{{strategyPhaseInfo.name}}
		</div>
	</div>
	<ScoreCard
		v-for="(score, index) in recordStrategy"
		:key="index"
		:index="index"></ScoreCard>
	<div class="allScore">
		<div 
			class="see-detail"
			@click="goSeeDetail">
			查看相关话术{{strategyPhaseInfo.fileName}}
		</div>
		<span class="key">执行总得分</span>
		<span class="value">
			{{totalScore}}
		</span>
	</div>
	<!-- 原相关话术位置 -->
	<!-- 流程完整度的表单 -->
	<Comprehensive></Comprehensive>
	<!-- 违规消息记录 -->
	<!-- <IllegalList></IllegalList> -->
	<!-- 是否扣流水、评价 -->
	<!-- <Evaluate></Evaluate> -->
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import ScoreCard from './ScoreCard'
import Comprehensive from './Comprehensive'
// import Evaluate from './Evaluate'
// import IllegalList from './IllegalList'
import { verbalTrickDownload } from '@/api/player'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('player', [
      'recordStrategy',
      'strategyPhaseInfo',
      'strategyPhaseId',
      'strategyPhaseName',
      'totalScore'
    ])
  },
  methods: {
    goSeeDetail() {
      if (this.strategyPhaseInfo.strategyPhaseId) verbalTrickDownload([this.strategyPhaseInfo.strategyPhaseId])
    }
  },
  components: {
    ScoreCard,
    Comprehensive
    // Evaluate,
    // IllegalList
  }
}
</script>
<style lang="scss" scoped>
.tit {
	font-size: 14px;
	color: #cacaca;
	margin: 5px;
}

span {
	font-size: 14px !important;
	overflow: hidden;
}
table {
	text-align: center;
	th {
		background-color: #f8f8f8;
		border: 1px solid #fff;
		padding: 5px 0;
	}
	td {
		background-color: #fefcfa;
		border: 1px solid #fff;
		padding: 5px 0;
	}
}
.grade {
	h3 {
		font-size: 24px;
		height: 30px;
		line-height: 30px;
		font-weight: 700;
		margin-bottom: 30px;
	}
	.title {
		width: 100%;
		position: relative;
		border-top: 2px solid #efefef;
		height:30px;
		margin-bottom: 30px;
		.text {
			height: 100%;
			padding: 0 4px;
			font-size: 14px;
			font-weight: 700;
			line-height: 28px;
			color: #f79300;
			position: absolute;
			top: -2px;
			border-top: 2px solid #f79300;
		}
	}
	.content {
		height: 170px;
		padding-top: 0px;
		.line-item {
			height: 50px;
		}
	}
	.see-detail{
		color: #f79300;
		font-size: 14px;
		cursor: pointer;
		text-decoration: underline;
		display: inline-block;
		float: left;
		line-height: 55px;
	}
	.mark {
		.info {
			display: flex;
			height: 50px;
			margin-top: 30px;
			.item {
				flex: 0.25;
			}
		}
	}
	.allScore{
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
		.key{
			font: 16px '微软雅黑' !important;
		}
		.value{
			margin-left: 16px;
			width: 120px;
			height: 35px;
			display: inline-block;
			text-align: center;
			color: #fbd493;
			line-height: 30px;
			border-bottom: 2px solid rgb(239, 239, 239);
			font-size: 20px !important;
		}
	}
}
</style>


