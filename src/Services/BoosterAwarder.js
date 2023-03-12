const CronJob = require('cron').CronJob;
const AccountsProvider = require('../Providers/AccountsProvider');
const BoosterAwardsProvider = require('../Providers/BoosterAwardsProvider');

class BoosterAwarder {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
    }

    _awardBoosters() {
        this.BoosterAwardsProvider.registerReward();

        this.guild.members.fetch().then(members => {
            members.forEach(member => {
                if (true) { //member.premiumSince !== null
                    this.AccountsProvider.incrementCookies(this.guild.id, member.id, 5);
                }
            });
        });
    }

    _startWatcher() {
        //3600000 ms - 1 Hour
        //600000 ms - 10 minutes
        this.lastRewardTs = this.BoosterAwardsProvider.getLastRewardTimestamp();
    
        setInterval(() => {
            // 2592000000 ms - 1 Month
            // 604800000 ms - 1 Week
            const shouldAward = Date.now() - this.lastRewardTs >= 604800000;
                
            if (shouldAward) {
                this._awardBoosters();
                this.lastRewardTs = Date.now();
            }
        }, 600000);
    }


    init() {
        this.AccountsProvider = new AccountsProvider(this.guild, this.DAL);
        this.BoosterAwardsProvider = new BoosterAwardsProvider(this.guild, this.DAL);

        this._awardBoosters();
        this._startWatcher();
    }
}

module.exports = BoosterAwarder;