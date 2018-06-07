<template>
	<div class="record">
		<h3>
		质检信息表
		</h3>
		<div class="left">
			违规消息记录
		</div>
		<ul class="right" v-if="errorsList.length > 0" >
			<li  v-for="(item, index) in errorsList" :key="index">
				{{item.badTime | time}} &nbsp;&nbsp; {{item.detail}} 
			</li>
		</ul>
		<ul class="right" v-else>
			<li>
				暂无违规数据
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('player', [
      'errorsList'
    ])
  },
  filters: {
    time(value) {
      var length = Math.floor(value)
      var minute = Math.floor(value / 60)
      minute = ('' + minute).padStart(2, '0')
      var second = length % 60
      second = ('' + second).padStart(2, '0')
      return minute + ':' + second
    }
  },
  mounted() {
    // window.console.log('质检列表errorsList', this.errorsList)
  }
}
</script>
<style lang="scss" scoped>
.record {
	overflow: hidden;
	margin-bottom: 80px;
	// display: flex;
	width: 80%;
	h3 {
		font-size: 24px;
		height: 30px;
		line-height: 30px;
		font-weight: 700;
		margin-bottom: 30px;
	}
	.left {
		width: 110px;
		color: #b9b9b9;
		float: left;
	}
	.right {
		float: left;
		height: auto;
		// flex: 1;
		width: 85%;
		background: #f8f8f8;
		position: relative;
		box-sizing: border-box;
		margin: 0;
		padding: 30px 0px;
		min-height: 20px;
		.item {
			color: #b8b8b8;
		}
		.pack-up {
			position: absolute;
			right: 20px;
			bottom: 10px;
			color: #f79300;
			position: absolute;
			right: 10px;
			bottom: 2px;
		}
	}
}
</style>

