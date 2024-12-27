"use client"; 

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchBlogBySlug } from "@/app/data/page"; 

type Comment = {
  name: string;
  message: string;
};

type Blog = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  comments?: Comment[];
};

export default function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = params; 
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState({ name: "", message: "" });

  useEffect(() => {
    const getBlogBySlug = async () => {
      try {
        const fetchedBlog = await fetchBlogBySlug(slug);
        console.log("Fetched Blog:", fetchedBlog); 
        if (fetchedBlog) {
          setBlog(fetchedBlog); 
        } else {
          console.error("Blog not found");
          setBlog(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setIsLoading(false);
      }
    };

    if (slug) {
      getBlogBySlug();
    }
  }, [slug]);  

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (blog && newComment.name && newComment.message) {
      const updatedComments = [...(blog.comments || []), newComment];
      setBlog({ ...blog, comments: updatedComments });
      setNewComment({ name: "", message: "" });
    } else {
      alert("Please fill in both fields.");
    }
  };

  if (isLoading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center text-white">Blog not found.</p>;
  }

  const paragraphs = blog.content.split('\n').map((paragraph, index) => paragraph.trim()).filter(Boolean);

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto py-12 px-6 sm:px-8 md:px-16 lg:px-40">

      {/* Displaying Blog Title and Description */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{blog.title}</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-2">{blog.description}</p>

      {/* Image Section */}
        <div className="mt-6">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={800}
            height={450}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Blog Content Section */}
        <div className="mt-8 text-base sm:text-lg md:text-xl text-gray-200">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>

        {/* Comments Section */}
        {blog.comments && blog.comments.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl sm:text-3xl font-semibold">Comments:</h3>
            <div className="space-y-4 mt-4">
              {blog.comments.map((comment, index) => (
                <div key={index} className="border-b pb-4">
                  <h4 className="font-bold text-lg sm:text-xl">{comment.name}</h4>
                  <p className="text-gray-400">{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comment Input Form */}
        <div className="mt-12">
          <h3 className="text-2xl sm:text-3xl font-semibold">Leave a Comment:</h3>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg sm:text-xl text-gray-300">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newComment.name}
                onChange={handleCommentChange}
                className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-lg sm:text-xl text-gray-300">Your Comment</label>
              <textarea
                id="message"
                name="message"
                value={newComment.message}
                onChange={handleCommentChange}
                className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
                required
              />
            </div>

            <button type="submit" className="px-8 py-2 bg-[#48cfad] text-black text-xl sm:text-2xl rounded-[34px] hover:bg-green-500 font-bold">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
