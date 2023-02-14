class AccountsProvider {

    constructor(guild, DAL) {
        this.DAL = DAL;
        this.guild = guild;
    }

    incrementCookies(guildId, userId, value) {
        this.DAL.Accounts.getCookies(guildId, userId).then((cookies) => {
            let newCookiesAmount;

            if (cookies) {
                newCookiesAmount = cookies.cookies + value;
            } else {
                newCookiesAmount = value;
            }

            this.guild.members.fetch(userId).then(user => {
                this.DAL.Accounts.insertCookies(guildId, newCookiesAmount, userId, user.user.username);
            });
        });
    }

}

module.exports = AccountsProvider;