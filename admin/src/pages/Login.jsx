import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL

export function Login({setToken}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginfun =async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${backend_url}/api/user/admin`, {email,password})
            setToken(response.data.token)
            console.log("response",response)
            console.log("response data",response.data.token)
            navigate('/add')
        } catch (error) {
            console.log("error", error)
        }
    }
    return <div className="h-screen ">
        <section className="flex-1 w-full h-full bg-gray-50 flex items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full max-w-md rounded-2xl shadow-md  md:mt-0 sm:max-w-md xl:p-0 bg-white ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl pt-4 flex justify-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  animate-fadeIn">
                            Admin Panel
                        </h1>
                        <form onSubmit={loginfun} className="space-y-4 md:space-y-6" action="#">
                            <div className="form-group">
                                <label htmlFor="email" className="flex items-center mb-2 text-sm font-medium text-gray-900 ">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mr-2 text-gray-600 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                                    Email Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className=" border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
                                    placeholder="example@gmail.com" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="mb-2 flex items-center  text-sm font-medium text-gray-900 ">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mr-2 text-gray-600 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></svg>
                                    Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    onChange={(e)=> setPassword(e.target.value)}
                                    placeholder="Enter Your Password" 
                                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
                                    required
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input 
                                        id="remember" 
                                        type="checkbox" 
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50  focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 "
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="font-light text-gray-900 ">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="w-full border flex justify-center items-center gap-3 text-white bg-black text-[17px] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all duration-300 transform hover:scale-105"
                            >
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </section>
    </div>
}



            
