import { useEffect, useState } from "react";
import { getListAnswers } from "../../services/answerService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";

function Answers() {
    const [dataAnswers, setDataAnswers] = useState([]);
    
    useEffect(() => {
        const fetchApi = async () => {
            const answersByUser = await getListAnswers();
            const topics = await getListTopic();

            let result = [];
            for(let i = 0; i < answersByUser.length; i++){
                result.push({
                    ...topics.find(item => Number(item.id) === answersByUser[i].topicId),
                    ...answersByUser[i]
                });
            }

            setDataAnswers(result.reverse());
        }
        fetchApi();
    }, [dataAnswers])

    return (
        <>
            <h2>Danh sách chủ đề đã luyện tập</h2>
            {dataAnswers.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Tên chủ đề</th>
                            <th>Kết quả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataAnswers.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={"/result/" + item.id} className="button__lambai">Xem chi tiết</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
export default Answers;