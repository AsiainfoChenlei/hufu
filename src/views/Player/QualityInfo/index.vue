<template>
<div class="quality-info">
	<h3>虎符信息表</h3>
	<!-- 学员信息 -->
	<div class="studentData">
		<span>适用军团：<i>{{strategyPhaseInfo.groupName}}</i></span>
		<span>适用部门：<i>{{strategyPhaseInfo.applydeparts}}</i></span>
		<span>地域：<i>{{strategyPhaseInfo.area}}</i></span>
		<span>项目：<i>{{strategyPhaseInfo.firstProject}}</i></span>
	</div>
	<div class="under_line">
			<span>学员信息</span>
	</div>
	<div class="content">
		<!-- 顶部的四个下拉选择开始 -->
      <el-form  :label-position='"right"'  label-width="100px">
		<!-- <div class="common"> -->
      <!-- :label-position="right" -->
            <el-form-item label="录音类型"  class="gray  label">
        <el-radio-group v-model="recordType">
        <el-radio v-for="item in recordTypeValue"
        :disabled="operationLock"
							:key="item.id"
							:label="item.id">{{item.name}}</el-radio>
    </el-radio-group>
  </el-form-item>
		<!-- </div> -->
    <!-- <div class="common"> -->
            <el-form-item label="录音性质"  class="white label">
        <el-radio-group v-model="recType" >
        <el-radio v-for="item in recTypeValue"
        :disabled="operationLock"
							:key="item.id"
							:label="item.id">{{item.name}}</el-radio>
    </el-radio-group>
  </el-form-item>
		<!-- </div> -->
     <!-- <div class="common"> -->
            <el-form-item label="学员现状分类"  class="gray  label">
        <el-radio-group  v-model="state" class="student" >
        <el-radio v-for="item in stateValue"
							:key="item.id"
        :disabled="operationLock"
							:label="item.id">{{item.name}}</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="取证目的" class="white label">
        <el-radio-group  v-model="aim" >
        <el-radio v-for="item in aimValue"
							:key="item.id"
              :disabled="operationLock"
							:label="item.id">{{item.name}}</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="学员性别" class="gray" >
        <el-radio-group  v-model="sex" @change="sexlist" >
        <el-radio v-for="item in sexlistValue"
							:key="item.id"
              :disabled="operationLock"
							:label="item.id">{{item.name}}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="学员年龄段" class="white">
        <el-radio-group  v-model="ageStage"  >
        <el-radio v-for="item in agegroup"
							:key="item.id"
              :disabled="operationLock"
							:label="item.id">{{item.name}}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="目前最高学历" class="gray">
        <el-radio-group  v-model="degree"  >
        <el-radio v-for="item in heightEducation"
							:key="item.id"
              :disabled="operationLock"
							:label="item.id">{{item.name}}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="咨询学历层次"  class="white">
        <el-radio-group  v-model="consultDegreeStage"  >
        <el-radio v-for="item in seekdeage"
							:key="item.id"
              :disabled="operationLock"
							:label="item.name">{{item.name}}</el-radio>
    </el-radio-group>
  </el-form-item>
      </el-form>
		<div class="projects" :class="{isDisabled:studentAndOrder.isApply!=='否'}">
			<div class="question_one">
				<span class="tit">一级项目</span>
				<div class="selecter">
					<el-select :disabled="operationLock" v-model="majorTypeOneName" size="mini"  placeholder="请选择"	@change="selectTwo">
						<el-option
							v-for="item in oneList"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question_one">
				<span class="tit">二级项目</span>
				<div class="selecter">
					<el-select v-model="majorTypeTwoName" size="mini"  placeholder="请选择" :disabled='twoList.length===0 || operationLock'>
						<el-option
							v-for="item in twoList"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="question_one"></div>
			<div class="question_one"></div>
		</div>
		<!-- 顶部四个下拉选择结束 -->
		<questions
			v-for="(question, index) in questions"
			:question="question"
			:ref="'' + index"
			:index="index"
			:key="index"></questions>
	</div>
</div>
</template>

