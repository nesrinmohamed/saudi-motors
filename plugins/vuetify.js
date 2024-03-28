/** @format */

// plugins/vuetify.js
import "@mdi/font/css/materialdesignicons.css";
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {aliases, fa} from "vuetify/iconsets/fa";
import {mdi} from "vuetify/iconsets/mdi";

const customLightTheme = {
    dark: false,
    colors: {
        background: "#282828",
        "loding-color": "#00adc4",
        "background-dark": "#1a1a1a",
        "secondary-bg": "#393939",
        primary: "#ffebeb",
        "primary-75": "#ffacac",
        "primary-100": "#ff8989",
        "primary-200": "#ff5757",
        "primary-300": "#ff3434",
        "primary-400": "#b32424",
        "primary-500": "#9c2020",
        "primary-dark-red": "#ad2323",

        secondary: "#ebe8e8",
        "secondary-bg-2": "#424242",
        "secondary-75": "#aba0a0",
        "secondary-100": "#887979",
        "secondary-150": "#444444",
        "secondary-180": "#333333",
        "secondary-200": "#553f3f",
        "secondary-300": "#321818",
        "secondary-400": "#231111",
        "secondary-500": "#1f0f0f",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
        "main-text-color-lighten": "#cbcbcb",
        "main-text-color": "#fff",
        "main-text-color-darken": "#6c6c6c",
    },
};
const customDarkTheme = {
    dark: true,
    colors: {
        background: "#f6f6f6",
        surface: "#FFFFFF",
        "on-surface": "#FFFFFF",
        primary: "#39B4BD",
        "primary-2": "#ff017b",
        "secondary-lighten": "#262228",
        secondary: "#252634",
        "secondary-darken": "#161417",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
        "main-text-color": "#6c6c6c",
        "main-text-color2": "#cbcbcb",
    },
};

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        locale: {
            // locale: 'ar',
            // fallback: 'ar',
            // rtl: {
            //     ar: true
            // }
        },
        icons: {
            defaultSet: "mdi",
            aliases,
            sets: {
                fa,
                mdi,
            },
        },
        components,
        directives,
        theme: {
            defaultTheme: "customLightTheme",
            themes: {
                customLightTheme,
                customDarkTheme,
            },
        },
    });
    nuxtApp.vueApp.use(vuetify);
});
