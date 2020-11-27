<template>
  <a-sub-menu :key="menuInfo.fullPath" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon v-if="menuInfo.icon" :type="menuInfo.icon" />
      <span>
        {{ menuInfo.title }}
      </span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.fullPath">
        <router-link :to="{ name: item.name}">
          {{ item.title }}
        </router-link>
      </a-menu-item>
      <sub-menu v-else :key="item.fullPath" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
import { Menu } from "ant-design-vue";
export default {
  name: "MenuItem",
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
