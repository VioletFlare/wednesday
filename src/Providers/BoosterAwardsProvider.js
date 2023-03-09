class BoosterAwardsProvider {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
    }

    registerReward(userId) {
        const member = this.guild.members.cache.find(
            member => member.user.id === userId
        );

        const username =  member.user.username;

        this.DAL.BoosterAwardsDAL.insertLastRewardRecord(userId, this.guild.id, username);
    }

    getLastRewardTimestamp(userId) {
        return this.DAL.BoosterAwardsDAL.getLastRewardRecord(userId, this.guild.id).then((record) => {
            
        });
    }

}



module.exports = BoosterAwardsProvider;