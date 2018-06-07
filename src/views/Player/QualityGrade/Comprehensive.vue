<template>
<div class="finalbox">
	<div class="final">
		<div class="item bg_color">
			<span class="key start_tag">流程完整度</span>
      <!-- 原下拉选项 -->
			  <!-- <el-select :disabled="operationLock" v-model="finishNum" placeholder="请选择" size='mini'>
					<el-option
						v-for="(item, index) in finishNumValue"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>	 -->
      <el-radio-group v-model="finishNum">
        <el-radio v-for="item in finishNumValue" :disabled="operationLock" :key="item.id" :label="item.id">{{item.name}}</el-radio>
      </el-radio-group>
		</div>
    <!-- 原总得分的统计		 -->
		<!-- <div class="item">
			<span class="key">执行总得分</span>
			<span class="value">
				{{totalScore}}
			</span>
		</div> -->
    <!-- 下面是问号的内容 -->
    <!-- <el-tooltip placement="top">
      <div slot="content" class="satiscont">
        <i class="el-icon-star-on"></i>：[毫无帮助] [态度恶劣] [一问三不知] [答非所问] [不回话] [经常骚扰]<br><br>
        <i class="el-icon-star-on"></i><i class="el-icon-star-on"></i>：[基本解决问题] [态度平淡] [解答不太清楚] [专业知识一般] [回复不及时]<br><br>
        <i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i>：[基本解决问题] [态度可以] [解答清楚] [专业知识可以] [回复及时]<br><br>
        <i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i>：[很好解决问题] [态度很好] [解答清楚] [专业知识熟练] [回复迅速] [耐心细致]<br><br>
        <i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i>：[完美解决问题] [热情礼貌] [解答非常清楚] [专业非常熟练] [秒速回复] [声音好听] [耐心细致]<br>
        </div>
      <el-button size="mini" style="border:none;" class="tooltip"><i class="el-icon-question"></i></el-button>
    </el-tooltip> -->
    <div class="item bg_color">
			<span class="key start_tag">用户满意度</span>
        <!-- 原下拉列表 -->
			  <!-- <el-select :disabled="operationLock" v-model="satisfactionNum" placeholder="请选择" size='mini'>
					<el-option
						v-for="(item, index) in satisfiedValue"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select> -->
        <el-rate
        v-model="satisfactionNum"
        :disabled="operationLock"
        :allow-half='false'
        text-color="#f73900">
      </el-rate>
		</div>
	</div>
  <div class="final">
		<div class="item bg_color">
			<div class="isgood_quality">
        <span class="key start_tag">是否优秀录音</span>
        <!-- 原下拉选项 -->
			  <!-- <el-select 
          v-model="isGood" 
          placeholder="请选择" 
          size='mini'
          :disabled="cantGood || operationLock">
					<el-option
						v-for="(item, index) in isGoodValue"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select> -->
        <el-radio-group v-model="isGood">
        <el-radio
        v-for="item in isGoodValue"
        :disabled="cantGood || operationLock"
        :key="item.id"
        :label="item.id">{{item.name}}</el-radio>
      </el-radio-group>
      </div>
      <div class="goodType" v-if="+isGood">
			<span class="key">优秀类型</span>
			  <el-select 
          v-model="goodType" 
          placeholder="请选择" 
          :disabled="operationLock"
          size='mini'>
					<el-option
						v-for="(item, index) in goodTypeValue"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
		</div>
		</div>	
		<!-- 原是否优秀录音占位 -->
	</div>
  <div class="final bg_color_profession">
    <div class="item">
			<span class="key">咨询师专业度</span>
			  <el-select v-model="professionalDegreeNumOne" :disabled="operationLock" placeholder="请选择" size='mini'>
					<el-option
						v-for="(item, index) in majordegreeValue"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
		</div>	
    <div class="item"  v-if="+professionalDegreeNumOne">
			<span class="key">业务知识</span>
			  <el-select v-model="professionalDegreeNumTwo" :disabled="operationLock" placeholder="请选择" size='mini'>
					<el-option
						v-for="(item, index) in majordegreeValue1"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
		</div>	
    <div class="item" v-if="+professionalDegreeNumOne">
			<span class="key">沟通能力</span>
			  <el-select v-model="professionalDegreeNumThree" :disabled="operationLock" placeholder="请选择" size='mini'>
					<el-option
						v-for="(item, index) in majordegreeValue2"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
		</div>
      <!-- 原销售技巧占位 -->
    <div class="professionalDegreeNumFour"  v-if="+professionalDegreeNumOne">
			<span class="key">销售技巧</span>
			  <el-select v-model="professionalDegreeNumFour" :disabled="operationLock" placeholder="请选择" size='mini'>
					<el-option
						v-for="(item, index) in majordegreeValue3"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
		</div>  
	</div>
  
  <!-- 下面是评价框 -->
    <div class="pingjia_score">
		 <div class="title">
			<div class="text">
				评价
			</div>
		</div>
		<div class="area-wrapper">
		<el-input
			type="textarea"
			:rows="4"
			placeholder="请输入内容"
			:disabled="operationLock"
			v-model="comment">
		</el-input>
		</div>
		<!-- <div class="line"></div> -->
		</div>
