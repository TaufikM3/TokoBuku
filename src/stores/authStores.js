import { defineStore } from 'pinia';
import { ref } from 'vue';
import customFetch from '@/api';

export const useAuthStores = defineStore('user', () => {
  const dialog = ref(false);
  const errorMsg = ref(null);
  const errorAlert = ref(false);
  const currentUser = ref(localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null)

  const toggleDialog = () => {
    dialog.value = !dialog.value;
  };

  const loginUser = async (inputData) => {
    if (!inputData.email || !inputData.password) {
      errorAlert.value = true;
      errorMsg.value = "Email dan Password harus diisi.";
      return;
    }

    try {
      const { data } = await customFetch.post('/auth/login', {
        email: inputData.email,
        password: inputData.password
      })
      currentUser.value = data.data
      localStorage.setItem("user", JSON.stringify(data.data))

      console.log(data)
      dialog.value = false


      console.log(data);
      dialog.value = false;
      errorAlert.value = false;
      errorMsg.value = null;
    } catch (error) {
      errorAlert.value = true;
      errorMsg.value = error.response?.data?.message || "Terjadi kesalahan saat login.";
      console.log(error);
    }
  }

  return {
    dialog,
    toggleDialog,
    loginUser,
    errorMsg,
    errorAlert,
    currentUser
  };
});
