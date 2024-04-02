/** @format */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    // ta?rget: "static",
    ssr: false,
    app: {
        head: {
            titleTemplate: "Saudi-Motors",
            title: "Saudi Motors",
            meta: [
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1"},
                {hid: "description", name: "description", content: "Saudi Motors "},
                {name: "format-detection", content: "telephone=no"},
                {name: "google", content: "notranslate"},
            ],
            // link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
        },
        baseURL: "/",
    },

    // devServer: {
    //     host: "0.0.0.0",
    // },
    css: ["vuetify/lib/styles/main.sass", "~/assets/sass/main.scss", "animate.css/animate.min.css"],

    modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
    build: {
        transpile: ["vuetify"],
    },
    runtimeConfig: {
        public: {
            baseURL: "https://saudimoter.com/dashboard/api/v1/website",
            apiBase: "https://saudimoter.com/dashboard/api/v1/website",
            // googleLoginURL: process.env.GOOGLE_LOGIN_URL || "",
        },
    },

    plugins: ["~/plugins/axios.js"],
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    // axios: {
    //     // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    //     baseURL: "https://heda.azq1.com/saudi-motors/api/v1/website",
    //     headers: {
    //         common: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //     },
    // },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
            @use "@/assets/sass/abstracts" as *;
            @use "@/assets/sass/global" as *;
          `,
                },
            },
        },
    },

    i18n: {
        // vueI18n: './i18n.config.ts' ,// if you are using custom path, default
        lazy: true,
        langDir: "lang/",
        defaultLocale: "ar",
        strategy: "prefix",

        locales: [
            {code: "ar", name: "العربية", file: "ar.json", dir: "rtl"},
            {code: "en", name: "English", file: "en.json", dir: "ltr"},
        ],
    },

    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            "defineStore", // import { defineStore } from 'pinia'
            ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },
});
