import React from "react";
import { User, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({ 
  id = 1,
  tags = ["React", "JavaScript", "Web Development"],
  title = "Getting Started with React Hooks",
  excerpt = "Learn how React Hooks can simplify your component logic and make your code more reusable.",
  author = "Sarah Chen",
  date = "January 15, 2024"
}) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/blog/${id}`)}
      className="card w-full bg-[var(--color-surface)] border border-neutral rounded-4xl p-8 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="badge badge-neutral bg-neutral text-neutral-content border-none text-xs font-medium py-3 px-4"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <h2 className="text-base-content text-2xl font-bold mb-6 leading-tight group-hover:text-primary transition-colors">
        {title}
      </h2>
      
      <p className="text-base-content/60 text-lg leading-relaxed mb-10 line-clamp-3 font-medium">
        {excerpt}
      </p>
      
      <div className="flex items-center gap-8 mt-auto text-base-content/40 text-sm">
        <div className="flex items-center gap-2">
          <User size={18} className="stroke-[1.5]" />
          <span className="font-medium">{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="stroke-[1.5]" />
          <span className="font-medium">{date}</span>
        </div>
      </div>
    </div>
  );
};
