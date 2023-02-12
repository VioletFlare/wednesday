const mysql = require('mysql2');

class Cookies {

    constructor(DB) {
        this.DB = DB;
    }

    insertCookies(guildId, cookies, userId, username) {
        this.DB.getConnection((err, connection) => {
            const escapedUsername =  mysql.escape(username);

            const insertScore = `
                INSERT INTO wednesday_cookies
                    (username, cookies, guild_id, user_id)
                VALUES
                    (${escapedUsername}, ${cookies}, ${guildId}, ${userId})
                ON DUPLICATE KEY UPDATE
                    username = ${escapedUsername}, cookies = ${cookies};
            `;

            connection.query(insertScore, (error, results, fields) => {
                if (error) throw error;
                connection.release();
            });
        });
    }

    getCookies(guildId, userId) {
        return new Promise(
            (resolve, reject) => {
                this.DB.getConnection((err, connection) => {
                    const getScore =  `
                            SELECT * FROM wednesday_cookies
                            WHERE guild_id = ${guildId} AND user_id = ${userId};
                        `;

                    connection.query(getScore, (error, results, fields) => {
                        if (error) throw error;
                        connection.release();

                        if (results === undefined) {
                            reject(new Error("Results is undefined."))
                        } else {
                            resolve(results[0]);
                        }
                    });

                });
            }
        );
    }

}

module.exports = Cookies;