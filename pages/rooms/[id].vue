<script setup >
import { ref } from "vue";
import AssetsManager from "~/core/AssetsManager";
import { useInfoStore } from "~/stores/globalStore";
import { useRoute } from "vue-router";
import useClipboard from "vue-clipboard3";
// ==========[state]===========
const { toClipboard } = useClipboard();
const route = useRoute();
const infoStore = useInfoStore();
const page = ref(1);
const categoryId = ref("");
const roomDetails = ref(null);
// ===========[ACTIONS]=========
const status = ref("");
const errorMessage = ref("");
const error = ref(false);
const copied = ref(false);

const copyDialog = ref(false);
const dialogEl = ref(null);
const snackbar = ref(false);
const timeout = 2000;
// =============ACTIONS=====
const copy = async () => {
  try {
    const container = document.querySelector("#clipboard-container");
    await toClipboard(window.location.href, container);
    snackbar.value = true;
    copied.value = true;
    // alert("copied");
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (e) {
    console.error(e);
    snackbar.value = false;
    copied.value = false;
  }
};
const copyLink = computed(() => {
  if (process.client) {
    return window.location.href;
  }
});
// const copy = async () => {
//   try {
//     await toClipboard("Any text you like");
//     console.log("Copied to clipboard");
//   } catch (e) {
//     console.error(e);
//   }
// };
// const copy = (text) => {
//   const textArea = document.createElement("textarea");

//   textArea.style.width = "2em";
//   textArea.style.height = "2em";
//   // Clean up any borders.
//   textArea.style.border = "none";
//   textArea.style.outline = "none";
//   textArea.style.boxShadow = "none";

//   // Avoid flash of white box if rendered for any reason.
//   textArea.style.backgroundColor = "red";

//   textArea.value = window.location.href;

//   document.body.appendChild(textArea);

//   textArea.select();
//   // navigator.clipboard(textarea);

//   try {
//     var successful = document.execCommand("copy");
//     var msg = successful ? window.location.href : "unsuccessful";

//     alert("copied");
//     console.log(msg);
//   } catch (err) {
//     console.log("Oops, unable to copy");
//   }

//   document.body.removeChild(textArea);
// };

// const copy = () => {
//   try {
//     const linkElement = document.querySelector(".cp-link");
//     const tempInput = document.createElement("input");
//     // tempInput.value = linkElement.textContent.trim();
//     tempInput.value = window.location.href;
//     document.body.appendChild(tempInput);
//     tempInput.select();
//     tempInput.setSelectionRange(0, 99999); /* For mobile devices */
//     // Copy the selected text
//     document.execCommand("copy");
//     // navigator.clipboard.writeText(tempInput.value);
//     document.body.removeChild(tempInput);
//     alert("Link copied : " + tempInput.value);
//     copied.value = true;
//   } catch {
//     alert("Cannot copy");
//     copied.value = false;
//   }
// };

useAsyncData(() => {
  infoStore.roomDetails();
});

useAsyncData("fetchData", () => {
  infoStore.setRoomDetails(route.params.id);
});

onMounted(() => {});
onBeforeMount(() => {});
</script>

<template>
  <section class="room-details">
    <v-sheet color="transparent" height="314px" v-if="infoStore.roomDetails">
      <v-img
        :src="infoStore.roomDetails?.image"
        width="100%"
        height="100%"
        cover
      ></v-img>
    </v-sheet>
    <div class="d-flex align-center justify-space-between my-2">
      <div>
        <h3>{{ infoStore.roomDetails?.name }}</h3>
        <div class="d-flex align-center text-subtitle-2 my-2">
          <v-icon size="20" color="primary-75"
            >mdi mdi-map-marker-outline</v-icon
          >
          <p class="text-body-2">{{ infoStore.roomDetails?.region }}</p>
        </div>
      </div>

      <!-- ============Dialog=========== -->
      <v-dialog v-model="copyDialog" max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" color="surface-variant" variant="flat">
            <v-icon>mdi mdi-share-variant-outline</v-icon>
            المشاركة
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card color="surface-variant" dir="ltr" id="clipboard-container">
            <v-card-actions>
              <v-btn
                text="اغلاق"
                @click="isActive.value = false"
                color="white"
              ></v-btn>
            </v-card-actions>

            <div
              class="d-flex align-center justify-center copy-link text-subtitle-2"
            >
              <p class="cp-link">{{ copyLink }}</p>
              <button class="btn" @click="copy()">
                <v-icon
                  width="30px"
                  height="30px"
                  size="40"
                  v-if="copied"
                  color="green"
                  style="margin-top: -6px"
                  >mdi mdi-check</v-icon
                >
                <v-icon
                  width="30px"
                  height="30px"
                  size="30"
                  v-else
                  style="margin-top: -6px"
                  >mdi mdi-content-copy</v-icon
                >
              </button>

              <!-- <v-snackbar v-model="snackbar" :timeout="1000">
                تم النسخ
              </v-snackbar> -->
            </div>
          </v-card>
        </template>
      </v-dialog>
    </div>

    <!-- ============SECTION3 المشاهدات============= -->
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-sheet
          color="grey-darken-3"
          class="rounded-lg py-2 px-3 d-flex align-center"
        >
          <v-sheet
            color="grey-darken-2"
            class="rounded-xl d-flex align-center justify-center ml-4"
            width="50"
            height="50"
          >
            <v-img
              :src="AssetsManager.marketingIcon"
              alt=""
              width="25"
              height="25"
              bg-color="primary"
            ></v-img>
          </v-sheet>
          <div>
            <h6 class="text-secondary-75">المعرض</h6>
            <h3 class="text-white font-weight-black">
              {{ infoStore.roomDetails?.for_sale_ads_count }}
            </h3>
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="4" md="4">
        <v-sheet
          color="grey-darken-3"
          class="rounded-lg py-2 px-3 d-flex align-center"
        >
          <v-sheet
            color="grey-darken-2"
            class="rounded-xl d-flex align-center justify-center ml-4"
            width="50"
            height="50"
          >
            <v-img
              :src="AssetsManager.witness"
              alt=""
              width="25"
              height="25"
              bg-color="primary"
            ></v-img>
          </v-sheet>
          <div>
            <h6 class="text-secondary-75">عدد المشاهدات</h6>
            <h3 class="text-white font-weight-black">
              {{ infoStore.roomDetails?.for_sale_ads_count }}
            </h3>
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="4" md="4">
        <v-sheet
          color="grey-darken-3"
          class="rounded-lg py-2 px-3 d-flex align-center"
        >
          <v-sheet
            color="grey-darken-2"
            class="rounded-xl d-flex align-center justify-center ml-4"
            width="50"
            height="50"
          >
            <v-img
              :src="AssetsManager.sadan"
              alt=""
              width="25"
              height="25"
              bg-color="primary"
            ></v-img>
          </v-sheet>
          <div>
            <h6 class="text-secondary-75">السيارات المباعة</h6>
            <h3 class="text-white font-weight-black">
              {{ infoStore.roomDetails?.for_sale_ads_count }}
            </h3>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ===============[MAP SECTION ]===========-->

    <StaticSectionsMapSection
      :roomDetails="infoStore.roomDetails"
    ></StaticSectionsMapSection>
    <!-- ================[CARS ADVRERTISING]========== -->
    <StaticSectionsCarsAdvertising></StaticSectionsCarsAdvertising>
  </section>
</template>

<style lang="scss" scoped>
.share-link {
  border: 1px solid #fff;
  border-radius: 8px;
  background: $secondary-bg;
  padding: 8px;
  font-size: 12px;
}
.copy-link {
  height: 80px;
  padding: 0 13px;
  // padding-bottom: 15px;
  // .btn {
  //   margin-left: -10px;
  // }
  .cp-link {
    background: #fff;
    color: black;
    border-radius: 10px;
    width: 80%;
    padding: 5px;
    margin: auto;
    border: 0;
    outline: none;
    margin-left: 5px;
    // margin-right: 25px;
  }
}
</style>