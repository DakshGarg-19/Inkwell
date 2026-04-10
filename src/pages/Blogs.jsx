import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Clock } from 'lucide-react';
import { BlogCard } from "../components/BlogCard";

export const Blogs = () => {
  const { id } = useParams();

  // Detail view if ID exists
  if (id) {
    return (
      <div className="min-h-screen bg-base-100 py-12 px-4 md:px-24 lg:px-64 flex flex-col gap-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors text-sm font-medium w-fit"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </Link>

        <div className="flex flex-wrap gap-2 mt-4">
          {["React", "JavaScript", "Web Development"].map((tag, i) => (
            <span key={i} className="badge badge-neutral bg-neutral text-neutral-content border-none px-4 py-3 text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-base-content leading-tight">
          Getting Started with React Hooks
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-base-content/50 text-sm font-medium border-b border-neutral pb-8">
          <div className="flex items-center gap-2">
            <User size={18} className="text-primary" />
            Sarah Chen
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            January 15, 2024
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            1 min read
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-4">
          <p className="text-md text-base-content/80 leading-relaxed font-medium">
            React Hooks revolutionized the way we write React components. Introduced in React 16.8, Hooks allow you to use state and other React features without writing a class component.
          </p>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-base-content underline decoration-primary decoration-4 underline-offset-8">
              Why Hooks?
            </h2>
            <p className="text-md text-base-content/80 leading-relaxed font-medium">
              Before Hooks, If you wanted to use state in a component, you had to use a class component. This led to complex lifecycle methods and hard-to-follow code.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-base-content underline decoration-primary decoration-4 underline-offset-8">
              The useState Hook
            </h2>
            <p className="text-md text-base-content/80 leading-relaxed font-medium">
              The most basic Hook is useState. It lets you add state to functional components:
            </p>
            <div className="bg-[#11181c] p-8 rounded-2xl border border-white/5 font-mono text-md text-emerald-400 overflow-x-auto shadow-2xl">
              <code className="whitespace-pre">
                <span className="text-purple-400">const</span> [count, setCount] = <span className="text-blue-400">useState</span>(<span className="text-orange-400">0</span>);
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to list view if no ID
  return (
    <div className="flex flex-col py-12 px-4 md:px-12 lg:px-24">
      <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center md:text-left">
        All <span className="text-primary">Articles</span>
      </h1>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <BlogCard key={i} id={i} />
        ))}
      </div>
    </div>
  )
}
