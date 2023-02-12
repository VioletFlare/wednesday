class QuestionsProvider {

    constructor(DAL) {
        this.DAL = DAL;
    }

    insertQuestion(guildId, messageId, content) {
        this.DAL.Questions.insertQuestion(guildId, messageId, content);
    }

    getQuestion(guildId, messageId) {
        return this.DAL.Questions.getQuestion(guildId, messageId);
    }

}

module.exports = QuestionsProvider;