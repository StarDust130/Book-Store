"use client";

import { useEffect, useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  publishYear: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:5000/books");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        const fetchedBooks: Book[] = responseData.books; // Extract 'books' array from API response
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state (e.g., show error message to user)
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      Hello from frontend 😁
      {books.length > 0 ? (
        books.map((book: Book) => (
          <div key={book._id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Description: {book.description}</p>
            <p>Publish Year: {book.publishYear}</p>
            {/* Add more book details as needed */}
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </main>
  );
}
