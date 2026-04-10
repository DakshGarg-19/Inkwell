import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { Plus, MoreHorizontal, Eye, Edit, EyeOff, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const { blogs, togglePublish, deleteBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        if (parsed.role !== "author") {
          toast.error("Unauthorized. Only authors can access the dashboard.");
          navigate("/");
        }
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!currentUser) return null;

  const authorBlogs = blogs.filter(b => b.authorEmail === currentUser.email || b.authorName === currentUser.name || b.authorId === `author-${currentUser.name}`);
  
  const totalArticles = authorBlogs.length;
  const publishedArticles = authorBlogs.filter(b => b.published).length;
  const draftArticles = totalArticles - publishedArticles;

  return (
    <div className="flex flex-col justify-baseline items-center py-12 px-4 md:px-12 lg:px-24">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral/20 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">Dashboard</h1>
            <p className="text-base-content/60 font-medium">Manage your articles, {currentUser.name}</p>
          </div>
          <Link to="/dashboard/new" className="btn bg-primary text-primary-content hover:bg-primary/90 border-none font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 px-6">
            <Plus size={18} /> New Article
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card bg-[#111111] border border-neutral/50 shadow-sm p-6 rounded-[1.5rem]">
            <p className="text-base-content/50 text-sm font-bold mb-3">Total Articles</p>
            <p className="text-4xl font-bold text-base-content">{totalArticles}</p>
          </div>
          <div className="card bg-[#111111] border border-neutral/50 shadow-sm p-6 rounded-[1.5rem]">
            <p className="text-base-content/50 text-sm font-bold mb-3">Published</p>
            <p className="text-4xl font-bold text-primary">{publishedArticles}</p>
          </div>
          <div className="card bg-[#111111] border border-neutral/50 shadow-sm p-6 rounded-[1.5rem]">
            <p className="text-base-content/50 text-sm font-bold mb-3">Drafts</p>
            <p className="text-4xl font-bold text-base-content/40">{draftArticles}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-base-content">Your Articles</h2>
        </div>

        <div className="flex flex-col gap-4">
          {authorBlogs.length === 0 ? (
            <div className="text-center py-12 bg-[#111111] border border-neutral/50 rounded-[1.5rem]">
              <p className="text-base-content/40 font-medium pb-2">You haven't written any articles yet.</p>
              <Link to="/dashboard/new" className="text-primary hover:underline font-bold text-sm">Create your first article</Link>
            </div>
          ) : (
            authorBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((blog) => (
              <div key={blog.id} className="card bg-[#111111] border border-neutral/50 hover:border-neutral transition-colors p-6 rounded-[1.5rem] flex flex-row justify-between items-start group">
                <div className="flex-1 pr-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-base-content line-clamp-1">{blog.title}</h3>
                      {blog.published ? (
                        <span className="badge bg-primary text-primary-content border-none font-bold text-[10px] py-3 px-3 uppercase tracking-wider rounded-lg">Published</span>
                      ) : (
                        <span className="badge bg-base-300 text-base-content border-none font-bold text-[10px] py-3 px-3 uppercase tracking-wider rounded-lg">Draft</span>
                      )}
                    </div>
                    <p className="text-base-content/40 text-sm line-clamp-1 mb-6 font-medium">{blog.excerpt}</p>
                  </div>
                  <p className="text-base-content/30 text-xs font-medium">
                    Last updated: {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content hover:bg-base-200">
                    <MoreHorizontal size={18} />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 border border-neutral/20 rounded-2xl w-44 mt-2">
                    <li>
                      <Link to={`/blog/${blog.id}`} className="flex items-center gap-2 font-bold text-sm text-base-content/70 hover:text-primary py-2.5">
                        <Eye size={16} /> View
                      </Link>
                    </li>
                    <li>
                      <Link to={`/dashboard/edit/${blog.id}`} className="flex items-center gap-2 font-bold text-sm text-base-content/70 hover:text-primary py-2.5">
                        <Edit size={16} /> Edit
                      </Link>
                    </li>
                    <div className="divider my-0 opacity-5"></div>
                    <li>
                      <button 
                        onClick={() => togglePublish(blog.id)}
                        className="flex items-center gap-2 font-bold text-sm text-base-content/70 hover:text-base-content py-2.5"
                      >
                        {blog.published ? <><EyeOff size={16} /> Unpublish</> : <><Eye size={16} /> Publish</>}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
                            deleteBlog(blog.id);
                            toast.info("Article deleted.");
                          }
                        }}
                        className="flex items-center gap-2 font-bold text-sm text-error hover:bg-error/10 py-2.5 mt-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
