const mysql = require('mysql2');

class BoosterAwards {
    constructor(DB) {
        this.DB = DB;
    }

    insertLastRewardRecord(userId, guildId, username) {
        this.DB.getConnection((err, connection) => {
            const escapedUsername =  mysql.escape(username);

            const insertScore = `
                INSERT INTO wednesday_booster_rewards
                    (username, guild_id, user_id, last_reward_ts)
                VALUES
                    (${escapedUsername}, ${guildId}, ${userId}, ${Date.now()})
                ON DUPLICATE KEY UPDATE
                    username = ${escapedUsername}, 
                    last_reward_ts = ${Date.now()};
            `;

            connection.query(insertScore, (error, results, fields) => {
                if (error) throw error;
                connection.release();
            });
        });
    }

}

module.exports = BoosterAwards;