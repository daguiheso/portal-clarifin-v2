+<template>
  <div className="horizontalMenucontainer">
    <Switcher />

    <div className="page">

      <Header />

      <Sidebar />

      <div className="main-content app-content">
        <div className="container-fluid">
          <router-view />
        </div>
      </div>

      <Rightsidebar />
    </div>

    <Backtotop />
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/header/header.vue";
import Rightsidebar from "../components/rightsidebar/rightsidebar.vue";
import Sidebar from "../components/sidebar/sidebar.vue";
import Switcher from "../components/switcher/switcher.vue";
import Backtotop from "../components/backtotop/backtotop.vue";
</script>
