<template>
  <div>
    <!--我的工作台界面-->
    <component :is="currentRole"></component>
  </div>
</template>
<script>
// 引入不同的工作台展示军团的控制台sof的控制台
  import armyDashboard from './army/index.vue'
  import sofDashboard from './sop/index.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      armyDashboard,
      sofDashboard
    },
    data() {
      return {
        currentRole: 'armyDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      // 通过判断不同的权限进行展示 这里可以做更加简洁的判断方式通过判断roleId 只不过要将roleId储存在session里面
      if (this.$checkRole('dashboard') === 'army') {
        return
      }
      this.currentRole = 'sofDashboard'
    }
  }
</script>
<style>

</style>
