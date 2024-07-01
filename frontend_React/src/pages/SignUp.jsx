import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import { FaGithub } from 'react-icons/fa';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });
    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
                <h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">
                    <span className="text-blue-500">ChatApp </span>
                    <span className="text-zinc-300">SignUp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-300 mb-2">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            className="w-full p-2 mb-4 border border-gray-600 rounded"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full p-2 mb-4 border border-gray-600 rounded"
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full p-2 mb-4 border border-gray-600 rounded"
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full p-2 mb-4 border border-gray-600 rounded"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                    <Link to="/login" className="text-sm text-blue-500 hover:underline mb-4 block">
                        Already have an account?
                    </Link>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        disabled={loading}
                        aria-label="Sign Up"
                    >
                        {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
                    </button>
                    <div className="flex items-center justify-center mt-6">
                        <a
                            href="https://github.com/chorok5/CHAT-APP.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                        >
                            <FaGithub className="mr-2" size={20} />
                            chorok5
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
