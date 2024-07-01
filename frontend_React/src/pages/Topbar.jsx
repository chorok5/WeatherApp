import React from 'react'
import { Link } from 'react-router-dom';

const Topbar = ({ handleSignup, handleLogin }) => {
    return (
        <div className="bg-gray-800 text-gray-100 py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
            <div>
                <Link to="/" className="text-2xl font-bold">날씨 뉴스</Link>
            </div>
            <div>
                <button onClick={handleSignup} className="mr-4 bg-blue-500 text-white p-2 rounded">회원가입</button>
                <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">로그인</button>
            </div>
        </div>
    );
}

export default Topbar