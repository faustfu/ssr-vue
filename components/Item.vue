<template>
  <div>{{ item.title }}</div>
</template>
<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      return this.$store.state.items[this.$route.params.id]
    },
  },
}
</script>