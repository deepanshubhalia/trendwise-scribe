"use client";

import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  thumbnail,
  category,
  readTime,
  publishedAt,
  author,
}: ArticleCardProps) => {
  return (
    <Link href={`/article/${id}`} className="block group">
      <article className="article-card">
        <div className="aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {readTime}  2 {publishedAt}
            </span>
          </div>
          
          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center gap-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{author.name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard; 