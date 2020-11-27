<template>
  <div class="sl-layout-header">
    <div class="logo">
      <div class="title"><i class="el-icon-s-management"></i> {{title}}</div>
    </div>
  </div>
</template>
<script>
import config from "@/config";

export default {
  name: "LayoutHeader",
  props: {
    collapsed: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return { userInfo: {} };
  },
  computed: {
    title() {
      return config.headerTitle || "无标题";
    },
    isShowCollapsed() {
      return config.isShowCollasped;
    },
  },
  mounted() {
    // this.getAccount();
  },
  methods: {
    toggleCollapsed() {
      this.$emit("toggleCollapsed");
    },
    toMessage() {
      if (this.$route.name != "MessageList")
        this.$router.push({ name: "MessageList" });
    },
    getAccount() {
      this.$store.dispatch("user/identity").then((account) => {
        this.userInfo = { orgName: account.orgName };
      });
    },
  },
};
</script>
