const AccountsProvider = require('../Providers/AccountsProvider');

class BoosterAwarder {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
    }

    _setBoosterAward() {

    }

    init() {
        this._setBoosterAward();

        this.AccountsProvider = new AccountsProvider(this.guild, this.DAL);
    }
}

module.exports = BoosterAwarder;