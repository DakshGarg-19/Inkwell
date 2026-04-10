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
      const users = JSON.parse(localStorage.getItem('blog_users') || '[]');
      const user = users.find(u => u.email === data.email && u.password === data.password);
      
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        toast.success(`Welcome back, ${user.name}!`);
        window.location.href = '/'; 
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Authentication failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] p-6">
      <div className="card w-full max-w-md bg-base-100 border border-neutral shadow-xl p-10 rounded-[2.5rem]">
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 bg-primary rounded-full shadow-lg shadow-primary/20">
            <PenLine size={32} className="text-primary-content" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-base-content mb-2">Welcome Back</h1>
            <p className="text-base-content/50">Sign in to your account to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content/80">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className={`input input-bordered w-full bg-base-200 border-neutral text-base-content rounded-xl focus:border-primary transition-all ${errors.email ? 'border-error' : ''}`}
              {...register("email")}
            />
            {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content/80">Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Enter your password"
              className={`input input-bordered w-full bg-base-200 border-neutral text-base-content rounded-xl focus:border-primary transition-all ${errors.password ? 'border-error' : ''}`}
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
