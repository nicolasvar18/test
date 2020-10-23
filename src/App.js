//importar componentes
import React, {useReducer} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';

import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';
import Introduction from './components/Introduction';


import './App.css';



function App() {  
        
    const questions = [ 
        //Se genera las preguntas y se indica cual es la repuesta correcta
        {
            id: 1,
            question: '¿Cuáles son los cinco tipos de sabores primarios?',
            answer_a:
                'dulce,espeso, amargo, suave',
            answer_b: 'dulce, amargo, ácido, salado y umami',
            answer_c:
                "grumoso, salado, umami, cortante",
            answer_d: 'Ninguna de las anteriores',
            correct_answer: 'b',
        },
        {
            id: 2,
            question: '¿Quién escribió La Odisea?',
            answer_a: 'Homero',
            answer_b: 'Sofocles',
            answer_c: 'Corina',
            answer_d: 'teocrito',
            correct_answer: 'a',
        },
        {
            id: 3,
            question: '¿Dónde originaron los juegos olímpicos?',
            answer_a: 'Roma',
            answer_b: 'Italia',
            answer_c: 'Grecia',
            answer_d: 'Egipto',
            correct_answer: 'c',
        },
        {
            id: 4,
            question: '¿Cuándo acabó la II Guerra Mundial?',
            answer_a: '1945',
            answer_b: '1930',
            answer_c: '1960',
            answer_d: '1980',
            correct_answer: 'a',
        },
        {
            id: 5,
            question: '¿Quién es el autor de el Quijote?',
            answer_a: 'Gustavo Bernate',
            answer_b: 'Miguel de Cervantes',
            answer_c: 'Victor Hugo',
            answer_d: 'Lord Byron',
            correct_answer: 'b',
        },
        {
            id: 6,
            question: '¿Quién pintó “la última cena”?',
            answer_a: 'Donatello',
            answer_b: 'Rafael Sanzio',
            answer_c: 'Miguel Angel',
            answer_d: 'Leonardo da vinci',
            correct_answer: 'd',
        },
        {
            id: 7,
            question: '¿En qué se especializa la cartografía?',
            answer_a: 'Estudio de cartones',
            answer_b: 'Estudio de mapas',
            answer_c: 'Estudio de el mar',
            answer_d: 'Ninguna de las Anteriores',
            correct_answer: 'b',
        },
        {
            id: 8,
            question: 'Si 50 es el 100%, ¿cuánto es el 90%?',
            answer_a: '40',
            answer_b: '30',
            answer_c: '45',
            answer_d: '60',
            correct_answer: 'c',
        },
        {
            id: 9,
            question: '¿Cuántas patas tiene la araña?',
            answer_a: '4',
            answer_b: '3',
            answer_c: '8',
            answer_d: '6',
            correct_answer: 'c',
        },
        {
            id: 10,
            question: '¿¿Cuál es el nombre de la lengua oficial en china?',
            answer_a: 'Chinense',
            answer_b: 'Mandarin',
            answer_c: 'Cantones',
            answer_d: 'Japones',
            correct_answer: 'c',
        },

    ];

    const initialState = {
        questions,
        currentQuestion: 0,
        currentAnswer: '',
        answers: [],
        showResults: false,
        error: '',
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);
    const {currentQuestion, currentAnswer, answers, showResults, error} = state;

    const question = questions[currentQuestion];

    const renderError = () => {
        //si genera error se reiniciara el test
        if (!error) { 
            return;
        }

        return <div className="error">{error}</div>;
    };

    const renderResultMark = (question, answer) => {
        //si la pregunta fue respondida correctamente generara el mensaje de correcto al lado de la pregunta correspondiente
        if (question.correct_answer === answer.answer) {
            return <span className="correct">Correcto</span>; 
        }
        //si la pregunta fue respondida es falsa generara el mensaje de falso al lado de la pregunta correspondiente
        return <span className="failed">Fallo</span>; 
    };
    //realiza la validacion de los resultados los enlista
    const renderResultsData = () => {
        return answers.map(answer => {
            const question = questions.find(
                question => question.id === answer.questionId 
            );

            return (
                <div key={question.id}>
                    {question.question} - {renderResultMark(question, answer)}
                </div>
            );
        });
    };
    //restablecer questionario
    const restart = () => {
        dispatch({type: RESET_QUIZ}); 
    };
    //Si no se seleciona ninguna repuesta indicara que debe selecionarla para seguir con la sigueinte pregunta
    const next = () => {
        const answer = {questionId: question.id, answer: currentAnswer};

        if (!currentAnswer) {
            dispatch({type: SET_ERROR, error: 'Por favor selecione una opcion'}); 
            return;
        }

        answers.push(answer);
        dispatch({type: SET_ANSWERS, answers});
        dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});

        if (currentQuestion + 1 < questions.length) {
            dispatch({
                type: SET_CURRENT_QUESTION,
                currentQuestion: currentQuestion + 1,
            });
            return;
        }

        dispatch({type: SET_SHOW_RESULTS, showResults: true});
    };

    if (showResults) {
        //muestra las repuestas si fueron correctas o incorrectas y habilita el boton para volver a realizar el test
        return (
            <div className="container results"> 
                <h2>Resultados</h2> 
                <ul>{renderResultsData()}</ul> 
                <button className="btn btn-primary" onClick={restart}> 
                    Volver a realizar el test
                </button>
            </div>
        );
    } else {
        //habilita el boton para seguir con la siguiente pregunta y indica que cual de las preguntas esta
        return (
            <QuizContext.Provider value={{state, dispatch}}>
                <div className="container">
                <section className="componentes">

                <Introduction />

                </section>
                    <Progress 
                        total={questions.length}
                        current={currentQuestion + 1}
                    />
                    <Question />
                    {renderError()} 
                    
                    <Answers /> 
                    <button className="btn btn-primary" onClick={next}> 
                        Confirmar y Continar
                    </button>
                    
                </div>
                
            </QuizContext.Provider>
        );
        
    } 

}

export default App;
