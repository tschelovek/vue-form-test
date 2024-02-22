<template>
  <button type="button" @click="() => open()">Открыть окно</button>
  <ModalsContainer />
</template>

<script setup lang="ts">
import Vueform from "./components/Vueform.vue";
import { ModalsContainer, useModal } from "vue-final-modal";
import ModalConfirmPlainCss from "./components/ModalConfirmPlainCss.vue";

const { open, close } = useModal({
  component: ModalConfirmPlainCss,
  attrs: {
    title: "Тестовое задание для Bquadro",
    onConfirm() {
      close();
    },
  },
  slots: {
    default: Vueform,
  },
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
