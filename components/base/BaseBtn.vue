<script setup>
const props = defineProps(["sm"]);
import AssetsManager from "~/core/AssetsManager";
import { useInfoStore } from "~/stores/globalStore";
const infoStore = useInfoStore();

const subscribeLink = computed(() => {
  return infoStore.info?.contacts.phones[1].has_whats
    ? `https://wa.me/${infoStore.info?.contacts.phones[1].phone}`
    : "#";
});
</script>

<template>
  <v-sheet class="px-2 py-1 rounded-lg">
    <a
      class="rounded-lg d-flex align-center justify-center"
      width="130"
      :href="subscribeLink"
      target="_blank"
    >
      <img :src="AssetsManager.whatsAppImage" width="20" contain />
      <span class="text-subtitle-1 mr-2 text-bl text-black"
        >تواصل مع البائع</span
      >
    </a>
  </v-sheet>
</template>

<style lang="scss" scoped>
</style>
