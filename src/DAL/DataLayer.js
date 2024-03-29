const DB = require('./DB.js');
const mysql = require('mysql2');
const Accounts = require('./AccountsDAL.js');
const Questions = require('./QuestionsDAL');
const BoosterAwards = require('./BoosterAwardsDAL');

class DataLayer {

    constructor() {
        this.Accounts = new Accounts(DB);
        this.Questions = new Questions(DB);
        this.BoosterAwards = new BoosterAwards(DB);
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
            `;

            connection.query(query, (error, results, fields) => {
                connection.release();
                if (error) throw error;
            });
        });
    }
    
}

module.exports = new DataLayer();