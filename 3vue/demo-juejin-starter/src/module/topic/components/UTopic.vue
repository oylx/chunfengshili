<template>
  <div>
    <u-list :items="items"></u-list>
  </div>
  <div class="x-bottom"></div>
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
  },
  created() {
    const { type } = this;
    this.fetchData({ type });
  },
};
</script>

<style scoped>

</style>
