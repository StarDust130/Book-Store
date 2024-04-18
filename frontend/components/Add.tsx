import axios from "axios";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  publishYear: string;
  pages?: string;
}

interface AddProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>; // Function to update books array
  books: Book[]; // Array of books
}

const Add: React.FC<AddProps> = ({ setBooks, books }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPublishYear, setNewPublishYear] = useState("");
  const [newPages, setNewPages] = useState("");
  const handleAdd = async () => {
    const newBook = {
      title: newTitle,
      author: newAuthor,
      description: newDescription,
      publishYear: newPublishYear,
      pages: newPages,
    };

    try {
      const response = await axios.post(`http://localhost:5000/books`, newBook);
      toast.success("Book added successfully! 🥳");

      // Update the books list with the newly added book
      setBooks([...books, newBook]);

      // Clear input fields after adding the book
      setNewTitle("");
      setNewAuthor("");
      setNewDescription("");
      setNewPublishYear("");
      setNewPages("");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book. Please try again.");
    }
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <IoIosAddCircleOutline
            size={30}
            className="cursor-pointer text-left"
          />
        </DrawerTrigger>
        <DrawerContent className="bg-gray-100 p-4 rounded-lg">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold mb-2">
              Add 📝
            </DrawerTitle>
            <DrawerDescription>
              This action will add a new book to the database.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                  id="author"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publishYear" className="text-right">
                  Publish Year
                </Label>
                <Input
                  id="publishYear"
                  value={newPublishYear}
                  onChange={(e) => setNewPublishYear(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pages" className="text-right">
                  Pages
                </Label>
                <Input
                  id="pages"
                  value={newPages}
                  onChange={(e) => setNewPages(e.target.value)}
                />
              </div>
            </div>
          </DrawerDescription>
          <DrawerFooter className="mt-4">
            <div className="flex justify-center gap-10 items-center">
              <DrawerClose>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleAdd}
                >
                  Submit
                </Button>
              </DrawerClose>
              <DrawerClose>
                <Button
                  variant="default"
                  className="bg-gray-300 hover:bg-gray-400 text-black"
                >
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Add;
