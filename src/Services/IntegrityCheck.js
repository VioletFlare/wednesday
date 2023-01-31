// Internal service for checking the integrity of files.

// Question files must conform to the 366q format.

const QUESTIONS = [
    {
        QUESTIONS_CHILL_IT_V1: require("../../static/questions_chill_it_v1")
    },
    {
        QUESTIONS_CHILL_IT_V2: require("../../static/questions_chill_it_v2")
    }
]

class IntegrityCheck {
    _runQuestionsIntegrityCheck() {
        for (let i = 0; i < QUESTIONS.length; i++) {
            const keys = Object.keys(QUESTIONS[i]);
            
            if (keys.length) {
                const key = keys[0];
                const questions = QUESTIONS[i][key]

                if (questions.length !== 366) {
                    throw new Error(`!INTEG_CHECK! FILE: ${key}: QUESTION COUNT: ${questions.length}; QUESTION NUMBER MUST BE EQUAL TO 366. `)
                }
            }
        }
    }

    init() {
        this._runQuestionsIntegrityCheck();
    }
}

module.exports = IntegrityCheck;