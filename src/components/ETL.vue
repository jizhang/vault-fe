<template>
  <div class="page-etl">
    ETL
    <div v-text="msg"></div>
  </div>
</template>

<script>
export default {
  name: 'ETL',
  data () {
    return {
      msg: '',
    }
  },

  mounted () {
    fetch('/api/ping')
      .then(response => response.json())
      .then(responseJson => {
        this.msg = responseJson.payload
      })
  }
}
</script>

<style lang="scss">
.page-etl {

}
</style>