<script>
import Questions from './Questions'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as types from '@/store/modules/player/actionTypes'
import fetch from '@/utils/fetch'
import { ageGroup, heightEducation, seekdeage } from '../../../api/player'
export default {
  data() {
    return {
      oneList: [],
      twoList: ['1']
    }
  },
  components: {
    Questions
  },
  mounted() {
    // console.log('反馈记录表', this.questions)
    if (this.studentAndOrder.isApply === '否') {
      this.studentAndOrder.majorTypeOneName = ''
      this.studentAndOrder.majorTypeTwoName = ''
    }
    fetch({
      url: '/calls/commons/projects',
      method: 'get'
    })
		.then(res => {
  this.oneList = res
})
    ageGroup()
        .then(res => { // 年龄段
          this.agelist = res.result
        })
    heightEducation()
        .then(res => { // 最高学历
          this.heightelist = res.result
        })
    seekdeage()
        .then(res => { // 咨询学历层次
          this.seeklist = res.result
        })
  },
  computed: {
    index: {
      get() {
        return this.$store.state.player.index
      },
      set(value) {
        this[types.SET_INDEX](value)
      }
    },
    recType: {
      get() {
        return this.$store.state.player.recType.toString()
      },
      set(value) {
        this[types.SET_RECTYPE](value)
      }
    },
    recordType: {
      get() {
        return this.$store.state.player.recordType.toString()
      },
      set(value) {
        this[types.SET_RECORDTYPE](value)
      }
    },
    aim: {
      get() {
        return this.$store.state.player.aim.toString()
      },
      set(value) {
        this[types.SET_AIM](value)
      }
    },
    majorTypeOneName: {
      get() {
        return this.$store.state.player.majorTypeOneName.toString()
      },
      set(value) {
        this[types.SET_MAJORTYPEONENAME](value)
      }
    },
    majorTypeTwoName: {
      get() {
        return this.$store.state.player.majorTypeTwoName.toString()
      },
      set(value) {
        this[types.SET_MAJORTYPETWONAME](value)
      }
    },
    ageStage: {
      get() {
        return this.$store.state.player.ageStage.toString()
      },
      set(value) {
        this[types.SET_AGESTAGE](value)
      }
    },
    consultDegreeStage: {
      get() {
        return this.$store.state.player.consultDegreeStage.toString()
      },
      set(value) {
        this[types.SET_CONSULTDEGREESTAGE](value)
      }
    },
    degree: {
      get() {
        return this.$store.state.player.degree.toString()
      },
      set(value) {
        this[types.SET_DEGREE](value)
      }
    },
    state: {
      get() {
        return this.$store.state.player.state.toString()
      },
      set(value) {
        this[types.SET_STATE](value)
      }
    },
    sex: {
      get() {
        return '' + this.$store.state.player.sex
      },
      set(value) {
        this[types.SET_SEX](value)
      }
    },
    ...mapGetters('player', [
      'operationLock',
      'recordTypeValue',
      'recTypeValue',
      'stateValue',
      'aimValue',
      'questions',
      'studentAndOrder',
      'agegroup',
      'heightEducation',
      'seekdeage',
      'sexlistValue',
      'strategyPhaseInfo'
    ])
  },
  methods: {
    ...mapMutations('player', [
      types.SET_RECORDTYPE,
      types.SET_STATE,
      types.SET_AIM,
      types.SET_MAJORTYPEONENAME,
      types.SET_MAJORTYPETWONAME,
      types.SET_AGESTAGE,
      types.SET_DEGREE,
      types.SET_CONSULTDEGREESTAGE,
      types.SET_SEX,
      types.SET_INDEX
    ]),
    ...mapActions('player', [
      types.SET_RECTYPE
    ]),
    selectType(vals) {
      this.index = vals
    },
    selectTwo(val) {
      this.majorTypeTwoName = ''
      this.oneList.map((key, val) => {
        if (this.majorTypeOneName === key.name) {
          this.twoList = key.items
        }
      })
    },
    sexlist(val) {
      if (this.val === '0') {
        this.val === '男'
      } else {
        this.val === '女'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.quality-info {
	.el-form{
		margin-bottom: 20px;
			.el-form-item{
			height: 42px;
		}
	}
	.projects{
		margin-bottom: 20px;
	}
	h3 {
		font-size: 24px;
		height: 30px;
		line-height: 30px;
		font-weight: 700;
		margin-bottom: 30px;
		margin-top: 40px;
		text-align: left;
	}
	.studentData{
		width: 80%;
		span{
			padding-right: 60px;
			color: #bbbbbb;
			font-size: 16px;
		}
		i{
			font-style: normal;
			color: #0e0000;
		}
	}
	.under_line{
		width: 100%;
		border-top: 2px solid #efefef;
		margin-top: 20px;
		position: relative;
		height: 45px;
		span{
			position: absolute;
			top: -2px;
			padding: 0 4px;
			font-size: 14px;
			font-weight: 700;
			line-height: 28px;
			color: #f79300;
			border-top: 2px solid #f79300;
		}
	}
	.content {
    width: 100%;
    .label{
      position: relative;
    }
    .label::before{
    content: "*";
    color: #f56c6c;
    top: 50%;
    position: absolute;
    transform: translate(90px, -37%);
    // margin-right: 4px;
    line-height: 21px;
    }
     .el-form-item{
        margin-bottom: 0;
        // min-width: 1366px;
      }
      .el-radio{
        padding-left: 10px;
        line-height: 2;
      }
      .student{
        word-wrap: break-word;
        // word-wrap: break-word;
// word-break: normal;
// word-wrap: break-word;
        label:last-of-type{
          padding-left: 20px;
        }
      }
      .white{
        background: #FEFCFA;
      }
      .gray{
        background: #F8F8F8;
      }
		.common , .classify,.projects{
			min-height: 30px;

			// margin-bottom: 30px;
			display: flex;
			.question,.question_one {
				// margin-right: 37px;
        height: 42px;
				// width: 245px;
				flex: 1;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.tit {
          // margin-right: 20px;
					// font-size: 12px;
					// color: #cacaca;
					// margin-right: 5px;
					// flex: 1;
					}
					.selecter {
						// flex: 1;
            line-height: 42px;
						margin-left: 31px;
					}
			}
		}
		.isDisabled{
				display: none;
			}

		.classify .question {
			flex: 0.25;
      height: 42px;
		}
		.record {
			width: 100%;
			height: 100px;
			margin-bottom: 40px;
			display: flex;
			.left {
				height: 100%;
				flex: 0.5;
				display: flex;
				align-items: center;
				span {
					width: 80px;
					font-size: 12px;
					color: #cacaca;
				}
				div {
					flex: 1;
				}
			}
			.right {
				padding: 0;
				padding-left: 27px;
				height: 100%;
				flex: 0.5;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				span {
					width: 130px;
					font-size: 12px;
					color: #cacaca;
				}
			}
		}
	}
}
</style>
