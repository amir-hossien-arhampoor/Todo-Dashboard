import { NavLink } from "react-router-dom"
import { useSideBar } from "./SideBarProvider"


export default function SideBar() {
	const { sideBar, closeSideBar } = useSideBar()
	
	return (
		<>
			<section className={`side-bar ${sideBar ? "side-bar-open" : "side-bar-close"}`}>
				<div className={`title `}>
					<i className="fa-regular fa-square"></i>
					<h1>TaskMinder.</h1>
				</div>
				<div className="side-btn">
					<NavLink to="/">
						<i className="fa-solid fa-dashboard"></i>
						<p>DashBoard</p>
					</NavLink>
					<NavLink to="/weather">
						<i className="fa-solid fa-cloud"></i>
						<p>Weather</p>
					</NavLink>
				</div>
				<i className="fa-solid fa-sign-out" onClick={closeSideBar}></i>
			</section >
		</>
	)
}
