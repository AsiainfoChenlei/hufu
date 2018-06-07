<template>
<div class="wrapper">
<div class="record-wrapper">
  <div class="header">
    <div class="header_position">
      <div 
      class="switch-more"
      @click="showMore=!showMore">查找录音</div>
    <span
      class="total-count">已选中 {{currentSelectedCount}}
        <span 
        :class="{disable: cantGoNext}"
        class="go-audio-play"
        @click="goAudioPlay('hufu')">进入虎符详情页</span>
        <i class="v_line"></i>
        <span 
        :class="{disable: cantGoNext}"
        class="go-audio-play"
        @click="goAudioPlay('quality')">进入质检详情页</span>
    </span>
    </div>
  </div>
  <div class="content">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        header-align="center"
        :selectable="selectable">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip='true'
        label="责任人"
        min-width="80px"
        align="center"
        header-align="center"
        prop="sellName">
      </el-table-column>
      <!-- <el-table-column
        prop="recordType"
        label="录音类型"
        align="center"
        header-align="center">
      </el-table-column> -->
      <el-table-column
        :show-overflow-tooltip='true'
        prop="enterpriseName"
        label="事业部"      
        align="center"
        min-width="105px"
        header-align="center">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip='true'
        prop="groupName"
        label="军团"    
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
      :show-overflow-tooltip='true'
        prop="sellAndGroupName"
        label="销售部/组"
        align="center"
        min-width="105px"
        header-align="center">
      </el-table-column>
      <el-table-column
      :show-overflow-tooltip='true'
        min-width="120"
        prop="isSystem"
        label="机器初筛违规"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
      :show-overflow-tooltip='true'
        prop="recType"
        label="录音性质"
        min-width="90px"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
      :show-overflow-tooltip='true'
        prop="isApply"
        label="是否报名"
        min-width="90px"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
      :show-overflow-tooltip='true'
        prop="matchStrategyFlag"
        label="是否有策略"
        align="center"
        min-width="100"
        header-align="center">
      </el-table-column>
      <el-table-column
      :show-overflow-tooltip='true'
        prop="examineName"
        label="质检员"
        align="center"
        min-width="80px"
        header-align="center">
      </el-table-column>
      <el-table-column
      :show-overflow-tooltip='true'
        prop="selectStatus"
        label="状态"
        align="center"
        min-width="70px"
        header-align="center">
      </el-table-column> 
      <el-table-column
      :show-overflow-tooltip='true'
        prop="workNum"
        label="工号"
        align="center"
        header-align="center">
      </el-table-column>   
      <el-table-column
      :show-overflow-tooltip='true'
        prop="phoneNum"
        label="手机号"
        align="center"
        min-width="120px"
        header-align="center">
      </el-table-column>  
      <el-table-column
      :show-overflow-tooltip='true'
        prop="date"
        label="日期"
        min-width="100px"
        align="center"
        header-align="center">
      </el-table-column>    
    </el-table>
    <transition name="slide-fade">
      <select-shadow
        @closeMore="showMore=false"
        v-show="showMore"></select-shadow>
    </transition>
  </div>
  <div class="footer">
    <el-pagination
      layout="prev, pager, next"
      :page-size="pagination.size"
      :total="pagination.totalElements"
      :current-page="pagination.number"
      @current-change="TOGGLEPAGINATION">
    </el-pagination>
  </div>
  </div>
<div class="mask-wrapper" v-show="showMore" @click="showMore=!showMore"></div>
</div>
</template>
<script>
import {
  addRecordsToList } from '@/api/record'
import SelectShadow from './SelectShadow'
import { mapActions, mapGetters } from 'vuex'
import * as types from '@/store/modules/record/actionTypes'

