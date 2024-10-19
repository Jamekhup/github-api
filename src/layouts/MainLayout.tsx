import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="max-w-[1080px] mx-auto my-10 bg-white rounded-md shadow-md md:p-6 sm:p-2.5 p-1.5">
        <Outlet/>
    </div>
  )
}

export default MainLayout