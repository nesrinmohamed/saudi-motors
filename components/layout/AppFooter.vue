<script setup >
// import { ref } from "vue";
import AssetsManager from "~/core/AssetsManager";
import { useSharedStore } from "~/stores/sharedStore";
import { useDisplay } from "vuetify";
import { useInfoStore } from "~/stores/globalStore";

const display = useDisplay();
const sharedStore = useSharedStore();
const infoStore = useInfoStore();
// ========[COMPUTED]=====
const subscribeLink = computed(() => {
  return infoStore.info?.contacts.phones[1].has_whats
    ? `https://wa.me/${infoStore.info?.contacts.phones[1].phone}`
    : "#";
});
</script>

<template>
  <footer
    class="app-footer my-5"
    :class="$vuetify.display.name"
    v-if="infoStore.info"
  >
    <v-container>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="10" class="mx-auto">
          <div class="py-10 d-flex align-center justify-center flex-column">
            <v-img
              :src="infoStore.info.logo_footer"
              width="89px"
              height="86px"
            ></v-img>

            <nav class="d-flex mt-8">
              <div
                v-for="item in sharedStore.navLinks"
                class="nav-menu-item font-size-small font-weight-bold"
                :class="{ active: $route.path === item.path }"
                :key="item.path"
                color="primary"
              >
                <NuxtLink
                  :to="localePath(item.path)"
                  class="relative nav-menu-item-link text-decoration-none d-inline-block w-100 h-100 py-2 px-7 text-uppercase"
                  >{{ item.title }}
                </NuxtLink>
              </div>
            </nav>
          </div>

          <div class="d-flex align-center justify-center social-links">
            <span>خدمة العملاء : </span>
            <a
              v-for="(phone, i) in infoStore.info.contacts.phones"
              :key="i"
              class="d-flex align-center"
              :href="subscribeLink"
              target="_blank"
            >
              <img
                :src="AssetsManager.whatsAppImage"
                width="20"
                height="20"
                contain
                class="mx-2"
              />
              <span class="number text-subtitle-2" v-if="!!phone.has_whats"
                ><bdi>{{ phone.phone }}</bdi></span
              >
            </a>

            <v-divider vertical class="mx-2"></v-divider>
            <div
              v-for="(socialLink, i) in infoStore.info.social"
              :key="i + 's-k'"
              class="d-flex mr-2"
            >
              <NuxtLink :to="socialLink.link">
                <v-img
                  :src="socialLink.icon"
                  width="20"
                  height="20"
                  contain
                ></v-img>
              </NuxtLink>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>

      <div class="d-flex justify-space-between w-100 flex-1">
        <p class="text-body-2">جميع الحقوق محفوظة لموقع سعودي موتورز 2024</p>
        <img :src="AssetsManager.elryadLogo" width="70" height="24" contain />
      </div>
    </v-container>
  </footer>
</template>

<style lang="scss" scoped>
</style>