<script setup >
import { ref } from "vue";
import { useInfoStore } from "~/stores/globalStore";
import { useRoute } from "vue-router";
import axios from "axios";
const currentType = ref("notSold");
const loading = ref(false);
const infoStore = useInfoStore();
const route = useRoute();
const page = ref(1);
const filterdnotSold = async () => {
  await axios
    .get(`/advertisements?is_sold=0&showroom_id=${route.params.id}`)
    .then((response) => {
      infoStore.advertisements = response.data.data;
    });
};
const filtersSolid = async () => {
  await axios
    .get(`/advertisements?is_sold=1&showroom_id=${route.params.id}`)
    .then((response) => {
      infoStore.advertisements = response.data.data;
    });
};
const changeAdvertising = (value) => {
  currentType.value = value;
  if (currentType.value === "notSold") {
    filterdnotSold();
  }
  if (currentType.value === "isSold") {
    filtersSolid();
  }
};
const loadMore = () => {
  page.value++;
  console.log(page.value);
  if (page.value == infoStore.advertisements.meta.last_page) return;
  if (page.value > infoStore.advertisements.meta.last_page) {
    page.value = infoStore.advertisements.meta.last_page;
  }
  axios.get(`advertisements?page=${page.value}`).then((response) => {
    if (infoStore.advertisements) {
      infoStore.advertisements.data.push(...response.data.data.data);
      infoStore.advertisements.meta = response.data.data.meta;
    } else {
      infoStore.advertisements = response.data.data;
    }
  });
};
onMounted(() => {
  filterdnotSold();
});
</script>

<template>
  <div class="cars-advertising">
    <v-sheet
      color="secondary-180"
      class="rounded-xl mx-auto d-flex align-center justify-center mb-5"
      width="400px"
      height="51px"
    >
      <button
        class="btn"
        :class="{ active: currentType === 'notSold' }"
        @click="changeAdvertising('notSold')"
      >
        إعلانات البيع
      </button>
      <button
        class="btn"
        :class="{ active: currentType === 'isSold' }"
        @click="changeAdvertising('isSold')"
      >
        إعلانات مباعة
      </button>
    </v-sheet>

    <div v-if="currentType === 'notSold'">
      <CarsSectionsGridCarsSection></CarsSectionsGridCarsSection>
    </div>
    <div v-else>
      <CarsSectionsGridCarsSection></CarsSectionsGridCarsSection>
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
        <v-icon color="white" class="mr-1">mdi mdi-chevron-down</v-icon></v-btn
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  background: $secondary-150;
  color: #fff;
  border-radius: 20px;
  width: 48%;
  height: 80%;
  margin: 0 3px;
  &.active {
    background: $primary-500;
  }
}
</style>