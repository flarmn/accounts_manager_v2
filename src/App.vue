<template>
  <div class="accounts-form">
    <AccountsHeader @add="addAccount" />

    <InfoMessage />

    <AccountsTableMain
      :accounts="accounts"
      :errors="errors"
      :passwordVisible="passwordVisible"
      @update-label="updateLabel"
      @update-field="updateField"
      @validate-field="validateField"
      @toggle-password="togglePasswordVisibility"
      @remove="removeAccount"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useAccountsStore } from '@/stores/accountsStore';
import AccountsHeader from '@/components/AccountsHeader.vue';
import InfoMessage from '@/components/InfoMessage.vue';
import AccountsTableMain from '@/components/AccountsTable/AccountsTableMain.vue';
import { validateLogin, validatePassword } from '@/services/validators';

const store = useAccountsStore();
const accounts = computed(() => store.accounts);

const errors = reactive({});

const passwordVisible = reactive({});

function addAccount() {
  store.addAccount();
}

function removeAccount(index) {
  store.removeAccount(index);
  delete errors[index];
  delete passwordVisible[index];
}

function updateField(index, field, value) {
  if (field === 'login') {
    const { isValid, errorText } = validateLogin(value);
    if (!errors[index]) errors[index] = {};
    if (!isValid) {
      errors[index].login = errorText;
    } else {
      delete errors[index].login;
      if (Object.keys(errors[index]).length === 0) {
        delete errors[index];
      }
      store.updateAccount(index, field, value);
    }
  }

  if (field === 'password') {
    const account = store.accounts[index];
    if (account && account.type === 'Локальная') {
      const { isValid, errorText } = validatePassword(value);
      if (!errors[index]) errors[index] = {};
      if (!isValid) {
        errors[index].password = errorText;
      } else {
        delete errors[index].password;
        if (Object.keys(errors[index]).length === 0) {
          delete errors[index];
        }
        store.updateAccount(index, field, value);
      }
    } else {
      if (errors[index]) {
        delete errors[index].password;
        if (Object.keys(errors[index]).length === 0) {
          delete errors[index];
        }
      }
      store.updateAccount(index, field, value);
    }
  }

  if (field === 'type') {
    store.updateAccount(index, field, value);
    if (value === 'LDAP' && errors[index]?.password) {
      delete errors[index].password;
      if (Object.keys(errors[index]).length === 0) {
        delete errors[index];
      }
    }
  }
}

function validateField(index, field, value) {
  if (!errors[index]) errors[index] = {};

  if (field === 'login') {
    const { isValid, errorText } = validateLogin(value);
    if (!isValid) {
      errors[index].login = errorText;
    } else {
      delete errors[index].login;
      if (Object.keys(errors[index]).length === 0) {
        delete errors[index];
      }
    }
  }

  if (field === 'password') {
    const account = store.accounts[index];
    if (account && account.type === 'Локальная') {
      const { isValid, errorText } = validatePassword(value);
      if (!isValid) {
        errors[index].password = errorText;
      } else {
        delete errors[index].password;
        if (Object.keys(errors[index]).length === 0) {
          delete errors[index];
        }
      }
    } else {
      if (errors[index]) {
        delete errors[index].password;
        if (Object.keys(errors[index]).length === 0) {
          delete errors[index];
        }
      }
    }
  }
}

function togglePasswordVisibility(index) {
  passwordVisible[index] = !passwordVisible[index];
}

function updateLabel(index, newLabelArr) {
  store.updateAccount(index, 'label', newLabelArr);
}
</script>

<style lang="css" scoped>
.accounts-form{
  width: 75%;
  margin:auto;
}
</style>