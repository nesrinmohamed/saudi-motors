import {defineStore} from "pinia";
import axios from "axios";

export const useInfoStore = defineStore("info", {
    state: () => ({
        rooms: null,
        roomDetails: null,
        regions: null,
        info: null,
        logo: null,
        advertisements: null,
        advertisementId: null,
        factories: null,
        factoryId: null,
        packages: null,
    }),
    actions: {
        async setRooms() {
            await axios
            .get("/showrooms")
            .then((res) => {
                this.rooms = res.data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        },

        async setRoomDetails(id) {
            await axios
            .get(`/showrooms/${id}`)
            .then((res) => {
                this.roomDetails = res.data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        async setRegions() {
            await axios
            .get("/regions")
            .then((res) => {
                this.regions = res.data.data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        async setWebsitInfo() {
            await axios
            .get("/infos")
            .then((res) => {
                this.info = res.data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        },

        async setAdvertisements() {
            await axios
            .get("/advertisements")
            .then((res) => {
                this.advertisements = res.data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        },

        async setAdvertismenetDetails(id) {
            await axios
            .get(`/advertisements/${id}`)
            .then((res) => {
                this.advertisementId = res.data.data;
                console.log("res=>", res);
            })
            .catch((err) => {
                console.error(err);
            });
        },
        async setFactory() {
            await axios
            .get("/factories")
            .then((res) => {
                this.factories = res.data.data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        async setFactoryId(id) {
            await axios
            .get(`/factory-details/${id}`)
            .then((res) => {
                this.factoryId = res.data.data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        async setPackages() {
            await axios
            .get(`/packages`)
            .then((res) => {
                this.packages = res.data.data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        },
    },
});
