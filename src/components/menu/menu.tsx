import { NavLink } from "react-router-dom";


export function Menu() {
    return (
        <nav className="topnav">
            <div className="topnav__brand">
                <span className="topnav__logo" aria-hidden="true">DD</span>
                <span>Data Dense Lab</span>
            </div>

            <div className="topnav__links">
                <NavLink
                    to="/slowOrder"
                    className={({ isActive }) => `topnav__link${isActive ? " is-active" : ""}`}
                >
                    Slow
                </NavLink>
                <NavLink
                    to="/virtualized"
                    className={({ isActive }) => `topnav__link${isActive ? " is-active" : ""}`}
                >
                    Virtualized
                </NavLink>
            </div>
        </nav>
    )
}
