class BoosterAwardsProvider {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
    }

    registerReward() {
        this.DAL.BoosterAwards.insertLastRewardRecord(this.guild.id);
    }

    getLastRewardTimestamp() {
        return this.DAL.BoosterAwards.getLastRewardRecord(this.guild.id).then((record) => {
            if (!record) {
                return 0;
            } else {
                return record.last_reward_ts;
            }
        });
    }

}



module.exports = BoosterAwardsProvider;