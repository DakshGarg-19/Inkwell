import React from "react";
import { BlogCard } from "../components/BlogCard";

export const Home = () => {
  return (
    <div className="flex flex-col justify-baseline items-center py-12 px-4 md:px-12 lg:px-24">
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        Welcome to <span className="text-primary">Inkwell</span>
      </h1>
      <p className="text-[#8F8F8F] text-lg max-w-2xl text-center p-4">
        Discover thoughtful articles on technology, programming, and software
        engineering from passionate writers.
      </p>

      <div className="w-full pt-12">
        <h3 className=" text-2xl font-bold pb-6">Latest Articles</h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};
