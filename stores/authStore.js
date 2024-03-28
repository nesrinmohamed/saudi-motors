import { defineStore } from "pinia";
import { useSharedStore } from "./sharedStore";
import EndPoints from "~/core/EndPoints";
import { useNotification } from "@kyvg/vue3-notification";

export const useAuthStore = defineStore("auth", () => {
  // const { notificationsChannel } = usePusher();
  const { notify } = useNotification();
  const config = useRuntimeConfig();
  const sharedStore = useSharedStore();
  
  const user = ref(null);
  const isLoggedIn = ref(false);
  const token = computed(() => {
    const paramToken =
      new URLSearchParams(window.location.search).get("token") || null;
    const storedToken = window.localStorage.getItem("token") || null;

    return paramToken || storedToken;
  });

  const setToken = (t) => {
    window.localStorage.removeItem("token");
    window.localStorage.setItem("token", t);
  };
  const socialMediaLogin = async (type) => {
    if (type === "google") {
      window.location.href = config.public.googleLoginURL;
    }
  };
  const loginSuccess = async () => {
    const t = new URLSearchParams(window.location.search).get("token");

    setToken(t);

    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      notify({
        type: "success",
        title: "Authorization",
        text: "You have been logged in!",
      });
    }, 1000);

    await fetchMeData();
  };
  const loginFilled = () => {};
  const fetchMeData = async () => {
    sharedStore.LOADING_START("me");
    await useAppFetch()
      .fetchMeEvent()
      .then((response) => {
        user.value = response.data;
        isLoggedIn.value = true;
        sharedStore.getNotifications();
        // notificationsChannel(user.value.id).bind("track-request-created", (data) => {

        //     sharedStore.ADD_NOTIFICATION(data);
        // });
      })
      .catch((error) => {
        sharedStore.ErrorHandler("Me Error ", error);
      })
      .finally(() => {
        sharedStore.LOADING_STOP("me");
      });
  };
  const logout = async () => {
    sharedStore.LOADING_START("logout");
    await useAppFetch()
      .logoutEvent()
      .then((response) => {
        window.localStorage.removeItem("token");
        user.value = null;
        isLoggedIn.value = false;

        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          notify({
            type: "success",
            title: "Authorization",
            text: "You have been logged Out!",
          });
        }, 1000);

        window.location.reload();
      })
      .catch((error) => {
        sharedStore.ErrorHandler("Logout Error ", error);
      })
      .finally(() => {
        sharedStore.LOADING_STOP("logout");
      });
  };
  const updateProfile = async (formData) => {
    // sharedStore.LOADING_START('me');
    await useAppFetch()
      .updateProfileEvent(formData)
      .then((response) => {
        user.value = response.data;

        notify({
          type: "success",
          title: "Update Profile",
          text: response.meta.message,
        });
      })
      .catch((error) => {
        sharedStore.ErrorHandler("Update Profile Error ", error);
      })
      .finally(() => {
        // sharedStore.LOADING_STOP('me');
      });
  };

  return {
    user,
    isLoggedIn,
    token,
    fetchMeData,
    socialMediaLogin,
    loginSuccess,
    loginFilled,
    setToken,
    logout,
    updateProfile,
  };
});
