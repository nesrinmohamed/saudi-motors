


<script setup >
import { ref } from "vue";
import { useRouter } from "vue-router";
import RoutesManager from "../../core/RoutesManager";
import { useDisplay } from "vuetify";

// ===========[STATE]===========
const display = useDisplay();
const router = useRouter();

const items = ref([
  { state: "اختيار", abbr: "FL", type: "kia", from: "1992", to: "2020" },
  { state: "اختيار", abbr: "GA", type: "chevron", from: "1992", to: "2020" },
  { state: "اختيار", abbr: "NE", type: "chevron", from: "1992", to: "2020" },
  {
    state: "اختيار",
    abbr: "CA",
    type: "chevron",
    from: "1992",
    to: "2020",
  },
  { state: "اختيار", abbr: "NY", type: "chevron", from: "1992", to: "2020" },
  { state: "اختيار", abbr: "NY", type: "chevron", from: "1992", to: "2020" },
  { state: "اختيار", abbr: "NY", type: "chevron", from: "1992", to: "2020" },
  { state: "اختيار", abbr: "NY", type: "chevron", from: "1992", to: "2020" },
  { state: "اختيار", abbr: "NY", type: "chevron", from: "1992", to: "2020" },
  { state: "اختيار", abbr: "NY", type: "chevron", from: "1992", to: "2020" },
]);
const selectedManfucture = ref("اختيار");
const selectedRegoin = ref("اختيار");
const selectedType = ref("اختيار");
const selectedYearFrom = ref("اختيار");
const selectedYearTo = ref("اختيار");

const selectedOption = ref(null);
// const search = () => {
//   console.log("search");
// };
</script>

<template>
  <v-sheet
    color="secondary-bg"
    min-height="129px"
    width="100% "
    class="tabs rounded-lg mt-5 text-main-text-color d-flex align-center py-5"
    :class="$vuetify.display.name"
  >
    <v-container>
      <v-row class="d-flex flex-wrap">
        <!-- المصنع  -->
        <v-sheet color="secondary-bg" class="input">
          <label class="text-main-text-color mb-2" color="white">المصنع</label>
          <v-select
            v-model="selectedManfucture"
            :items="items"
            item-title="name"
            item-value="id"
            variant="outlined"
            color="#BDE2ED"
            base-color="#BDE2ED"
            append-inner-icon="mdi-chevron-down"
          >
          </v-select>
        </v-sheet>
        <!-- الفئة -->
        <v-sheet color="secondary-bg" class="input">
          <label class="text-main-text-color mb-2" color="white">الفئة</label>
          <v-select
            v-model="selectedRegoin"
            :items="items"
            item-title="state"
            item-value="id"
            variant="outlined"
            color="#BDE2ED"
            base-color="#BDE2ED"
            append-inner-icon="mdi-chevron-down"
          >
          </v-select>
        </v-sheet>
        <!-- النوع -->
        <v-sheet color="secondary-bg" class="input">
          <label class="text-main-text-color mb-2" color="white">النوع</label>
          <v-select
            v-model="selectedType"
            :items="items"
            item-title="state"
            item-value="id"
            variant="outlined"
            color="#BDE2ED"
            base-color="#BDE2ED"
            append-inner-icon="mdi-chevron-down"
          >
          </v-select>
        </v-sheet>
        <!-- السنة -->
        <v-sheet color="secondary-bg" class="input" width="265px">
          <label class="text-main-text-color mb-2" color="white">السنة </label>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedYearFrom"
                :items="items"
                item-title="from"
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
                v-model="selectedYearTo"
                :items="items"
                item-title="to"
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
          height="35px"
          color="primary-dark-red"
          class="btn-search text-white outline-none border-none text-subtitle-2 mt-9 mx-1"
          prepend-icon="mdi mdi-magnify"
          @click="router.push(RoutesManager.search)"
          >بحث</v-btn
        >
      </v-row>
    </v-container>
  </v-sheet>
</template>
<style lang="scss" scoped>
.v-sheet {
  margin: 3px;
  &.md {
    .input {
      width: 150px;
    }
  }

  .input {
    width: 256px;
    height: 65px;
  }
}
</style>