<template>
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
</template>

<script>
export default {
  name: 'AccountsTableHeading'
};
</script>

<style scoped>
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

.accounts-form_column-name_main-section > .accounts-form_column-name,
.accounts-form_column-name_login-section > .accounts-form_column-name {
  width: 50%;
}
</style>
