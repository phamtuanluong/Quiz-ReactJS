import { Table } from "antd";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import "./topic.css";

function Topic() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic();
            setTopics(response);
        }
        fetchApi();
    }, [])

    return (
        <>
            <h2>Danh sách chủ đề</h2>
            {topics.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên chủ đề</th>
                            <th>Luyện tập</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={"/quiz/" + item.id} className="button__lambai">Làm bài</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
export default Topic;