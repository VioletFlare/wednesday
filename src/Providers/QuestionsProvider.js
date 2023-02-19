class QuestionsProvider {

    constructor(guild, DAL) {
        this.DAL = DAL;
        this.guild = guild;
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

    collectAnswer(channel, qotdMessageId, userId, messageId) {
        return this.DAL.Questions.getResponse(qotdMessageId, userId).then((response) => {
            let hasBeenCollected = false;

            if (!response) {
                const member = this.guild.members.cache.find(
                    member => member.user.id === userId
                );

                const username =  member.user.username;

                channel.messages
                .fetch(messageId)
                .then(message =>  {
                    this.DAL.Questions.insertResponse(qotdMessageId, userId, messageId, username, message.content);
                })
                .catch(console.error);

                hasBeenCollected = true;
            }

            return hasBeenCollected;
        });
    }
}

module.exports = QuestionsProvider;