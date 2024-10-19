import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <Routes>
      <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
      </Route>
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
