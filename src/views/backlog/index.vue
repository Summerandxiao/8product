<template>
  <div class="backlog-wrapper">
    <workflow-task-center v-if="configFlag" @back="back"></workflow-task-center>
  </div>
</template>

<script>
export default {
  name: 'Backlog',
  data () {
    return {
      configFlag: false
    }
  },
  created () {
    this.$store.dispatch('getWorkflowConfig').then(() => {
      this.configFlag = true
    })
  },
  methods: {
    back () {
      this.$router.push({ path: 'main' })
    }
  }
}
</script>
<style lang="scss">
.backlog-wrapper {
}
</style>
