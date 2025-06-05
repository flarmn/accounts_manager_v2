import { defineStore } from 'pinia';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem('accounts')) || []
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now(),
        label: [],      
        type: 'LDAP',    
        login: '',
        password: ''
      });
      this._saveToLocalStorage();
    },

    /**
     * @param {number} index
     * @param {string} field
     * @param {*} value
     */
    updateAccount(index, field, value) {
      const acct = this.accounts[index];
      if (!acct) return;

      if (field === 'label') {
        acct.label = value;
      } else if (field === 'type') {
        acct.type = value;
        if (value === 'LDAP') {
          acct.password = '';
        }
      } else {
        acct[field] = value;
      }

      this._saveToLocalStorage();
    },

    /**
     * @param {number} index
     */
    removeAccount(index) {
      if (!this.accounts[index]) return;
      this.accounts.splice(index, 1);
      this._saveToLocalStorage();
    },

    _saveToLocalStorage() {
      const rawAccounts = this.accounts.map((acct) =>
        JSON.parse(JSON.stringify(acct))
      );
      localStorage.setItem('accounts', JSON.stringify(rawAccounts));
    }
  }
});
