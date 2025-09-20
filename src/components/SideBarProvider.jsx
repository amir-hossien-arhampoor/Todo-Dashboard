import { createContext, useContext,useState } from "react";

const sideBarContext = createContext()

export function useSideBar() {
    return useContext(sideBarContext)
}
export default function SideBarProvider({children}) {
    const [sideBar,setSideBar] = useState(false)
    const toggleSidebar = () => setSideBar(prev => !prev)
    const closeSideBar =() => setSideBar(false)
    const openSideBar =() => setSideBar(true)
    
    return (
        <sideBarContext.Provider value={{sideBar,toggleSidebar,closeSideBar,openSideBar}}>
            {children}
        </sideBarContext.Provider>
    )
}
