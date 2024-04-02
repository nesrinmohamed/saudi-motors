<script setup>
/*##########[ IMPORTS ]##########*/
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import axios from "axios";
import { useInfoStore } from "~/stores/globalStore";
/*##########[ DEFINES ]##########*/
const props = defineProps([""]);
const emit = defineEmits([""]);
// const { notify } = useNotification()
const display = useDisplay();
const title = ref("أفضل سوق لبيع السيارات فى المملكة");
const infoStore = useInfoStore();

/*##########[ DEFINES ]##########*/
const isLoaded = ref(false);
const filteredRooms = ref([]);
const roomsFilterd = ref([]);
const newRooms = ref([]);
const page = ref(1);

const filters = reactive({
  factories: "اختيار",
  factoryId: "اختيار",
  type: "اختيار",
  yearFrom: "اختيار",
  yearTo: "اختيار",
});
const type = ref([
  { name: "جديد", id: 1 },
  { name: "مستعمل", id: 0 },
]);

const now = new Date().getUTCFullYear();
const years = Array(now - (now - 101))
  .fill("")
  .map((v, idx) => now - idx);

const setFilter = async () => {
  const filterFactories = !isNaN(parseInt(filters.factories))
    ? "&factories=" + parseInt(filters.factories)
    : "";
  const fitlerFactoryDetails = !isNaN(parseInt(filters.factoryId))
    ? "&factory_detail_id=" + parseInt(filters.factoryId)
    : "";
  const fitlerTypeParam = !isNaN(parseInt(filters.type))
    ? "&is_new=" + parseInt(filters.type)
    : "";

  const filterYearFrom = parseInt(filters.yearFrom)
    ? "&year_from=" + parseInt(filters.yearFrom)
    : "";

  const filterYearto = parseInt(filters.yearTo)
    ? "&year_to=" + parseInt(filters.yearTo)
    : "";
  axios
    .get(
      `advertisements?page=${page.value}${filterFactories}${fitlerFactoryDetails}${fitlerTypeParam}${filterYearFrom}${filterYearto}`
    )
    .then((response) => {
      if (infoStore.advertisements) {
        infoStore.advertisements.data.push(...response.data.data.data);
        infoStore.advertisements.meta = response.data.data.meta;
      } else {
        infoStore.advertisements = response.data.data;
      }
    });
};

/*##########[ METHODS ]##########*/
const loadMore = () => {
  page.value++;

  if (page.value == infoStore.advertisements.meta.last_page) return;
  if (page.value > infoStore.advertisements.meta.last_page) {
    page.value = infoStore.advertisements.meta.last_page;
  }

  setFilter();
};

const filterCategory = () => {
  infoStore.setFactoryId(filters.factories);
  filters.factoryId = "اختيار";
};
const searchBtn = () => {
  infoStore.advertisements = null;
  page.value = 1;
  setFilter();
  // infoStore.setFactoryId(filters.factoryId);
};
/*##########[ LIFE CYCLE ]##########*/

useAsyncData(() => {
  axios.get(`/advertisements?is_new=0`).then((response) => {
    infoStore.advertisements.data = response.data.data.data;
    infoStore.advertisements.meta = response.data.data.meta;
    infoStore.advertisements.links = response.data.data.links;
  });
});
onMounted(() => {
  infoStore.setFactoryId();
});
onBeforeUnmount(() => {});
</script>

<template>
  <div class="use-cars">
    <!-- header-area -->
    <LayoutAppHeader :title="title"></LayoutAppHeader>
    <!-- end header-area -->
    <!-- SEARCH IN HOME  -->
    <v-row class="d-flex flex-wrap">
      <v-sheet
        :class="$vuetify.display.name"
        color="secondary-bg"
        width="100% "
        class="search-inputs rounded-lg mt-5 text-main-text-color d-flex align-center py-5 mb-3"
      >
        <v-container>
          <v-row class="d-flex flex-wrap">
            <!-- ==========[factory]======== -->
            <v-sheet color="secondary-bg" class="input" height="65px">
              <label class="text-main-text-color mb-2" color="white"
                >المصنع</label
              >

              <v-select
                v-if="infoStore.factories"
                v-model="filters.factories"
                :items="infoStore.factories"
                item-title="name"
                item-value="id"
                rounded
                variant="outlined"
                color="#BDE2ED"
                base-color="#BDE2ED"
                append-inner-icon="mdi-chevron-down"
                @update:modelValue="filterCategory()"
              >
              </v-select>
            </v-sheet>
            <v-sheet color="secondary-bg" class="input" height="65px">
              <label class="text-main-text-color mb-2" color="white"
                >الفئة</label
              >

              <v-select
                v-if="infoStore.factoryId"
                v-model="filters.factoryId"
                :items="infoStore.factoryId"
                item-title="detail"
                item-value="id"
                rounded
                variant="outlined"
                color="#BDE2ED"
                base-color="#BDE2ED"
                append-inner-icon="mdi-chevron-down"
              >
              </v-select>
            </v-sheet>

            <v-sheet color="secondary-bg" class="input" height="65px">
              <label class="text-main-text-color mb-2" color="white">
                النوع</label
              >
              <v-select
                v-model="filters.type"
                :items="type"
                item-title="name"
                item-value="id"
                variant="outlined"
                color="#BDE2ED"
                base-color="#BDE2ED"
                append-inner-icon="mdi-chevron-down"
              >
              </v-select>
            </v-sheet>
            <v-sheet color="secondary-bg" class="input" width="265px">
              <label class="text-main-text-color mb-2" color="white"
                >السنة
              </label>
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="filters.yearFrom"
                    :items="years"
                    item-title="name"
                    item-value="id"
                    variant="outlined"
                    color="#BDE2ED"
                    base-color="#BDE2ED"
                    append-inner-icon="mdi-chevron-down"
                  >
                  </v-select>
                </v-col>

                <v-col cols="6">
                  <v-select
                    v-model="filters.yearTo"
                    :items="years"
                    item-title="name"
                    item-value="id"
                    variant="outlined"
                    color="#BDE2ED"
                    base-color="#BDE2ED"
                    append-inner-icon="mdi-chevron-down"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-sheet>
            <v-btn
              width="90"
              height="40"
              color="primary-dark-red"
              class="btn-search text-white outline-none border-none text-subtitle-2 mt-8 mx-1"
              prepend-icon="mdi mdi-magnify"
              @click="searchBtn"
              >بحث</v-btn
            >
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>

    <!-- END FILTER HOME  -->
    <!-- SEARCH IN HOME  -->
    <v-row class="mt-10">
      <v-col cols="12" md="9">
        <!-- ====RIGH SIDBAR=== -->
        <!-- <StaticSectionsHomeAdvertising></StaticSectionsHomeAdvertising> -->
        <StaticSectionsUseCars></StaticSectionsUseCars>
      </v-col>
      <!-- ========LEFT SIDEBAR==== -->
      <v-col md="3">
        <StaticSectionsSidebarSection></StaticSectionsSidebarSection>
      </v-col>
    </v-row>
    <!--END SEARCH IN HOME  -->

    <div
      class="text-center py-15 text-h6"
      v-if="infoStore.advertisements && !!!infoStore.advertisements.data.length"
    >
      لا يوجد بيانات
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>