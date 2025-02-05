import { Link, NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss"
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
function LayoutDefault() {
    const token = getCookie("token");

    const isLogin = useSelector(state => state.loginReducer);
    
    return (
        <>
            <div>
                <div className="layout-default">
                    <header className="layout-default__header">
                        <div className="layout-default__logo">
                            <Link to="/" className="logo">TL Quiz</Link>
                        </div>
                        <div className="menu">
                            <ul>
                                <li>
                                    <NavLink to="/">
                                        Home
                                    </NavLink>
                                </li>
                                {token ? (
                                    <>
                                        <li>
                                            <NavLink to="/topic">
                                                Topic
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/answers">
                                                Answers
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                    
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="layout-default__account">
                            {token ? (
                                <>
                                    <NavLink className="login" to="/logout">Đăng xuất</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink className="login" to="/login">Đăng nhập</NavLink>
                                    <NavLink to="/register">Đăng ký</NavLink>
                                </>
                            )}
                        </div>
                    </header>
                    <main className="layout-default__main">
                        <Outlet />
                    </main>
                    <footer className="layout-default__footer">
                        Copyright @ 2024 by PhamTuanLuong
                    </footer>
                </div>
            </div>
        </>
    )
}
export default LayoutDefault;