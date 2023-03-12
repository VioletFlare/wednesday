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
            return record.last_reward_ts;
        });
    }

}



module.exports = BoosterAwardsProvider;