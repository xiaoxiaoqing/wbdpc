<template>
  <div class="content-header-resue-tabset">
    <a-tabs class="sl-content-tabs" hideAdd v-model="activeKey" type="card" @change="tabChange">
      <a-tab-pane v-for="pane in tabList" :key="`${pane.name}`">
        <div
          class="tab-solt tab-solt__dot1"
          slot="tab"
          @contextmenu.prevent="openContextMenu(pane,$event)"
        >
          {{pane.title}}
          <a
            class="close-handle"
            href="javascript:void(0)"
            @click.stop="tabClose(pane)"
            title="关闭"
          >
            <a-icon type="close" v-if="!pane.meta||pane.meta.closable!=false" />
          </a>
        </div>
      </a-tab-pane>
    </a-tabs>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu-content">
      <li @click="refreshSelectedTab">刷新</li>
      <li :class="{'disabled':!isClosable(selectedTab)}" @click="closeSelectedTag">关闭</li>
      <li @click="closeOthersTabs">关闭其他</li>
      <li @click="closeAllTabs">关闭所有</li>
    </ul>
  </div>
</template>
<script>
import config from "@/config";
export default {
  name: "ReuseTabset",
  data() {
    return {
      selectedTab: {},
      newTabIndex: 0,
      activeKey: undefined,
      visible: false,
      left: 0,
      top: 0,
    };
  },
  computed: {
    tabList() {
      return this.$store.state.tab.tabList;
    },
    homeRoute() {
      return this.$store.getters["menu/homeRoute"];
    },
  },
  mounted() {
    this.initTab();
    this.addTab(this.homeRoute);
  },
  watch: {
    $route() {
      this.addTab(this.$route);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeContextMenu);
      } else {
        document.body.removeEventListener("click", this.closeContextMenu);
      }
    },
  },
  methods: {
    initTab() {
      if (this.$route.name !== this.homeRoute.name) {
        this.$router.push({ name: this.homeRoute.name });
      }
      this.activeKey = this.homeRoute.name;
    },
    addTab(route) {
      const { name, meta } = route;
      if (name) {
        if (!meta.hideInTab) {
          this.$store.dispatch("tab/addTab", route);
          this.activeKey = this.$route.name;
        }
      }
      return false;
    },
    tabChange(activeKey) {
      let tab = this.tabList.find((ele) => ele.name == activeKey);
      tab.meta = Object.assign(tab.meta || {}, { refresh: false });
      this.$router.push({
        name: activeKey,
        params: tab.params,
        query: tab.query,
        path: tab.fullPath,
      });
    },
    tabClose(route) {
      this.$store.dispatch("tab/delTab", route).then((res) => {
        if (this.isActive(route)) {
          this.toLastTab(res.tabList, route);
        }
      });
    },
    toLastTab(tabList, view) {
      const latestTab = tabList.slice(-1)[0];
      if (latestTab) {
        this.$router.push({
          name: latestTab.name,
          params: latestTab.params,
          query: latestTab.query,
        });
      } else {
        if (view.name === config.homeName) {
          this.$router.replace({
            path: "/redirect" + view.fullPath.replace("//", "/"),
          });
        } else {
          this.$router.push("/");
        }
      }
      this.activeKey = this.$route.name;
    },
    openContextMenu(tab, e) {
      const target = e.target;
      this.left = target.getBoundingClientRect().left + target.offsetWidth - 16; //left + width - padding-left
      this.top = e.clientY;
      this.visible = true;
      this.selectedTab = tab;
    },
    closeContextMenu() {
      this.visible = false;
    },
    isClosable(tab) {
      return tab ? (tab.meta ? tab.meta.closable !== false : true) : false;
    },
    refreshSelectedTab() {
      this.$store.dispatch("tab/delCachedTab", this.selectedTab).then(() => {
        let { fullPath } = this.selectedTab;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath.replace("//", "/"),
          });
        });
      });
    },
    closeAllTabs() {
      this.$store.dispatch("tab/delAllTabs").then(({ tabList }) => {
        this.toLastTab(tabList, this.selectedTab);
      });
    },
    closeOthersTabs() {
      if (this.selectedTab.name != this.$route.name) {
        this.$router.push(this.selectedTab);
      }
      this.$store.dispatch("tab/delOtherTabs", this.selectedTab);
    },
    closeSelectedTag() {
      if (this.isClosable(this.selectedTab)) this.tabClose(this.selectedTab);
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("~@/styles/layout/content-header");
</style>