"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Delete from "@/components/Delete";
import Edit from "@/components/Edit";
import Details from "@/components/Details";
import Add from "@/components/Add";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  publishYear: string;
  createdAt: string;
  updatedAt: string;
  pages: string;
  __v: number;
  onUpdateBook: (updatedBook: Book) => void;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        setBooks(res.data.books);
        console.log(res.data.books);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: any) => {
    // Remove the deleted book from the list
    const updatedBooks = books.filter((book) => book._id !== id);
    setBooks(updatedBooks); // Update state to trigger re-render and reflect deletion
  };

  const handleUpdateBook = () => {
    if (editBook) {
      const updatedBooks = books.map((book) =>
        book._id === editBook._id ? editBook : book
      );
      setBooks(updatedBooks); // Update the books state with the edited book
      setEditBook(null); // Clear editBook state after update
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex justify-center items-center w-full h-full flex-col">
      <div className="flex justify-center gap-10 w-full  items-center m-10">
        <div className="flex justify-center items-center">
          <h1 className="font-normal text-2xl  text-gray-500 ">Book List 📚</h1>
        </div>
        <div className="flex justify-center items-center  ">
          <abbr title="Add">
            <Add setBooks={setBooks} books={books} />
          </abbr>
        </div>
      </div>

      <Table>
        <TableCaption className="mt-10">A list of Great Books</TableCaption>
        <TableHeader>
          <TableRow className="text-ceter">
            <TableHead className="text-center">Sr No.</TableHead>
            <TableHead className="text-center">Authors</TableHead>
            <TableHead className="text-center">Books</TableHead>
            <TableHead className="text-center">Publish Years</TableHead>
            <TableHead className="text-center">Tools</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-cener">
          {loading && <Loading />}
          {books.map((book: Book, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell className="text-center">{book.author}</TableCell>
              <TableCell className="text-center">{book.title}</TableCell>
              <TableCell className="text-center">{book.publishYear}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center gap-5 cursor-pointer">
                  <abbr title="Details">
                    <Details
                      title={book.title}
                      author={book.author}
                      description={book.description}
                      publishYear={book.publishYear}
                      pages={book.pages}
                      _id={book._id}
                    />
                  </abbr>{" "}
                  <abbr title="Edit">
                    {" "}
                    <Edit
                      _id={book._id}
                      title={book.title}
                      author={book.author}
                      description={book.description}
                      publishYear={book.publishYear}
                      pages={book.pages}
                      onUpdateBook={handleUpdateBook}
                    />
                  </abbr>{" "}
                  <abbr title="Delete">
                    <Delete id={book._id} onDelete={handleDelete} />
                  </abbr>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

// 35:32
