class BoosterAwardsProvider {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
    }

    registerReward() {
        this.DAL.BoosterAwards.insertLastRewardRecord(this.guild.id);
    }

    getLastRewardTimestamp() {
        return this.DAL.BoosterAwardsDAL.getLastRewardRecord(this.guild.id).then((record) => {
            
        });
    }

}



module.exports = BoosterAwardsProvider;