const mysql = require('mysql2');

class Questions {
    constructor(DB) {
        this.DB = DB;
    }

    getResponse(qotdMessageId, userId) {
        return new Promise(
            (resolve, reject) => {
                this.DB.getConnection((err, connection) => {
                    const getQuestion =  `
                            SELECT * FROM wednesday_qotd_responses
                            WHERE qotd_message_id = ${qotdMessageId} AND user_id = ${userId};
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

    insertResponse(qotdMessageId, userId, messageId, username, content) {
        this.DB.getConnection((err, connection) => {
            const escapedContent = mysql.escape(content);
            const escapedUsername = mysql.escape(username);

            const insertQuestion = `
                INSERT INTO wednesday_qotd_responses
                    (username, user_id, qotd_message_id, message_id, content)
                VALUES
                    (${escapedUsername}, ${userId}, ${qotdMessageId}, ${messageId}, ${escapedContent});
            `;

            connection.query(insertQuestion, (error, results, fields) => {
                if (error) throw error;
                connection.release();
            });
        });
    }

    insertQuestion(guildId, messageId, content) {
        this.DB.getConnection((err, connection) => {
            const escapedContent =  mysql.escape(content);

            const insertQuestion = `
                INSERT INTO wednesday_qotd
                    (content, guild_id, message_id, ts)
                VALUES
                    (${escapedContent}, ${guildId}, ${messageId}, ${Date.now()});
            `;

            connection.query(insertQuestion, (error, results, fields) => {
                if (error) throw error;
                connection.release();
            });
        });
    }

    getQuestion(guildId) {
        return new Promise(
            (resolve, reject) => {
                this.DB.getConnection((err, connection) => {
                    const getQuestion =  `
                            SELECT * FROM wednesday_qotd
                            WHERE guild_id = ${guildId}
                            ORDER BY ts DESC
                            LIMIT 1;
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