import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PenLine } from 'lucide-react';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`http://localhost:3000/blog_users?email=${data.email}&password=${data.password}`);
      const user = response.data[0];
      
      if (user) {
        localStorage.setItem("loggedInUser", user.name);
        // We'll need to trigger a re-render or state update in App.jsx. 
        // For now, redirecting will refresh the state as App.jsx reads from localStorage on mount.
        toast.success(`Welcome back, ${user.name}!`);
        window.location.href = '/'; // Simple way to reset state in App.jsx
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Authentication failed. Make sure the server is running.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] p-6">
      <div className="card w-full max-w-md bg-white border border-neutral/20 shadow-2xl p-10 rounded-[2.5rem]">
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 bg-primary rounded-full shadow-lg shadow-primary/20">
            <PenLine size={32} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-base-content/50">Sign in to your account to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-white">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className={`input input-bordered w-full bg-[#e8e8e8] border-neutral/30 text-black rounded-xl focus:border-primary transition-all ${errors.email ? 'border-error' : ''}`}
              {...register("email")}
            />
            {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-white">Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Enter your password"
              className={`input input-bordered w-full bg-[#e8e8e8] border-neutral/30 text-black rounded-xl focus:border-primary transition-all ${errors.password ? 'border-error' : ''}`}
              {...register("password")}
            />
            {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary w-full rounded-xl text-lg font-bold shadow-lg shadow-primary/10 mt-4">
            Sign In
          </button>
        </form>

        <p className="text-center mt-10 text-base-content/60 font-medium">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
