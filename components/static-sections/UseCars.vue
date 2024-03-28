<script setup >
// ======[IMPORT]=========
import { ref } from "vue";
import AssetsManager from "~/core/AssetsManager";
import { useDisplay } from "vuetify";
import { useInfoStore } from "~/stores/globalStore";
import axios from "axios";

// ==========[STATE]======
const infoStore = useInfoStore();
const display = useDisplay();
const tab = ref("all");
const showTabs = ref("abbs");
const loading = ref(false);
const page = ref(1);
const currentTab = ref("all");
const oldest = ref("");
const newest = ref("");
const lowerPrice = ref("");
const higherPrice = ref("");
// ==========ACTIONS =========

const changeShowTabs = (value) => {
  showTabs.value = value;
};

const setTab = (tab) => {
  currentTab.value = tab;

  if (currentTab.value === "all") {
    setFilterAll();
  }
  if (currentTab.value == "newest") {
    filterdByNewest();
  }
  if (currentTab.value === "oldest") {
    filterdByOldest();
  }
  if (currentTab.value === "lowerPrice") {
    filterdByLowerPrice();
  }
  if (currentTab.value === "higherPrice") {
    filterdByHigherPrice();
  }
};
const setFilterAll = async () => {
  await axios.get(`/advertisements?is_new=0`).then((response) => {
    infoStore.advertisements.data = response.data.data.data;
    infoStore.advertisements.meta = response.data.data.meta;
  });
};

const filterdByNewest = async () => {
  await axios.get(`/advertisements?is_new=0&newest=`).then((response) => {
    infoStore.advertisements.data = response.data.data.data;
  });
};

const filterdByOldest = async () => {
  await axios.get(`/advertisements?is_new=0&oldest=`).then((response) => {
    infoStore.advertisements.data = response.data.data.data;
  });
};
const filterdByLowerPrice = async () => {
  await axios.get(`/advertisements?is_new=0&oldest=`).then((response) => {
    infoStore.advertisements.data = response.data.data.data;
  });
};

const filterdByHigherPrice = async () => {
  await axios.get(`/advertisements?is_new=0&higher_price=`).then((response) => {
    infoStore.advertisements.data = response.data.data.data;
  });
};

const setFilter = async () => {
  await axios
    .get(`/advertisements?is_new=0&oldest=&newest=0&lower_price=&higher_price=`)
    .then((response) => {
      if (infoStore.advertisements) {
        infoStore.advertisements.data.push(...response.data.data);
        infoStore.advertisements.meta = response.data.data.meta;
      } else {
        infoStore.advertisements = response.data.data;
      }
    });
};

// ===========[ACTIONS]=========
const loadMore = () => {
  page.value++;

  if (page.value == infoStore.advertisements.meta.last_page) return;
  if (page.value > infoStore.advertisements.meta.last_page) {
    page.value = infoStore.advertisements.meta.last_page;
  }

  setFilter();
};

onMounted(() => {});
</script>

<template>
  <div class="tabs-filter" :class="$vuetify.display.name">
    <v-container>
      <v-row class="d-flex">
        <v-col cols="12" sm="9">
          <v-btn
            @click="setTab('all')"
            :class="{ active: currentTab === 'all' }"
            class="btn"
          >
            الكل
          </v-btn>
          <v-btn
            @click="setTab('newest')"
            :class="{ active: currentTab === 'newest' }"
            class="btn"
          >
            الأحدث
          </v-btn>
          <v-btn
            @click="setTab('oldest')"
            :class="{ active: currentTab === 'oldest' }"
            class="btn"
          >
            الأقدم
          </v-btn>
          <v-btn
            @click="setTab('higherPrice')"
            :class="{ active: currentTab === 'higherPrice' }"
            class="btn"
          >
            الأعلى سعرا
          </v-btn>
          <v-btn
            @click="setTab('lowerPrice')"
            :class="{ active: currentTab === 'lowerPrice' }"
            class="btn"
          >
            الأقل سعرا
          </v-btn>
        </v-col>

        <v-col sm="3">
          <v-sheet
            v-if="!$vuetify.display.xs"
            color="transparent "
            width="206px"
            class="d-flex align-center justify-center"
          >
            <h5>طريقة العرض :</h5>
            <v-btn
              class="btn btn-icon"
              size="30"
              @click="changeShowTabs('abbs')"
              :class="{ active: showTabs === 'abbs' }"
              ><v-icon>mdi mdi-apps</v-icon></v-btn
            >
            <v-btn
              class="btn btn-icon"
              size="30"
              @click="changeShowTabs('list')"
              :class="{ active: showTabs === 'list' }"
              ><v-icon>mdi mdi-format-list-bulleted-square</v-icon></v-btn
            >
          </v-sheet>
        </v-col>
      </v-row>

      <!-- =========== [gridlist] ========== -->
      <div v-if="showTabs == 'abbs'">
        <CarsSectionsGridCarsSection></CarsSectionsGridCarsSection>
      </div>
      <!-- ===========  LIST Card========== -->

      <div v-else>
        <CarsSectionsListCarsSection></CarsSectionsListCarsSection>
      </div>

      <div
        class="mx-auto d-flex align-center justify-center mt-10"
        v-if="
          infoStore.advertisements &&
          infoStore.advertisements.meta.current_page <
            infoStore.advertisements.meta.last_page
        "
      >
        <v-btn
          class="text-white text-capitalize py-2 px-2 rounded-lg"
          color="primary-400"
          @click="loadMore"
          >عرض المزيد
          <v-icon color="white" class="mr-1"
            >mdi mdi-chevron-down</v-icon
          ></v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.tabs-filter {
  .v-row {
    margin: 0 !important;
  }
  .btn {
    border: 0;
    border-radius: 8px;
    outline: none;
    background-color: #616161;
    color: $secondary-75;
    font-size: $text-size-sm;
    padding: 0 5px;
    margin: 2px;
    text-align: right;
    font-weight: 400;
    line-height: 19.22px;
    &.active {
      color: #fff;
      border: 1px solid white;
    }
    &.btn-icon {
      background: transparent;
      border-radius: 0;
      &.active {
        color: #fff;
        background: #616161;
      }
    }
  }
  .base-card-car {
    border: 1px solid $secondary-200;
  }
}
</style>