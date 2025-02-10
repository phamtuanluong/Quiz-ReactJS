import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import {getCookie} from "../../helpers/cookie";
import "./quiz.css";
import { createAnswer } from "../../services/quizService";

function Quiz() {
    const params = useParams();
    const navigate = useNavigate();
    const [dataTopic, setDataTopic] = useState([]);
    const [dataQuestion, setDataQuestion] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTopic(params.id);
            setDataTopic(response);
        }
        fetchApi();
    }, [])
    
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListQuestion(params.id);
            setDataQuestion(response);
        }

        fetchApi();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let selectedAnswers = [];
        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].checked) {
                const name = e.target.elements[i].name;
                const value = e.target.elements[i].value;

                selectedAnswers.push({
                    questionId: parseInt(name),
                    answer: parseInt(value)
                })
            }
        }

        let options = {
            userId: getCookie("id"),
            topicId: parseInt(params.id),
            answers: selectedAnswers
        }

        const response = await createAnswer(options);
        if(response){
            navigate(`/result/${response.id}`)
        }
    }

    return (
        <>
            <h2>Bài Quiz chủ đề: {dataTopic && (
                <>
                    {dataTopic.name}
                </>
            )}</h2>

            <div className="form-quiz">
                <form onSubmit={handleSubmit}>
                    {dataQuestion.map((item, index) => (
                        <div className="form-quiz__item" key={item.id}>
                            <p>Câu {index + 1}: {item.question} </p>
                            {item.answers.map((itemAns, indexAns) => (
                                <ul>
                                    <li>
                                        <div className="form-quiz__answer" key={indexAns}>
                                            <input type="radio" name={item.id} value={indexAns} id={`quiz-${item.id}-${indexAns}`} />
                                            <label htmlFor={`quiz-${item.id}-${indexAns}`}>{itemAns}</label>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    ))}
                    <button className="button__submit" type="submit">
                        Nộp bài
                    </button>
                </form>
            </div>
        </>
    )
}
export default Quiz;