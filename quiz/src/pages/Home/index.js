import { Link } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import "./home.css";

function Home() {
    const token = getCookie("token");

    return (
        <>
            {token ? (
                <>  
                    <p className="content">
                        Chào mừng bạn đã đăng nhập thành công!
                    </p>
                    <Link to="/topic" className="button">Danh sách chủ đề ôn luyện</Link>
                    <Link to="/answers" className="button">Danh sách bài đã ôn luyện</Link>
                    <p className="content">
                        Website trắc nghiệm online lập trình Frontend là một nền tảng trực tuyến cho phép các lập trình viên Frontend thực hiện các bài kiểm tra, trắc nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh vực lập trình Frontend.
                        <br /> Đối với các lập trình viên Frontend, website trắc nghiệm online cung cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của mình trong các công nghệ và công cụ lập trình như HTML, CSS, JavaScript, jQuery, Bootstrap, Angular, React, Vue,...
                    </p>
                </>
            ) : (
                <>
                    <p className="content">
                        Website trắc nghiệm online lập trình Frontend là một nền tảng trực tuyến cho phép các lập trình viên Frontend thực hiện các bài kiểm tra, trắc nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh vực lập trình Frontend.
                        <br /> Đối với các lập trình viên Frontend, website trắc nghiệm online cung cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của mình trong các công nghệ và công cụ lập trình như HTML, CSS, JavaScript, jQuery, Bootstrap, Angular, React, Vue,...
                    </p>
                </>
            )}
        </>
    )
}
export default Home;