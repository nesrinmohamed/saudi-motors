<script setup>
/*##########[ IMPORTS ]##########*/
import AssetsManager from "~/core/AssetsManager";
// import HelperFunctions from '~/core/HelperFunctions';
import { useNotification } from "@kyvg/vue3-notification";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useSharedStore } from "~/stores/sharedStore";

/*##########[ DEFINES ]##########*/
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const { notify } = useNotification();
const display = useDisplay();
const sharedStore = useSharedStore();

/*##########[ COMPUTED ]##########*/
const navDrawer = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

/*##########[ STATE ]##########*/

/*##########[ METHODS ]##########*/

/*##########[ LIFE CYCLE ]##########*/
onMounted(() => {});
onBeforeUnmount(() => {});
</script>

<template>
  <v-navigation-drawer
    v-if="$vuetify.display.mobile"
    width="300"
    height="100vh"
    class="app-nav-drawer"
    order="0"
    v-model="navDrawer"
    location="right"
    color="secondary-180"
    temporary
  >
    <v-sheet
      color="transparent"
      width="100%"
      height="100%"
      class="flex-center flex-column pb-15"
    >
      <div
        v-for="item in sharedStore.navLinks"
        class="nav-menu-item font-size-small font-weight-bold mb-5"
        :class="{ active: $route.path === item.path }"
        :key="item.path"
      >
        <NuxtLink
          :to="item.path"
          class="relative nav-menu-item-link text-decoration-none d-inline-block w-100 h-100 py-3 px-7 text-uppercase"
          >{{ item.title }}
        </NuxtLink>
      </div>
    </v-sheet>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.v-navigation-drawer {
  top: 108px !important;
}
</style>