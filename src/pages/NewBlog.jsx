import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { ArrowLeft, FileText, Send } from "lucide-react";
import { toast } from "react-toastify";

export const NewBlog = () => {
  const { addBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        if (parsed.role !== "author") {
          toast.error("Unauthorized. Only authors can create articles.");
          navigate("/");
        }
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && tags.length < 5 && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput("");
      } else if (tags.length >= 5) {
        toast.warning("Maximum of 5 tags allowed.");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = (publishedStat) => {
    if (!title || !excerpt || !content) {
      toast.error("Title, excerpt, and content are required.");
      return;
    }

    const newBlog = {
      id: crypto.randomUUID(),
      title,
      excerpt,
      content,
      tags: tags.length > 0 ? tags : ["General"],
      authorId: `author-${currentUser.name}`,
      authorName: currentUser.name,
      authorEmail: currentUser.email,
      published: publishedStat,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addBlog(newBlog);
    toast.success(publishedStat ? "Article published successfully!" : "Saved as draft.");
    navigate("/dashboard");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-200 py-8 px-6 md:px-16">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-base-content/50 hover:text-base-content text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div
          style={{ backgroundColor: "#111316", border: "1px solid rgba(255,255,255,0.06)" }}
          className="rounded-2xl p-8"
        >
          <h1 className="text-xl font-bold text-base-content mb-8">Create New Article</h1>

          <div className="space-y-7">

            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter a compelling title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  backgroundColor: "#191c1f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "inherit",
                }}
                className="w-full rounded-lg px-4 py-3 text-sm text-base-content placeholder:text-base-content/30 outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">Excerpt</label>
              <textarea
                placeholder="Write a brief summary of your article..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                style={{
                  backgroundColor: "#191c1f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "inherit",
                  resize: "vertical",
                }}
                className="w-full rounded-lg px-4 py-3 text-sm text-base-content placeholder:text-base-content/30 outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs mt-2 text-base-content/40">
                A short description that appears on the blog listing
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">Content</label>
              <textarea
                placeholder={"Write your article content here... (Markdown supported)"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                style={{
                  backgroundColor: "#191c1f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "inherit",
                  resize: "vertical",
                  fontFamily: "monospace",
                  fontSize: "13px",
                }}
                className="w-full rounded-lg px-4 py-3 text-base-content placeholder:text-base-content/30 outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs mt-2 text-base-content/40">
                Supports Markdown: ## for headers, **bold**, *italic*, `code`, etc.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">Tags</label>
              <div
                style={{
                  backgroundColor: "#191c1f",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                className="w-full rounded-lg px-4 py-3 flex flex-wrap gap-2 items-center focus-within:border-primary transition-colors min-h-[48px]"
              >
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-error ml-0.5 leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder={tags.length === 0 ? "Add tags (press Enter to add)" : ""}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={tags.length >= 5}
                  className="bg-transparent border-none outline-none text-sm text-base-content placeholder:text-base-content/30 flex-1 min-w-[160px]"
                />
              </div>
              <p className="text-xs mt-2 text-base-content/40">
                Add up to 5 tags to help readers find your article
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-10">
            <button
              onClick={() => handleSave(false)}
              style={{
                backgroundColor: "#1e2124",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-base-content/70 hover:text-base-content transition-colors"
            >
              <FileText size={16} />
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-primary text-primary-content hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <Send size={16} />
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
