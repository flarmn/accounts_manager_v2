<template>
  <div class="account-card">
    <div class="account-card__cell-main">
      <input
        class="account-card__input"
        :value="formattedLabel"
        @input="onLabelInput($event.target.value)"
        placeholder="Значение"
        maxlength="50"
      />

      <select
        class="account-card__select"
        v-model="localType"
        @change="onTypeChange"
      >
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
    </div>

    <div class="account-card__cell-login">
      <div class="account-card__field">
        <input
          class="account-card__input"
          v-model="localLogin"
          @blur="onLoginBlur"
          :class="{ 'account-card__input--invalid': fieldErrors.login }"
          placeholder="Значение"
          maxlength="100"
        />
        <p v-if="fieldErrors.login" class="account-card__error">
          {{ fieldErrors.login }}
        </p>
      </div>

      <div v-if="localType === 'Локальная'" class="account-card__field">
        <div class="account-card__password-wrapper">
          <input
            :type="localPasswordVisible ? 'text' : 'password'"
            class="account-card__input"
            v-model="localPassword"
            @blur="onPasswordBlur"
            :class="{ 'account-card__input--invalid': fieldErrors.password }"
            placeholder="Значение"
            maxlength="100"
          />
          <button
            class="account-card__toggle-btn"
            @click.prevent="onTogglePassword"
          >
            {{ localPasswordVisible ? "🙈" : "👁️" }}
          </button>
        </div>
        <p v-if="fieldErrors.password" class="account-card__error">
          {{ fieldErrors.password }}
        </p>
      </div>
    </div>

    <button class="account-card__remove-btn" @click="onRemove"></button>
  </div>
</template>

<script>
import { computed, ref, watch, toRefs } from "vue";

export default {
  name: "AccountsTableRows",
  props: {
    index: { type: Number, required: true }, // Обязательно число
    account: { type: Object, required: true },
    fieldErrors: { type: Object, required: true },
    passwordVisible: { type: Boolean, required: true },
  },
  emits: [
    "update-label",
    "update-field",
    "validate-field",
    "toggle-password",
    "remove",
  ],
  setup(props, { emit }) {
    const { account, fieldErrors, passwordVisible } = toRefs(props);

    const localLogin = ref(account.value.login);
    const localPassword = ref(account.value.password);
    const localType = ref(account.value.type);
    const localLabelStr = ref("");
    const localPasswordVisible = ref(passwordVisible.value);

    const formattedLabel = computed(() =>
      account.value.label.map((item) => item.text).join("; ")
    );

    watch(
      () => account.value.label,
      (newLabelArr) => {
        localLabelStr.value = newLabelArr.map((item) => item.text).join("; ");
      },
      { immediate: true }
    );

    watch(
      () => account.value.login,
      (newVal) => {
        if (newVal !== localLogin.value) {
          localLogin.value = newVal;
        }
      }
    );
    watch(
      () => account.value.password,
      (newVal) => {
        if (newVal !== localPassword.value) {
          localPassword.value = newVal;
        }
      }
    );
    watch(
      () => account.value.type,
      (newVal) => {
        if (newVal !== localType.value) {
          localType.value = newVal;
        }
      }
    );
    watch(
      () => passwordVisible.value,
      (newVal) => {
        localPasswordVisible.value = newVal;
      }
    );

    function onLabelInput(value) {
      const arr = value
        .split(";")
        .map((text) => ({ text: text.trim() }))
        .filter((obj) => obj.text !== "");
      emit("update-label", props.index, arr);
    }

    function onTypeChange() {
      emit("update-field", props.index, "type", localType.value);
      emit("validate-field", props.index, "login", localLogin.value);
      emit("validate-field", props.index, "password", localPassword.value);
    }

    function onLoginBlur() {
      emit("validate-field", props.index, "login", localLogin.value);
      if (!fieldErrors.value.login) {
        emit("update-field", props.index, "login", localLogin.value);
      }
    }

    function onPasswordBlur() {
      if (localType.value === "Локальная") {
        emit("validate-field", props.index, "password", localPassword.value);
        if (!fieldErrors.value.password) {
          fieldErrors.value.password = "";
          emit("update-field", props.index, "password", localPassword.value);
        } else {
          emit("validate-field", props.index, "password", localPassword.value);
        }
      }
    }

    function onTogglePassword() {
      emit("toggle-password", props.index);
    }

    function onRemove() {
      emit("remove", props.index);
    }

    return {
      localLogin,
      localPassword,
      localType,
      localLabelStr,
      formattedLabel,
      localPasswordVisible,
      onLabelInput,
      onTypeChange,
      onLoginBlur,
      onPasswordBlur,
      onTogglePassword,
      onRemove,
    };
  },
};
</script>

<style scoped>
.account-card {
  display: flex;
  align-items: center;
  margin-top: 16px;
  column-gap: 12px;
}

.account-card__cell-main,
.account-card__cell-login {
  display: flex;
  column-gap: 12px;
}

.account-card__cell-main {
  min-width: 55%;
}

.account-card__cell-login {
  min-width: 40%;
  position: relative;
}

.account-card__field {
  position: relative;
  flex-shrink:1;
  width: 100%;
}

.account-card__cell-main .account-card__input, .account-card__cell-main .account-card__select {
  width: 50%;
  line-height: 28px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.account-card__cell-login {
	display:flex;
column-gap: 30px;
}


.account-card__cell-login .account-card__input, .account-card__cell-login .account-card__select {
  width: 100%;
  line-height: 28px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  flex-shrink: 0;

}

.account-card__input--invalid {
  border: 2px solid red;
  background-color: #ffe6e6;
}

.account-card__error {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: red;
  margin-top: 4px;
}

.account-card__password-wrapper {
  display: flex;
  align-items: center;
}

.account-card__toggle-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: -32px;
  font-size: 16px;
}

.account-card__remove-btn {
  width: 24px;
  height: 24px;
  background: url("@/assets/delete.png") no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
  margin-left: 20px;
}
</style>
