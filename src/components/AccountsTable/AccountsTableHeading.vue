<template>
  <div class="accounts-form__table-header">
    <div class="accounts-form__column-name__main-section">
      <label class="accounts-form__column-name">Метка</label>
      <label class="accounts-form__column-name">Тип записи</label>
    </div>
    <div class="accounts-form__column-name__login-section,">
      <label class="accounts-form__column-name">Логин</label>
      <label class="accounts-form__column-name">Пароль</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountsTableHeading'
};
</script>

<style scoped>
.accounts-form__table-header {
  display: flex;
  margin-top: 25px;
  align-items: center;
  width: 100%;
  column-gap: 20px;
}

.accounts-form__column-name__main-section,
.account-card__cell-main,
.accounts-form__column-name__login-section,
.account-card__cell-login {
  display: flex;
  min-width: 55%;
  column-gap: 20px;
}

.accounts-form__column-name__main-section > .accounts-form__column-name,
.accounts-form__column-name__login-section, > .accounts-form__column-name {
  width: 50%;
}
</style>
