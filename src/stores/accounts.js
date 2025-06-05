import { defineStore } from 'pinia'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem('accounts')) || []
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now(),
        label: '',
        type: 'LDAP',
        login: '',
        password: '',
      });
      this.saveToLocalStorage();
    },
    updateAccount(index, field, value) {
      if (field === 'label') {
        this.accounts[index].label = value;
      } else if (field === 'type') {
        this.accounts[index].type = value;
        if (value === 'LDAP') {
          this.accounts[index].password = null;
        }
      } else {
        this.accounts[index][field] = value;
      }
      this.saveToLocalStorage();
    },
    removeAccount(index) {
      this.accounts.splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    }
  }
});
