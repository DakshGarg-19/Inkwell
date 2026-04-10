import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Clock } from 'lucide-react';
import { BlogCard } from "../components/BlogCard";
import { BlogContext } from "../context/BlogContext";

const renderContent = (content) => {
  return content.split('\n\n').map((block, index) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={index} className="text-xl font-bold text-base-content underline decoration-primary decoration-4 underline-offset-8 mt-6 mb-2">
          {block.replace('## ', '')}
        </h2>
      );
    }
    if (block.startsWith('### ')) {
      return (
        <h3 key={index} className="text-lg font-bold text-base-content mt-4 mb-2">
          {block.replace('### ', '')}
        </h3>
      );
    }
    if (block.startsWith('```')) {
      const codeLines = block.split('\n').filter(line => !line.startsWith('```'));
      return (
        <div key={index} className="bg-[#11181c] p-8 rounded-2xl border border-neutral font-mono text-md text-emerald-400 overflow-x-auto shadow-2xl my-4">
          <code className="whitespace-pre">
            {codeLines.join('\n')}
          </code>
        </div>
      );
    }
    if (block.startsWith('- ')) {
       return (
         <ul key={index} className="list-disc list-inside my-2 text-md text-base-content/80 leading-relaxed font-medium">
           {block.split('\n').map((item, i) => <li key={i}>{item.replace('- ', '')}</li>)}
         </ul>
       )
    }
    if (block.match(/^\d+\. /)) {
        return (
          <ol key={index} className="list-decimal list-inside my-2 text-md text-base-content/80 leading-relaxed font-medium">
            {block.split('\n').map((item, i) => <li key={i}>{item.replace(/^\d+\. /, '')}</li>)}
          </ol>
        )
    }
    return (
      <p key={index} className="text-md text-base-content/80 leading-relaxed font-medium my-2">
        {block}
      </p>
    );
  });
};

export const Blogs = () => {
  const { id } = useParams();
  const { blogs } = useContext(BlogContext);

  if (id) {
    const blog = blogs.find(b => b.id === id);

    if (!blog) {
      return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold text-base-content">Blog not found</h1>
          <Link to="/" className="btn btn-primary mt-6">Return Home</Link>
        </div>
      );
    }

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
          {blog.tags.map((tag, i) => (
            <span key={i} className="badge badge-neutral bg-neutral text-neutral-content border-none px-4 py-3 text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-base-content leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-base-content/50 text-sm font-medium border-b border-neutral pb-8">
          <div className="flex items-center gap-2">
            <User size={18} className="text-primary" />
            {blog.authorName}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            {Math.max(1, Math.ceil(blog.content.length / 1000))} min read
          </div>
        </div>

        <div className="flex flex-col mt-4">
          {renderContent(blog.content)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-12 px-4 md:px-12 lg:px-24">
      <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center md:text-left">
        All <span className="text-primary">Articles</span>
      </h1>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard 
            key={blog.id} 
            id={blog.id}
            title={blog.title}
            excerpt={blog.excerpt}
            tags={blog.tags}
            author={blog.authorName}
            date={new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          />
        ))}
      </div>
    </div>
  )
}
