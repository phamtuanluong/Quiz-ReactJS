import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import "./quiz.css";

function Quiz() {
    const params = useParams();
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

    console.log(dataQuestion);

    const handleSubmit = (e) => {
        e.preventDefault();

        let selectedAnswers = [];
        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].checked) {
                const name = e.target.elements[i].name;
                const value = e.target.elements[i].value;
                console.log(name, value);
            }
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