<template>
<div class="score-card-wrapper">
	<table class="table-from">
			<tr>
				<th class="thead" width="80%">{{recordStrategy[index].scoreName}}</th>
				<th class="thead" width="20%">策略执行打分</th>
			</tr>
			<tr v-for="(item, i) in recordStrategy[index].recordStrategyScores" :key="i">
				<td style="text-align: left;padding-left: 80px;">
					{{item.name}} 
				</td>
				<td class="toggle-greade">
					<el-radio-group :disabled="operationLock" v-model="item.isSelect" @change="handleChange(item)">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</td>
			</tr>
	</table>
	<div class="total-score">
		<span>总得分</span>
		<div class="total-grade">{{recordStrategy[index].score}}</div>
	</div>
</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/modules/player/actionTypes'
export default {
  name: 'ScoreCard',
  data() {
    return {
    }
  },
  props: ['index'],
  computed: {
    ...mapGetters('player', [
      'recordStrategy',
      'operationLock'
    ])
  },
  mounted() {
    this[types.MARK]()
  },
  methods: {
    ...mapMutations('player', [
      types.MARK
    ]),
    handleChange(item) {
      this[types.MARK]()
    }
  },
  filters: {
    totalScore(value) {
    }
  }
}
</script>
<style lang="scss" scoped>
table {
	text-align: center;				
	th {
		border: none;
		border-right: 1px solid #fff;
		padding: 5px 0;
	}
	td {
		border: none;
		border-right: 1px solid #fff;
		// padding: 5px 0; 
		color: #201e1c;
		height: 30px;
		font-size: 14px;
		line-height: 30px;
		padding-left: 30px !important;
	}
	.thead{
		height: 42px;
		font-size: 16px;
		color: #201e1c;
		line-height: 42px;
		padding: 0px;
	}
}
.score-card-wrapper {
		position: relative;
		margin-bottom: 30px;
		.table-from {
			margin-bottom: 12px;
			width: 100%; 
			padding-bottom: 20px;
			&>:nth-child(odd) {
				background-color: #f8f8f8;
			}	
			&>:nth-child(even) {
				background-color: #fefcfa;
			}
			.toggle-greade {
				vertical-align: middle;
			}	
		}
		.total-score {
			width: 100%;
			text-align: right;
			font-size: 14px;
			margin-bottom: 20px;
			// position: absolute;
			// bottom: -20px;
			// right: 10px;
		}
		.total-grade {
			color: #fbd493;
			width: 120px;
			height: 35px;
			font-size: 20px;
			text-align: center;
			border-bottom: 2px solid #efefef;
			display: inline-block;
			vertical-align: text-bottom;
			margin-left: 18px;
		}
}
</style>
