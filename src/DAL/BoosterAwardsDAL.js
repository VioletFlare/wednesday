const mysql = require('mysql2');

class BoosterAwards {
    constructor(DB) {
        this.DB = DB;
    }

    insertLastRewardRecord(guildId) {
        this.DB.getConnection((err, connection) => {

            const query = `
                INSERT INTO wednesday_booster_rewards
                    (guild_id, last_reward_ts)
                VALUES
                    (${guildId}, ${Date.now()})
                ON DUPLICATE KEY UPDATE
                    last_reward_ts = ${Date.now()};
            `;

            connection.query(query, (error, results, fields) => {
                if (error) throw error;
                connection.release();
            });
        });
    }

    getLastRewardRecord(guildId) {
        return new Promise(
            (resolve, reject) => {
                this.DB.getConnection((err, connection) => {

                    const query = `
                        SELECT * FROM wednesday_booster_rewards
                        WHERE guild_id = ${guildId};
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