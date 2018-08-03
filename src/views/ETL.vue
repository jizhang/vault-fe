<template>
  <div class="page-etl">
    ETL
    <div v-text="msg"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ETL extends Vue {
  private msg = ''

  public mounted() {
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
