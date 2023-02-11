const DB = require('./DB.js');
const mysql = require('mysql2');

class DataLayer {

    constructor() {

    }

    insertGuild(guildId, name) {
        DB.getConnection((err, connection) => {
            if (err) throw err;

            const escapedName = mysql.escape(name);

            const query = `
                INSERT INTO wednesday_guilds
                    (id, name)
                VALUES
                    (${guildId}, ${escapedName})
               ON DUPLICATE KEY UPDATE
                    name = ${escapedName};
            `

            connection.query(query, (error, results, fields) => {
                connection.release();
                if (error) throw error;
            });
        });
    }
    
}

module.exports = new DataLayer();