</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/modules/player/actionTypes'
import { satisfied, majordegree, majordegree1, majordegree2, majordegree3 } from '../../../api/player'
export default {
  data() {
    return {
      cantGood: false
    }
  },
  computed: {
    ...mapGetters('player', [
      'isCurrentBad',
      'totalScore',
      'isGoodValue',
      'goodTypeValue',
      'finishNumValue',
      'operationLock',
      'satisfiedValue',
      'majordegreeValue',
      'majordegreeValue1',
      'majordegreeValue2',
      'majordegreeValue3'
    ]),
    comment: {  //  评价内容
      get() {
        return this.$store.state.player.comment
      },
      set(value) {
        this[types.HANDLE_EVALUATE](value)
      }
    },
    finishNum: {
      get() {
        return this.$store.state.player.finishNum
      },
      set(value) {
        this[types.SET_FINISHNUM](value)
      }
    },
    satisfactionNum: {
      get() {
        return this.$store.state.player.satisfactionNum
      },
      set(value) {
        this[types.SET_SATISFACTIONNUM](value)
      }
    },
    professionalDegreeNumOne: {
      get() {
        let res
        if (this.$store.state.player.professionalDegreeNumOne || this.$store.state.player.professionalDegreeNumOne === 0) {
          res = '' + this.$store.state.player.professionalDegreeNumOne
        } else {
          res = ''
        }
        return res
      },
      set(value) {
        this[types.SET_PROFESSIONALDEGREENUMONE](value)
      }
    },
    professionalDegreeNumTwo: {
      get() {
        let res
        if (this.$store.state.player.professionalDegreeNumTwo) {
          res = '' + this.$store.state.player.professionalDegreeNumTwo
        } else {
          res = ''
        }
        return res
      },
      set(value) {
        this[types.SET_PROFESSIONALDEGREENUMTWO](value)
      }
    },
    professionalDegreeNumThree: {
      get() {
        let res
        if (this.$store.state.player.professionalDegreeNumThree) {
          res = '' + this.$store.state.player.professionalDegreeNumThree
        } else {
          res = ''
        }
        return res
      },
      set(value) {
        this[types.SET_PROFESSIONALDEGREENUMTHREE](value)
      }
    },
    professionalDegreeNumFour: {
      get() {
        let res
        if (this.$store.state.player.professionalDegreeNumFour) {
          res = '' + this.$store.state.player.professionalDegreeNumFour
        } else {
          res = ''
        }
        return res
      },
      set(value) {
        this[types.SET_PROFESSIONALDEGREENUMFOUR](value)
      }
    },
    isGood: {
      get() {
        return this.$store.state.player.isGood
      },
      set(value) {
        this[types.SET_ISGOOD](value)
      }
    },
    goodType: {
      get() {
        return this.$store.state.player.goodType
      },
      set(value) {
        this[types.SET_GOODTYPE](value)
      }
    }
  },
  watch: {
    isCurrentBad() {
      if (this.isCurrentBad) {
        this.cantGood = true
        this.isGood = '0'
      } else {
        this.cantGood = false
      }
    }
  },
  mounted() {
    if (this.isCurrentBad) {
      this.cantGood = true
    } else {
      this.cantGood = false
    }
    satisfied()
        .then(res => { // 用户满意度
          this.satislist = res.result
        })
    majordegree()
        .then(res => { // 咨询师专业度
          this.majorlist = res.result
        })
    majordegree1()
        .then(res => { // 咨询师专业度
          this.majorlist1 = res.result
        })
    majordegree2()
        .then(res => { // 咨询师专业度
          this.majorlist2 = res.result
        })
    majordegree3()
        .then(res => { // 咨询师专业度
          this.majorlist3 = res.result
        })
  },
  methods: {
    ...mapMutations('player', [
      types.SET_FINISHNUM,
      types.SET_GOODTYPE,
      types.SET_ISGOOD,
      types.SET_SATISFACTIONNUM,
      types.SET_PROFESSIONALDEGREENUMONE,
      types.SET_PROFESSIONALDEGREENUMTWO,
      types.SET_PROFESSIONALDEGREENUMTHREE,
      types.SET_PROFESSIONALDEGREENUMFOUR,
      types.HANDLE_EVALUATE
    ])
  }
}
</script>
<style lang="scss" scoped>
.title {  //  评价框样式
		width: 100%;
		position: relative;
		border-top: 2px solid #efefef;
		height:30px;
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
	.area-wrapper {
		margin-top: 10px;
		width: 80%;
		margin-bottom: 104px;
	}
.tooltip:hover{
    background: #ffffff;
}
.tooltip:focus{
    background: #ffffff;
}
.satiscont{
  width: 200px;
}
.final {
	// margin: 30px 0 35px;
	// display: flex;
	.item {
		// flex: 0.25;
		// display: flex;
    // height: 42px;
    line-height: 42px;
		align-items: center;
		.key {
			// width: auto;
      display: inline-block;
      width: 100px;
			padding-right: 10px;
      text-align: right;
      margin-right: 2px;
		}
		.value {
			flex: 0.8
		}
    .el-rate{
      display: inline-block;
    }
	}
  .goodType{
    font-size: 12px;
  }
}
.final:nth-of-type(3){
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  .item{
    // width: 33.33%;
    line-height: 42px;
  }
  .professionalDegreeNumFour{
    line-height: 42px;
    .key{
      display: inline-block;
      padding-right: 10px;
      width: 100px;
      text-align: right;
      margin-right: 2px;
    }
  }
}
.bg_color:nth-of-type(odd){
  background: #f8f8f8;
}
.bg_color:nth-of-type(even){
  background: #FEFCFA;
}
.bg_color_profession{
  background: #FEFCFA;
}
.start_tag::after{
    content: "*";
    color: #f56c6c;
    line-height: 21px;
    vertical-align: middle;
    padding: 5px 0px 0px 0px;
    display: inline-block;
}
</style>

