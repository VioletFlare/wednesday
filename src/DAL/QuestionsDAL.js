const mysql = require('mysql2');

class Questions {
    constructor(DB) {
        this.DB = DB;
    }

    insertQuestion(guildId, messageId, content) {
        this.DB.getConnection((err, connection) => {
            const escapedContent =  mysql.escape(content);

            const insertQuestion = `
                INSERT INTO wednesday_qotd
                    (content, guild_id, message_id)
                VALUES
                    (${content}, ${guildId}, ${messageId})
                ON DUPLICATE KEY UPDATE
                    content = ${escapedContent}, guild_id = ${guildId}, messageId = ${messageId};
            `;

            connection.query(insertQuestion, (error, results, fields) => {
                if (error) throw error;
                connection.release();
            });
        });
    }

    getQuestion(guildId, messageId) {
        return new Promise(
            (resolve, reject) => {
                this.DB.getConnection((err, connection) => {
                    const getQuestion =  `
                            SELECT * FROM wednesday_qotd
                            WHERE guild_id = ${guildId} AND message_id = ${messageId};
                        `;

                    connection.query(getQuestion, (error, results, fields) => {
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

module.exports = Questions;