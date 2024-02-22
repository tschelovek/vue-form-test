<template>
  <FormKit type="form" @submit="submitHandler">
    <FormKit
      type="text"
      name="name"
      id="name"
      validation="required|not:Admin|alpha_spaces"
      label="Имя"
      placeholder="Имя"
    />
    <FormKit
      type="tel"
      name="telephone"
      label="Номер телефона"
      placeholder="+7-xxx-xxx-xxxx"
      validation="[['matches', /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/]]"
      :validation-messages="{
        matches: 'Введите корректный телефонный номер',
      }"
      validation-visibility="dirty"
    />
    <FormKit
      type="email"
      name="email"
      label="Email"
      validation="required|email"
      validation-visibility="dirty"
      placeholder="example@foo.bar"
    />
    <FormKit
      type="file"
      name="file"
      label="Documents"
      accept=".pdf,.jpg,.png"
      help="Прикрепите файл .pdf, .jpg либо .png, размером не более 2Мб"
      multiple="false"
      v-model="file"
      :errors="fileErrors"
    />
    <FormKit
      type="checkbox"
      help="Do you agree to our terms of service?"
      name="terms"
      :value="true"
      validation="accepted"
      validation-visibility="dirty"
    >
      <template #label="context">
        <p>Я даю согласие на <a href="">обработку персональных данных</a></p>
      </template>
    </FormKit>
  </FormKit>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { setErrors } from "@formkit/vue";
const complete = ref(false);
const file = ref("");
const fileErrors = computed(() => {
  if (file.value.length > 0) {
    if (file.value[0].hasOwnProperty("file")) {
      if (parseInt(file.value[0].file.size) > 2097152) {
        return ["Файл слишком большой"];
      }
    }
  }
});

const submitHandler = async (data) => {
  const body = new FormData();

  body.append("name", data.name);
  body.append("telephone", data.telephone);
  body.append("email", data.email);

  data.file.forEach((fileItem) => {
    body.append("file", fileItem.file);
  });

  // We'll perform a real upload to httpbin.org
  const res = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: body,
  });

  if (res.ok) {
    complete.value = true;
  } else {
    setErrors("licenseForm", ["The server didn’t like our request."]);
  }
};
</script>

<style scoped></style>
