<template>
  <div class="sl-layout sl-layout-container-wrapper">
    <div class="sl-layout-header-wrapper">
      <LayoutHeader/>
    </div>
    <div class="sl-layout-main-wrapper">
      <div class="sl-layout-sidebar-wrapper">
        <LayoutSidebar
        />
      </div>
    </div>
    
  </div>
</template>
<script>
import LayoutHeader from "./header";
import LayoutSidebar from "./sidebar";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutSidebar,
  },
}
</script>