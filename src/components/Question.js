import React, {useContext} from 'react';
import QuizContext from '../context/QuizContext';
//genera el cuestionario para indica el orden y las respuestas de las preguntas a implementar
function Question() {
    const {state} = useContext(QuizContext);
    const {currentQuestion, questions} = state;
    const question = questions[currentQuestion];
    return <h1>{question.question}</h1>;
}

export default Question;
