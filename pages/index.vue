<script setup>
import RoutesManager from "~/core/RoutesManager";
import AssetsManager from "~/core/AssetsManager";
import { useSharedStore } from "~/stores/sharedStore";
const title = ref("ما الذى تبحث عنه ");
const sharedStore = useSharedStore();

definePageMeta({
  layout: "landing",
});
</script>

<template>
  <div class="app-page">
    <LayoutAppHeader :title="title"></LayoutAppHeader>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        v-for="(item, i) in sharedStore.pageLinks"
        :key="i"
        class="mx-auto text-center"
      >
        <v-card
          color="transparent"
          class="card-item text-white d-flex align-center justify-center flex-column"
          rounded="lg py-10"
          height="250px"
          width="270px"
          elevation="0"
        >
          <div class="card-overlay"></div>
          <NuxtLink :to="item.path" class="info-title">
            <v-avatar color="secondary-150" size="100">
              <v-img
                :src="item.image"
                width="50%"
                height="50%"
                color="primary"
              ></v-img>
            </v-avatar>
            <h2 class="mt-2 text-white">{{ item.title }}</h2>
          </NuxtLink>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.card-item {
  .card-overlay {
    background: #d9d9d9;
    opacity: 20%;
    z-index: -1;
  }
  margin-top: 100px;
  .info-title {
    z-index: 3333;
  }
}
</style>