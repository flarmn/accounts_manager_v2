<template>
  <div class="accounts-form">

    <!-- Здесь мы подписываемся на событие add -->
    <AccountsHeader @add="addAccount" />

    <InfoMessage />

    <!-- 
    <div class="info-message_container">
      <img src="@/assets/question_mark.png" class="info-message_sign" />
      <p class="info-message_text">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </p>
    </div>

    -->

    <div class="accounts-form_table-header">
      <div class="accounts-form_column-name_main-section">
        <label class="accounts-form_column-name">Метка</label>
        <label class="accounts-form_column-name">Тип записи</label>
      </div>
      <div class="accounts-form_column-name_login-section">
        <label class="accounts-form_column-name">Логин</label>
        <label class="accounts-form_column-name">Пароль</label>
      </div>
    </div>

    <div
      v-for="(account, index) in accounts"
      :key="account.id"
      class="account-card"
    >
      <div class="account-card_cell_main">
        <input
          :value="formatLabel(account.label)"
          @input="updateLabel(index, $event.target.value)"
          placeholder="Значение"
          maxlength="50"
        />

        <select
          v-model="account.type"
          @change="() => validateAndUpdate(index, 'type', account.type)"
        >
          <option value="LDAP">LDAP</option>
          <option value="Локальная">Локальная</option>
        </select>
      </div>

      <div class="account-card_cell_login">
        <div class="account-card_cell_login-field">
          <input
            v-model="account.login"
            @blur="() => validateAndUpdate(index, 'login', account.login)"
            placeholder="Значение"
            :class="{ invalid: errors[index]?.login }"
            maxlength="100"
          />
          <div v-if="errors[index]?.login" class="error-message">
            {{ errors[index].login }}
          </div>
        </div>

        <div
          class="account-card_cell_login-field"
          v-if="account.type === 'Локальная'"
        >
          <input
            :type="passwordVisible[index] ? 'text' : 'password'"
            v-model="account.password"
            @blur="() => validateAndUpdate(index, 'password', account.password)"
            placeholder="Значение"
            :class="{ invalid: errors[index]?.password }"
            maxlength="100"
          />
          <div v-if="errors[index]?.password" class="error-message">
            {{ errors[index].password }}
          </div>
        </div>

        <button
          class="password-visibility-btn"
          @click.prevent="togglePasswordVisibility(index)"
          v-if="account.type === 'Локальная' && account.password"
        >
          {{ passwordVisible[index] ? '🙈' : '👁️' }}
        </button>
      </div>

      <button class="remove-btn" @click="removeAccount(index)"></button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAccountsStore } from '@/stores/accounts';

import AccountsHeader from '@/components/AccountsHeader.vue';
import InfoMessage from '@/components/InfoMessage.vue';

//
// 1. Регистрируем компонент AccountsHeader
//
//const components = { AccountsHeader };

//
// 2. Pinia-стор и реактивные данные
//
const store = useAccountsStore();
const accounts = computed(() => store.accounts);

// Ошибки валидации для каждой строки
const errors = ref({});

// Видимость пароля для каждой строки
const passwordVisible = ref({});

//
// 3. Функция добавления записи.
//    Поскольку мы в <script setup>, она автоматически становится доступной в шаблоне.
//
function addAccount() {
  console.log('Adding account');
  store.addAccount();
}

//
// 4. Функция удаления записи
//
function removeAccount(index) {
  store.removeAccount(index);
  delete errors.value[index];
  delete passwordVisible.value[index];
}

//
// 5. Преобразование массива меток в строку и обратно
//
function formatLabel(label) {
  if (!Array.isArray(label)) return '';
  return label.map((item) => item.text).join('; ');
}

function updateLabel(index, value) {
  const arr = value
    .split(';')
    .map((text) => ({ text: text.trim() }))
    .filter((obj) => obj.text !== '');
  store.updateAccount(index, 'label', arr);
}

//
// 6. Переключение видимости пароля
//
function togglePasswordVisibility(index) {
  passwordVisible.value[index] = !passwordVisible.value[index];
}

//
// 7. Валидация и сохранение: если ошибок нет, сохраняем
//
function validateAndUpdate(index, field, value) {
  if (!errors.value[index]) {
    errors.value[index] = {};
  }

  if (field === 'login') {
    if (!value.trim()) {
      errors.value[index].login = 'Логин не может быть пустым';
    } else {
      delete errors.value[index].login;
    }
  }

  if (field === 'password') {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!value.trim()) {
      errors.value[index].password = 'Пароль не может быть пустым';
    } else if (!passwordRegex.test(value)) {
      errors.value[index].password =
        'Пароль должен содержать минимум 8 символов, включая буквы и цифры';
    } else {
      delete errors.value[index].password;
    }
  }

  // Если ошибок нет, обновляем стор
  if (Object.keys(errors.value[index] || {}).length === 0) {
    store.updateAccount(index, field, value);
  }
}
</script>

<style>
.account-form {
  max-width: 70%;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
}

/*
.info-message_container {
  display: flex;
  height: 30px;
  background: lightgrey;
  align-items: center;
  margin-bottom: 16px;
}

.info-message_sign {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}

.info-message_text {
  margin-left: 10px;
  font-size: 14px;
}
*/ 

.accounts-form_table-header {
  display: flex;
  margin-top: 25px;
  align-items: center;
  width: 100%;
  column-gap: 20px;
}

.accounts-form_column-name_main-section,
.account-card_cell_main,
.accounts-form_column-name_login-section,
.account-card_cell_login {
  display: flex;
  min-width: 55%;
  column-gap: 20px;
}

.accounts-form_column-name_login-section,
.account-card_cell_login {
  min-width: 40%;
}

.account-card {
  display: flex;
  margin-top: 10px;
  align-items: center;
  width: 100%;
  column-gap: 20px;
}

.account-card_cell_main,
.account-card_cell_login {
  display: flex;
  column-gap: 20px;
  flex-grow: 1;
}

.account-card_cell_login-field {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

input,
select {
  display: flex;
  width: 100%;
  border-radius: 6px;
  line-height: 25px;
  border: 1px solid #ccc;
  padding-left: 8px;
}

.invalid {
  border: 2px solid red;
  background-color: #ffe6e6;
}

.error-message {
  font-size: 12px;
  color: red;
  margin-top: 4px;
}

.password-visibility-btn {
  margin-left: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.remove-btn {
  width: 24px;
  height: 24px;
  background: url('@/assets/delete.png') no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
}
</style>
