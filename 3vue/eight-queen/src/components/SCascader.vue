<template>
  <div>
    <event-cascader
      :parent-type.sync="eventTypeLId"
      :middle-type.sync="eventTypeMId"
      :child-type.sync="eventTypeId"
    />
    <div>{{ eventTypeLId }}/ {{ eventTypeMId }}/ {{ eventTypeId }}</div>
  </div>
</template>

<script>
import EventCascader from '@/components/cascader/EventCascader'
export default {
  name: 'SCascader',
  components: { EventCascader },
  data() {
    return {
      eventTypeLId: 'zhinan',
      eventTypeMId: 'shejiyuanze',
      eventTypeId: 'fankui'
    }
  }
}
</script>

<style scoped>

</style>