export default {
  data() {
    return {
      multipleSelection: [],
      oldMultipleSelection: [],
      currentSelectedCount: 0,
      showMore: false,
      cantGoNext: false,
      isApplys: {
        '否': 1
      }
    }
  },
  components: {
    SelectShadow
  },
  computed: {
    ...mapGetters('record', [
      'tableData',
      'oldSelectedCount',
      'pagination'
    ])
  },
  created() {
    this[types.SEARCH]().then(  //  取到选中的数量
      () => {
        this.updateCurrentSelectedCount(this.oldSelectedCount)
      }
    )
  },
  methods: {
    ...mapActions('record', [
      types.SEARCH,
      types.TOGGLEPAGINATION
    ]),
    handleSelectionChange(value) {
      // console.log('选中的', value)
      this.multipleSelection = value
    },
    selectable(item) {  //  如果是已占用、则显示禁选
      return item.selectStatus !== '已占用'
    },
    goAudioPlay(val) {
      sessionStorage.setItem('record', location.pathname)
      if (this.cantGoNext) {
        this.$message({
          message: '你还没有选取录音, 选择一些把',
          type: 'info'
        })
      } else {
        addRecordsToList( //  筛选到的id发送请求、添加列表
          this.multipleSelection.map(item => item.recordId)
          ).then(() => {
            val === 'hufu' ? this.$router.push('/audioPlay') : this.$router.push({ path: '/quality' })
          }).catch(() => {
            this.$message({
              message: '添加录音到列表失败, 请稍后重试',
              type: 'error'
            })
          })
      }
    },
    /**
     * updateCurrentSelectedCount
     *
     * 更新右上角的勾选数量, 当勾选 0 个录音记录时, 不可入打分页面
     * @augments count 当前选中的录音的个数(以前选中的 + 本页选中的)
     */
    updateCurrentSelectedCount(count) { //  没有选中的name不能跳转详情
      if (count === 0) {
        this.cantGoNext = true
      } else {
        this.cantGoNext = false
      }
      this.currentSelectedCount = count
    }
  },
  filters: {
    createBad(value) {
      return value === 1 ? '是' : '否'
    }
  },
  watch: {
    multipleSelection: {
      handler() {
        let count = 0
        count = this.oldSelectedCount + this.multipleSelection.length
        if (count > 10) {
          this.$message({
            message: '您最多可以占用10个录音',
            type: 'error',
            customClass: 'element-ui-message'
          })
          this.multipleSelection = this.oldMultipleSelection
          this.$refs.multipleTable.clearSelection()
          this.oldMultipleSelection.forEach(item => {
            this.$refs.multipleTable.toggleRowSelection(item, true)
          })
        } else {
          this.oldMultipleSelection = [].concat(this.multipleSelection)
          this.updateCurrentSelectedCount(count)
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.record-wrapper{
  width: 100%;
  height: 60px;
  position: relative;

.header {
    width: 100%;
    padding: 0px 20px;
    height: 60px;
    font-size: 16px;
    line-height: 60px;
    border-top: 1px solid #e9e9e9;
    line-height: 60px;
    .header_position{
      height: 100%;
      border-bottom: 2px solid #d0d0d0;
    }
    .switch-more {
      float: left;
      color: #72ACE3;
      cursor: pointer;
      &:hover {
        text-decoration-line: underline;
      }
    }
    .total-count {
      float: right;
      .go-audio-play {
        padding: 0px 5px;
        color: #72ACE3;
        cursor: pointer;
        &:hover {
          text-decoration-line: underline;
        }
        &:nth-of-type(1){
          margin-left: 5px;
        }
      }
      // .go-audio-play:nth-of-type(2) {
      //   border-left: 1px solid #e6ebf5;
      // }
      .v_line{
        display: inline-block;
        width: 1px;
        height: 13px;
        background: #e6ebf5;
      }
      .disable {
        color: #999;
        cursor:  not-allowed;
        &:hover {
          text-decoration-line: none;
        }
      }
    }
  }
  .content {
    padding:20px;
    min-width: 100%; 
    min-height: 280px;
    min-width: 1340px;
  }
  .footer {
    float: right;
    margin-right: 15px;
  }

}
  .mask-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0; 
    background: #000;
    opacity: 0.1;
    z-index: 1000;
  }
  .el-table thead{
    color: #201E1C;
    font-size: 16px;
  }
</style>
