<template>
  <div>
    <u-list :items="items"></u-list>
  </div>
  <div class="x-bottom" v-intersect="{handle:fetchNext}"></div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import UList from '@/components/UList';

const {
  mapState,
  mapActions,
} = createNamespacedHelpers('topic');
export default {
  name: 'UTopic',
  components: { UList },
  props: ['type'],
  computed: {
    ...mapState({ 'items': (state) => state[state.activeType].items }),
  },
  methods: {
    ...mapActions({
      fetchData: 'FETCH_LIST_DATA',
    }),
    fetchNext() {
      const { type } = this;
      this.fetchData({type})
    }
  },
  created() {
    this.fetchNext()
  },
};
</script>

<style scoped>

</style>
