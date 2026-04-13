import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PenLine, BookOpen, UserPen } from 'lucide-react';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.string().oneOf(['user', 'author']).required('Role is required'),
}).required();

export const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('user');
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'user'
    }
  });

  const onSubmit = async (data) => {
    try {
      const newUser = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        createdAt: new Date().toISOString()
      };

      const existingUsers = JSON.parse(localStorage.getItem('blog_users') || '[]');
      
      if (existingUsers.some(u => u.email === data.email)) {
        toast.error("Email is already registered.");
        return;
      }

      existingUsers.push(newUser);
      localStorage.setItem('blog_users', JSON.stringify(existingUsers));

      toast.success("Account created successfully! Please login.");
      navigate('/login');
    } catch (error) {
      console.error("REGISTER ERROR: ", error);
      toast.error("Registration failed. " + (error.message || ""));
    }
  };

  const setRole = (role) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  return (
    <div className="flex justify-center items-center py-10 p-6 min-h-[calc(100vh-80px)]">
      <div className="card w-full max-w-lg bg-base-100 border border-neutral shadow-2xl p-8 rounded-[2.5rem]">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-primary rounded-full shadow-lg shadow-primary/20">
            <PenLine size={28} className="text-primary-content" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-base-content mb-1">Create an Account</h1>
            <p className="text-sm text-base-content/50">Join Inkwell to start reading or writing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content/80 text-md">Name</span>
            </label>
            <input 
              type="text" 
              placeholder="John Doe"
              className={`input input-bordered w-full bg-base-200 border-neutral text-base-content rounded-xl focus:border-primary transition-all ${errors.name ? 'border-error' : ''}`}
              {...register("name")}
            />
            {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content/80 text-md">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className={`input input-bordered w-full bg-base-200 border-neutral text-base-content rounded-xl focus:border-primary transition-all ${errors.email ? 'border-error' : ''}`}
              {...register("email")}
            />
            {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content/80 text-md">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="Create a password"
                className={`input input-bordered w-full bg-base-200 border-neutral text-base-content rounded-xl focus:border-primary transition-all ${errors.password ? 'border-error' : ''}`}
                {...register("password")}
              />
              {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base-content/80 text-md">Confirm Password</span>
              </label>
              <input 
                type="password" 
                placeholder="Confirm your password"
                className={`input input-bordered w-full bg-base-200 border-neutral text-base-content rounded-xl focus:border-primary transition-all ${errors.confirmPassword ? 'border-error' : ''}`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <span className="text-error text-xs mt-1">{errors.confirmPassword.message}</span>}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content/80 text-md">Account Type</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div 
                onClick={() => setRole('user')}
                className={`p-3 border-2 rounded-2xl cursor-pointer transition-all flex flex-col items-center gap-1 ${selectedRole === 'user' ? 'border-primary bg-primary/5' : 'border-neutral bg-base-200'}`}
              >
                <BookOpen size={20} className={selectedRole === 'user' ? 'text-primary' : 'text-base-content/40'} />
                <span className="font-bold text-sm text-base-content">Reader</span>
                <span className="text-[10px] text-base-content/50">Read articles</span>
              </div>
              <div 
                onClick={() => setRole('author')}
                className={`p-3 border-2 rounded-2xl cursor-pointer transition-all flex flex-col items-center gap-1 ${selectedRole === 'author' ? 'border-primary bg-primary/5' : 'border-neutral bg-base-200'}`}
              >
                <UserPen size={20} className={selectedRole === 'author' ? 'text-primary' : 'text-base-content/40'} />
                <span className="font-bold text-sm text-base-content">Author</span>
                <span className="text-[10px] text-base-content/50">Write & publish</span>
              </div>
            </div>
            <input type="hidden" {...register("role")} />
          </div>

          <button type="submit" className="btn btn-primary w-full rounded-xl text-md font-bold shadow-lg shadow-primary/10 mt-4">
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-base-content/60 font-medium">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
