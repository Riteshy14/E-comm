import { Link, useNavigate } from "react-router-dom";
import { TopBar } from "../component/TopBar";
import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import {toast} from 'react-toastify'


const backendurl = import.meta.env.VITE_BACKEND_URL


export function SignIn() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const {setToken} = useContext(ShopContext)

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${backendurl}/api/user/signin`, { email, password,});

        console.log("response", response);
        setToken(response.data.token);

        if(response.data.success){
            navigate('/')
            toast.success("Logged In")
        }else{
            toast.error(response.data.msg)
        }
    } catch (error) {
        console.error("Error during sign-in:", error.message);
        if(error.response){
            toast.error(error.response.data.message)
        }else{
            toast.error(error.message)
        }
    }
};

    return (
        <div className="h-screen flex flex-col">
            <TopBar icon={"search_icon.png"} />
            <section className="flex-1 w-full  flex items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full max-w-md rounded-lg shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white animate-fadeIn">
                            Sign In to your account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div className="form-group">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
                                    placeholder="name@company.com" 
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input 
                                        id="remember" 
                                        type="checkbox" 
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="font-light text-gray-500 dark:text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full hover:border text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all duration-300 transform hover:scale-105"
                            >
                                Sign In
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account?  
                                <Link to={'/signup'} className="font-medium text-primary-600 hover:underline dark:text-primary-500 transition-all duration-200"> Sign up here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
