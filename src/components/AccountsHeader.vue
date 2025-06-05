<template>
    <div class="accounts-form__header">
        <h2>Учетные записи</h2>
        <button class="accounts-form__header-button" @click="handleClick">+</button>
    </div>
</template>

<script>
export default {
    setup(props, { emit }) {
        const handleClick = () => {
            console.log("Local click");
            emit("add");
        }
        return {
            handleClick
        }
    },

    name: 'AccountsHeader',
      emits: ['add'],
};
</script>

<style scoped>
.accounts-form__header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.accounts-form__header-button {
    font-size: 23px;
    margin-left: 10px;
    width: 35px;
    height: 35px;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: white;
    color: grey;
    cursor: pointer;
}
</style>