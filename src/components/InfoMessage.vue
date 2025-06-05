<template>
    <div class="info-message__container">
        <img src="@/assets/question_mark.png" class="info-message__sign" />
        <p class="info-message__text">
            Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </p>
    </div>
</template>

<script>
export default {
  name: 'InfoMessage'
};
</script>

<style scoped>
.info-message__container {
  display: flex;
  background: lightgrey;
  padding: 8px;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 16px;
}

.info-message__sign {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.info-message__text {
  font-size: 14px;
  margin: 0;
}
</style>