/*##########[ IMPORTS ]##########*/
import {defineStore} from "pinia";
import images from "~/core/AssetsManager";
import routeManager from "~/core/RoutesManager";
import {useDisplay} from "vuetify";
import {useNotification} from "@kyvg/vue3-notification";
import RoutesManager from "~/core/RoutesManager";
import AssetsManager from "~/core/AssetsManager";

// const { t } = useI18n();

export const useSharedStore = defineStore("shared", () => {
    /*##########[ DEFINES ]##########*/
    const display = useDisplay();
    const {notify} = useNotification();
    const router = useRouter();

    const {t} = useI18n;

    /*##########[ STATE ]##########*/
    const notifications = ref([]);
    const navLinks = ref([
        {path: RoutesManager.home, title: "الصفحة الرئيسية"},
        {path: RoutesManager.elM3ared, title: "المعارض"},
        {path: RoutesManager.useCars, title: "السيارات المستعملة"},
        {path: RoutesManager.newCars, title: "السيارات الجديدة"},
    ]);
    const pageLinks = ref([
        {path: RoutesManager.home, title: "جميع السيارات", image: AssetsManager.trafficJam},
        {path: RoutesManager.useCars, title: "السيارات المستعملة", image: AssetsManager.electricCar},
        {path: RoutesManager.newCars, title: "السيارات الجديدة", image: AssetsManager.carWash},
    ]);
    const loading = ref([]);

    const lang = [
        {prefix: "en", name: "English"},
        {prefix: "ar", name: "العربية"},
        {prefix: "fr", name: "France"},
    ];
    /*##########[ COMPUTED ]##########*/
    const isMobile = computed(() => display.mobile.value);

    /*##########[ MUTATIONS ]##########*/
    const LOADING_START = (payload) => {
        loading.value.push(payload);
    };
    const LOADING_STOP = (payload) => {
        loading.value.splice(loading.value.indexOf(payload), 1);
    };
    const ErrorHandler = (name, error) => {
        console.log(name, error.message);

        if (!!error.data.error) {
            const err = error.data.error;
            if (err.status_code == 401) {
                // router.push(routeManager.login);
                // return;
            }
            notify({
                type: "error",
                title: "Failed",
                text: err.message,
            });
        }
    };
    const SET_NOTIFICATION = (payload) => {
        notifications.value = payload;
    };
    const RESET_NOTIFICATION = () => {
        notifications.value = [];
    };
    const ADD_NOTIFICATION = (payload) => {
        notify({
            type: "info",
            title: payload.title,
            text: payload.body,
        });
        notifications.value.push(payload);
    };
    const REMOVE_NOTIFICATION = (index) => {
        notifications.value.splice(index, 1);
    };

    /*##########[ ACTIONS ]##########*/
    const getNotifications = async () => {
        useAppFetch()
        .getNotifications()
        .then((response) => {
            SET_NOTIFICATION(response.data);
        })
        .catch((error) => {
            ErrorHandler("notifications error ", error);
            console.log("get notification error ", error.message);
        });
    };

    /*##########[ RETURNS ]##########*/
    return {
        navLinks,
        pageLinks,
        isMobile,
        loading,
        lang,
        notifications,
        SET_NOTIFICATION,
        ADD_NOTIFICATION,
        REMOVE_NOTIFICATION,
        RESET_NOTIFICATION,
        LOADING_START,
        LOADING_STOP,
        ErrorHandler,
        getNotifications,
    };
});
