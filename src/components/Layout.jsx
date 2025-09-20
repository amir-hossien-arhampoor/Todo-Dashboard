import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"
import SideBarProvider from "./SideBarProvider"


export default function Layout() {
    return (
        <>
            <main className="main-section">
                <SideBarProvider>
                    <SideBar />
                    <section className="main-content">
                        <Outlet />
                    </section>
                </SideBarProvider>
            </main>
        </>
    )
}
