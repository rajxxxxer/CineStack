import React, { useState } from 'react';
import { login, signUp } from '../../firebase';


const Login = () => {
  const [signst, setSignst] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (signst === 'login') {
      await signUp(name, email, password);
      alert("Registered");
    } else {
      await login(email, password);
    }
  };

  return (
    <div className='login-container login  min-h-screen flex items-center justify-center bg-black text-white px-4'>
      <div className='login-form bg-gray-900 p-6 md:p-8 rounded-xl w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg'>
        <h2 className='text-xl md:text-2xl font-semibold mb-6 text-center leading-snug'>
          Welcome Back!!
        </h2>

        <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
          {signst === 'login' && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Username"
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 py-2 rounded-md text-white font-semibold text-sm md:text-base"
          >
            Log In
          </button>

          <div className="form-help flex justify-between items-center text-xs md:text-sm">
            <div className="remember flex items-center gap-2">
              <input type="checkbox" id="remember" className="accent-red-600" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p className="cursor-pointer hover:underline text-red-400">Need Help?</p>
          </div>
        </form>

        <div className="form-switch mt-6 text-center text-xs md:text-sm space-y-2">
          {signst !== 'login' && (
            <p>
              New to CineStack?
              <span onClick={() => { setSignst('login') }} className="text-red-500 cursor-pointer hover:underline"> Sign Up</span>
            </p>
          )}
          {signst === 'login' && (
            <p>
              Already a member?
              <span onClick={() => { setSignst('sign-in') }} className="text-red-500 cursor-pointer hover:underline"> Log In</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
