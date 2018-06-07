<template>
	<div class="save-footer">
		<!-- <el-button 
			type="warning"
			@click="PREV"
			plain>
				上一个
		</el-button>
		<el-button
			type="warning" 
			@click="NEXT">
				下一个
		</el-button> -->
		<div class="btn btn-prev" @click="HANDLE_PREV(DetailsType)">上一个</div>
		<div class="btn btn-next" @click="HANDLE_NEXT(DetailsType)">下一个</div>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as types from '@/store/modules/player/actionTypes'

export default {
  methods: {
    ...mapActions('player', [
      types.HANDLE_NEXT,
      types.HANDLE_PREV
    ]),
    ...mapMutations('player', [
      types.SET_DETAILSTYPE
    ])
  },
  props: ['DetailsType'],
  mounted() {
    this[types.SET_DETAILSTYPE](this.DetailsType)
  }
}
</script>

<style lang="scss" scoped>
.save-footer {
	display: flex;
	justify-content: center;
	.btn {
		width: 216px;
		height: 46px;
		line-height: 46px;
		text-align: center;
		border-radius: 5px;
		letter-spacing: 2px;
		cursor: pointer;
		user-select: none;
	}
	.btn-prev {
		border: 1px solid #f79300;
		background-color: #fff7ef;
		color: #f9a122;
		&:hover {
			background-color: #f79300;
			color: #fff;
			box-shadow: 0 0 5px #aaa;
		}
		&:active {
			background-color: goldenrod;
		}
	}
	.btn-next {
		margin-left: 36px;
		background-color: #f79300;
		color: #fff;
		&:active {
			background-color: goldenrod;
		}
	}
}
</style>


