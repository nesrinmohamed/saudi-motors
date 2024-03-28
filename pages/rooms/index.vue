<script setup>
import axios from "axios";
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useInfoStore } from "~/stores/globalStore";
const title = ref("المعارض");
const infoStore = useInfoStore();

const filteredRooms = ref([]); //filterd rooms
const roomsFilterd = ref([]);
const newRooms = ref([]);
const page = ref(1);

const filters = reactive({
  region: "اختيار",
  type: "اختيار",
});
const type = ref([
  { name: "جديد", id: 1 },
  { name: "مستعمل", id: 0 },
]);

// ================

const setFilter = async () => {
  const fitlerTypeParam = !isNaN(parseInt(filters.type))
    ? "&is_new=" + parseInt(filters.type)
    : "";
  const fitlerRegionParam = !isNaN(parseInt(filters.region))
    ? "&region_id=" + parseInt(filters.region)
    : "";

  await axios
    .get(`showrooms?page=${page.value}${fitlerTypeParam}${fitlerRegionParam}`)
    .then((response) => {
      if (infoStore.rooms) {
        infoStore.rooms.showrooms.push(...response.data.data.showrooms);
        console.log(response.data.data);
        infoStore.rooms.meta = response.data.data.meta;
      } else {
        infoStore.rooms = response.data.data;
      }
    });
};
const loadMore = () => {
  page.value++;

  if (page.value == infoStore.rooms.meta.last_page) return;
  if (page.value > infoStore.rooms.meta.last_page) {
    page.value = infoStore.rooms.meta.last_page;
  }

  setFilter();
};
const searchBtn = () => {
  infoStore.rooms = null;
  page.value = 1;
  setFilter();
};
useAsyncData(() => {
  infoStore.setRooms();
});
useAsyncData("fetchData", () => {
  infoStore.setRegions();
});

// const setFilter = async (page = "") => {
//   // this.$nuxt.$loading.start();
//   const filterType = parseInt(filters.type);
//   if (type.value.id == 2) {
//     return;
//   }
//   await axios
//     .get(
//       `showrooms?region_id=${filters.region}${!!isNaN(filterType)&is_new=${filters.type}}&page=${page}`
//     )
//     .then((response) => {
//       infoStore.rooms = response.data.data;
//       console.log(response.data.data);
//     });
// };
// watch(page, (oldPage, newPage) => {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
//   setFilter(newPage);
// });

// onMounted(() => {
//   updatenewRooms();
// });
// function setFilter(rooms, region) {
//   // If no region is specified, return all products
//   if (!region) {
//     return rooms;
//   }
//   // Filter products based on the specified region
//   console.log("show rooms =>", region);
//   console.log("show rooms details =>", filterItems);
//   const filteredRooms = rooms.showrooms.filter(
//     (room) => room.region === region
//   );

//   return filteredRooms;
// }

// const filterdrooms = computed(() => {
//   return rooms.value.filter((room) =>
//     selectedRegion.value
//       ? room.region === selectedRegion.value
//       : true && selectedType.value
//       ? car.type === selectedType.value
//       : true
//   );
// });
</script>

<template>
  <section class="elm3ared-section">
    <!-- header-area -->
    <LayoutAppHeader :title="title"></LayoutAppHeader>
    <!-- end header-area -->

    <!-- FILTER CARS SECTION  -->

    <v-sheet
      :class="$vuetify.display.name"
      color="secondary-bg"
      width="100% "
      class="rounded-lg mt-5 text-main-text-color d-flex align-center py-5 mb-3"
    >
      <v-container>
        <v-row class="d-flex flex-wrap">
          <!-- city  -->
          <v-sheet color="secondary-bg" class="input" height="65px">
            <label class="text-main-text-color mb-2" color="white"
              >المدينة</label
            >

            <v-select
              v-if="infoStore.regions"
              v-model="filters.region"
              :items="infoStore.regions"
              item-title="name"
              item-value="id"
              rounded
              variant="outlined"
              color="#BDE2ED"
              base-color="#BDE2ED"
              append-inner-icon="mdi-chevron-down"
            >
            </v-select>
          </v-sheet>
          <!-- type  -->
          <v-sheet color="secondary-bg" class="input" height="65px">
            <label class="text-main-text-color mb-2" color="white">النوع</label>
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

          <v-btn
            width="88px"
            height="35px"
            @click="searchBtn"
            color="primary-dark-red"
            class="btn-search text-white outline-none border-none text-subtitle-2 mt-9 mx-1"
            prepend-icon="mdi mdi-magnify"
            >بحث</v-btn
          >
        </v-row>
      </v-container>
    </v-sheet>
    <div
      class="text-center py-15 text-h6"
      v-if="infoStore.rooms && !!!infoStore.rooms.showrooms.length"
    >
      لا يوجد بيانات
    </div>
    <!-- END FILTER CARS SECTION  -->

    <!-- SECTION CARDS -->
    <RoomsRoomSection
      :rooms="infoStore.rooms?.showrooms"
      :loadMore="loadMore"
    ></RoomsRoomSection>
    <!-- END SECTION CARDS -->

    <div
      class="mx-auto d-flex align-center justify-center mt-10"
      v-if="
        infoStore.rooms &&
        infoStore.rooms.meta.current_page < infoStore.rooms.meta.last_page
      "
    >
      <v-btn
        class="text-white text-capitalize py-2 px-2 rounded-lg"
        color="primary-400"
        @click="loadMore"
        >عرض المزيد
        <v-icon color="white" class="mr-1">mdi mdi-chevron-down</v-icon></v-btn
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
.v-sheet {
  margin: 3px;
  &.md {
    .input {
      width: 300px;
    }
  }
  &.sm {
    .input {
      width: 235px;
    }
  }
  &.xs {
    .input {
      width: 180px;
    }
  }
  .input {
    width: 400px;
  }
}
</style>