"use client"
import React, { useState, useEffect } from "react";
import { LuCodesandbox } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from "next/image";

const Article = ({ params }) => {
  const router = useRouter();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `/article/get-by-id/${params.id}`);
        const { data } = response;
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, []);

  const handleHeaderClick = () => {
    router.push('/');
  };

  if (!article) {
    return <div className="w-screen h-screen flex justify-center items-center text-xl font-bold">...</div>;
  }

  // Format date
  const createdAt = new Date(article.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Convert base64 image to data URL
  const imageDataUrl = `data:image/jpeg;base64,${article.image}`;

  return (
    <div>
      <div className="h-[70px] bg-primary flex items-center justify-center" onClick={handleHeaderClick}>
        <div className="text-2xl md:text-xl flex items-center justify-center">
          <LuCodesandbox className="text-3xl" />
          <div className="m-2 text-secondary">RecycleLens</div>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <Image src={imageDataUrl} alt={article.title} width={500} height={300} className="my-5" />
        <div className="m-3 p-3 flex items-center">
          <div className="bg-slate-400 w-[40px] h-[40px] rounded-full"></div>
          <div className="mx-3">
            <div>{article.creator}</div>
            <div className="text-gray-600 text-sm">
              <p>{article.timeToRead} min read | {createdAt}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <p>{article.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Article;
