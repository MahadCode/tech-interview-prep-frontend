import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


const Home = () => {
     const navigate = useNavigate();
    return (
        <main className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-800">

            <div className="relative z-20 flex items-center overflow-hidden bg-white dark:bg-gray-800">

                <div className="container relative flex px-6 py-16 mx-auto">

            
                    <div className="relative z-20 flex flex-col sm:w-2/3 lg:w-2/5">

                        <h1 className="flex flex-col text-6xl font-black leading-none text-gray-800 uppercase sm:text-8xl dark:text-white">
                            Prepare for
                            <span className="text-5xl sm:text-7xl">
                                Interviews
                            </span>
                        </h1>

                        <p className="text-sm text-gray-700 sm:text-base dark:text-white">
                            Practice interview questions, track your preparation,
                            share solutions, and improve your technical interview
                            skills with our community.
                        </p>

                        <div className="flex mt-8">
                            <button
                                type="button"
                                onClick={() => {navigate("/signup")}}
                                className="px-4 py-2 mr-4 text-white uppercase bg-pink-500 border-2 border-transparent rounded-lg text-md hover:bg-pink-400"
                            >
                                Register
                            </button>

                            <button
                                type="button"
                                onClick={() => {navigate("/login")}}
                                className="px-4 py-2 text-pink-500 uppercase bg-transparent border-2 border-pink-500 rounded-lg dark:text-white hover:bg-pink-500 hover:text-white text-md"
                            >
                                Login
                            </button>
                        </div>

                    </div>

                    <div className="relative hidden sm:block sm:w-1/3 lg:w-3/5">
                        <img
                            src="https://images.pexels.com/photos/7643731/pexels-photo-7643731.jpeg"
                            alt="Interview preparation"
                            className="max-w-xs m-auto md:max-w-sm"
                        />
                    </div>

                </div>
            </div>

        </main>
    );
};

export default Home;

