import { useSideBar } from "./SideBarProvider"


export default function ProfileIcon() {
    const {toggleSidebar} = useSideBar()
    
    return (
        <>
            <div className="header-profile">
                <i className="fa-solid fa-bars side-menu-btn" onClick={toggleSidebar}></i>
                <div className="profile-icon">
                    <i className="fa-regular fa-bell"></i>
                    <img src="../../public/user-icon.jpg" alt="" />
                </div>
            </div>
        </>
    )
}