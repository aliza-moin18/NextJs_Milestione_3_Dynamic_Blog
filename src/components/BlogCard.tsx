"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type BlogCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
};

export default function BlogCard({ title, description, imageUrl, slug }: BlogCardProps) {
  return (
    <motion.div
      className="bg-black text-white rounded-lg shadow-lg overflow-hidden border border-[#48cfad] flex flex-col h-full"
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Image Section */}
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      
      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow"> 
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-200 text-sm mb-4 flex-grow">{description}</p>

        {/* Read More Button */}
        <div className="mt-auto">
          <Link href={`/blog/${slug}`} className="text-[#48cfad] font-bold hover:underline">
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
