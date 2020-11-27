<template>
  <div class="sl-layout-content__content">
    <div class="content__inner">
      <keep-alive :include="cachedViews">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  name: "LayoutContent",
  computed: {
    cachedViews() {
      return this.$store.state.tab.cachedTabList;
    },
    key() {
      return this.$route.fullPath;
    },
  },
};
</script>