const QUESTIONS_CHILL_IT_V1 = require("../../static/questions_chill_it_v1");

// Question Of The Day

class QOTDMessage {
    
    send(model) {
        const question = QUESTIONS_CHILL_IT_V1[model.day].question;

        const message = `
(๑ > ᴗ < ๑) ♡〜٩( ˃▿˂ )۶〜♡ (^ .‿. ^)
**---[ Domanda Del Giorno ]---**

${question}
        `;

        const sentMessage = model.channel.send(message).catch(
            error => console.error(error)
        );

        return sentMessage;
    }

}

module.exports = new QOTDMessage();