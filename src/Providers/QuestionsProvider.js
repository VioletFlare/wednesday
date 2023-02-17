class QuestionsProvider {

    constructor(DAL) {
        this.DAL = DAL;
    }

    insertQuestion(guildId, messageId, content) {
        this.DAL.Questions.insertQuestion(guildId, messageId, content);
    }

    getQuestion(guildId) {
        return this.DAL.Questions.getQuestion(guildId).then(question => {
            if (question) {
                return question;
            } else {
                const emptyQuestion = {
                    message_id: "",
                    content: "",
                    guild_id: guildId
                };

                return emptyQuestion;
            }
        });
    }

}

module.exports = QuestionsProvider;