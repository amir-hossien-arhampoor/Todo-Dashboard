import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import DashBoard from "./pages/DashBoard"
import Weather from "./pages/Weather"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<DashBoard/>}/>
          <Route path="weather" element={<Weather/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
