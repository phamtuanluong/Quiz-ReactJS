import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnswer } from "../../services/answerService";
import { getListQuestion } from "../../services/questionService";
import "./result.css";
import { getCookie } from "../../helpers/cookie";

function Result() {
    const params = useParams();
    const navigate = useNavigate();
    const [dataResult, setDataResult] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const dataAnswer = await getAnswer(params.id);
            const dataQuestion = await getListQuestion(dataAnswer.topicId);

            let resultFinal = [];
            for (let i = 0; i < dataQuestion.length; i++) {
                resultFinal.push({
                    ...dataQuestion[i],
                    ...dataAnswer.answers.find(item => Number(item.questionId) === Number(dataQuestion[i].id)),
                })
            }

            setDataResult(resultFinal);
        }
        fetchApi();
    }, [])

    return (
        <>
            <h1>Kết quả</h1>
            <div className="form-answer">
                <form>
                    {dataResult.map((item, index) => (
                        <div className="form-answer__item" key={item.id}>
                            <p>
                                Câu {index + 1}: {item.question}

                                {item.correctAnswer === item.answer ? (
                                    <>
                                        <span className="result__tag--true">Đúng</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="result__tag--false">Sai</span>
                                    </>
                                )}

                            </p>
                            {item.answers.map((itemAns, indexAns) => {
                                let className = "";
                                let checked = false;

                                if(item.answer == indexAns){
                                    checked = true;
                                    className = "result__item--selected";
                                }

                                if(item.correctAnswer === indexAns){
                                    className = "result__item--result";
                                }

                                return (
                                    <ul>
                                        <li>
                                            <div className="form-quiz__answer" key={indexAns}>
                                                <input type="radio" checked={checked} disabled/>
                                                <label className={className}>{itemAns}</label>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            })}
                        </div>
                    ))}
                </form>
            </div>
        </>
    )
}
export default Result;