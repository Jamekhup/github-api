import { Link } from "react-router-dom"
import Header from "../components/Header"

const NotFound = () => {
  return (
    <>
        <Header title="Not Found"/>
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                    <Link to={'/'} className="inline-flex bg-blue-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4">Back to Homepage</Link>
                </div>   
            </div>
        </section>
    </>
  )
}

export default NotFound