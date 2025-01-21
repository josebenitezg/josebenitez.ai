"use client";

import { useState, useEffect } from 'react';
import { Card, CardBody, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  cover: string;
  link: string;
}

// Sample books data - you can replace this with your actual data source
const SAMPLE_BOOKS: Book[] = [
  {
    id: 1,
    title: "Blitzcaling",
    cover: "https://m.media-amazon.com/images/I/81C2N5KUVwL.jpg",
    link: "https://www.amazon.com/Blitzscaling-Lightning-Fast-Building-Massively-Companies/dp/1524761419"
  },
  {
    id: 2,
    title: "Why We Sleep",
    cover: "https://m.media-amazon.com/images/I/81aI7fPz5sL._SL1500_.jpg",
    link: "https://a.co/d/grEemFh"
  },
  {
    id: 3,
    title: "The Old Man and the Sea",
    cover: "https://m.media-amazon.com/images/I/71RXc0OoEwL._SL1500_.jpg",
    link: "https://a.co/d/1dHXLGt"
  },
  {
    id: 4,
    title: "The Worlds I see",
    cover: "https://m.media-amazon.com/images/I/81blPlUVdyL._SL1500_.jpg",
    link: "https://a.co/d/0JL7vB2"
  },
  {
    id: 5,
    title: "1984",
    cover: "https://m.media-amazon.com/images/I/71rpa1-kyvL._SL1500_.jpg",
    link: "https://a.co/d/6HP2iMB"
  },
  {
    id: 6,
    title: "The Litle Book of Deep Learning",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1686060481i/174612914.jpg",
    link: "https://a.co/d/968888X"
  },
  // Add more books as needed
];

export default function BookCarousel() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // In a real app, you might fetch this from an API
    setBooks(SAMPLE_BOOKS);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex gap-6 animate-slideRepos">
        {[...books, ...books, ...books].map((book, idx) => (
          <Card 
            key={`${book.id}-${idx}`}
            as={Link}
            href={book.link}
            target="_blank"
            className="w-[140px] sm:w-[160px] h-[200px] sm:h-[220px] shrink-0 glassmorphism hover:scale-105 transition-transform duration-300 group"
          >
            <CardBody className="p-0 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={160}
                  height={220}
                  className="object-cover w-full h-full rounded-lg group-hover:brightness-110 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium line-clamp-2">{book.title}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
} 