const mysql = require('mysql2');

class BoosterAwards {
    constructor(DB) {
        this.DB = DB;
    }

    insertLastRewardRecord(userId, guildId, username) {
        this.DB.getConnection((err, connection) => {
            const escapedUsername =  mysql.escape(username);

            const query = `
                INSERT INTO wednesday_booster_rewards
                    (username, guild_id, user_id, last_reward_ts)
                VALUES
                    (${escapedUsername}, ${guildId}, ${userId}, ${Date.now()})
                ON DUPLICATE KEY UPDATE
                    username = ${escapedUsername}, 
                    last_reward_ts = ${Date.now()};
            `;

            connection.query(query, (error, results, fields) => {
                if (error) throw error;
                connection.release();
            });
        });
    }

    getLastRewardRecord(userId, guildId) {
        return new Promise(
            (resolve, reject) => {
                this.DB.getConnection((err, connection) => {

                    const query = `
                        SELECT * FROM wednesday_booster_rewards
                        WHERE user_id = ${userId} AND guild_id = ${guildId};
                    `;

                    connection.query(query, (error, results, fields) => {
                        if (error) throw error;
                        connection.release();

                        if (results === undefined) {
                            reject(new Error("Results is undefined."));
                        } else {
                            resolve(results);
                        }
                    })
                });
            }
        );
    }

}

module.exports = BoosterAwards;