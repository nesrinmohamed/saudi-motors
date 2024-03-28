<script setup>
/*##########[ IMPORTS ]##########*/
// import AssetsManager from '~/core/AssetsManager';
// import HelperFunctions from '~/core/HelperFunctions';
// import { useNotification } from "@kyvg/vue3-notification";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

/*##########[ DEFINES ]##########*/
const props = defineProps([""]);
const emit = defineEmits([""]);
// const { notify } = useNotification()
const display = useDisplay();
const title = ref("أفضل سوق لبيع السيارات فى المملكة");

/*##########[ COMPUTED ]##########*/

/*##########[ STATE ]##########*/

/*##########[ METHODS ]##########*/

/*##########[ LIFE CYCLE ]##########*/
onMounted(() => {});
onBeforeUnmount(() => {});
</script>

<template>
  <div class="cars">
    <!-- header-area -->
    <LayoutAppHeader :title="title"></LayoutAppHeader>
    <!-- end header-area -->

    <!-- SEARCH IN HOME  -->
    <!-- SEARCH IN HOME  -->
    <FilterSearchFiled></FilterSearchFiled>
    <!-- END FILTER HOME  -->

    <!-- SEARCH IN HOME  -->
    <v-row class="mt-10">
      <v-col cols="12" md="9">
        <!-- ====RIGH SIDBAR=== -->
        <StaticSectionsHomeAdvertising></StaticSectionsHomeAdvertising>
      </v-col>
      <!-- ========LEFT SIDEBAR==== -->
      <v-col md="3">
        <StaticSectionsSidebarSection></StaticSectionsSidebarSection>
      </v-col>
    </v-row>
    <!--END SEARCH IN HOME  -->
  </div>
</template>

<style lang="scss" scoped>
</style>