<template>
  <div>
    <AccountsTableHeading />
    <AccountsTableRows
      v-for="(acct, idx) in accounts"
      :key="acct.id"
      :index="idx"
      :account="acct"
      :fieldErrors="errors[idx] || {}"
      :passwordVisible="passwordVisible[idx] || false"
      @update-label="(i, newArr) => $emit('update-label', i, newArr)"
      @update-field="(i, field, val) => $emit('update-field', i, field, val)"
      @validate-field="(i, field, val) => $emit('validate-field', i, field, val)"
      @toggle-password="(i) => $emit('toggle-password', i)"
      @remove="(i) => $emit('remove', i)"
    />
  </div>
</template>

<script>
import AccountsTableHeading from '@/components/AccountsTable/AccountsTableHeading.vue';
import AccountsTableRows   from '@/components/AccountsTable/AccountsTableRows.vue';

export default {
  name: 'AccountsTableMain',
  components: {
    AccountsTableHeading,
    AccountsTableRows
  },
  props: {
    accounts: {
      type: Array,
      required: true
    },
    errors: {
      type: Object,
      required: true
    },
    passwordVisible: {
      type: Object,
      required: true
    }
  },
  emits: [
    'update-label',
    'update-field',
    'validate-field',
    'toggle-password',
    'remove'
  ]
};
</script>


