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

import { FcEditImage } from "react-icons/fc";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  publishYear: string;
  pages?: string;
  onUpdateBook: (updatedBook: Book) => void;
}

const Edit = ({
  _id,
  title,
  description,
  publishYear,
  pages,
  author,
  onUpdateBook,
}: Book) => {
  const [newTitle, setTitle] = useState(title);
  const [newAuthor, setAuthor] = useState(author);
  const [newDescription, setDescription] = useState(description);
  const [newPublishYear, setPublishYear] = useState(publishYear);
  const [newPages, setPages] = useState(pages || "");

  const handleEdit = async () => {
    const updatedBook = {
      _id,
      title: newTitle,
      author: newAuthor,
      description: newDescription,
      publishYear: newPublishYear,
      pages: newPages,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/books/${_id}`,
        updatedBook
      );

      const editedBook = response.data; // Assuming the response contains the updated book object
      toast.success("Book edited successfully! 🥳");
      onUpdateBook(editedBook); // Update the book in the parent component
    } catch (error) {
      console.error("Error editing book:", error);
      toast.error("Failed to edit book. Please try again.");
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <FcEditImage size={20} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit 📝</DrawerTitle>
            <DrawerDescription>This action edit in database.</DrawerDescription>
          </DrawerHeader>
          <DrawerDescription>
            <div className="grid gap-4 py-4 mx-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newTitle}
                  className="col-span-3  outline-none  "
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                  id="author"
                  value={newAuthor}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newDescription}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Publish Year
                </Label>
                <Input
                  id="publishYear"
                  value={newPublishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pages" className="text-right">
                  Pages
                </Label>
                <Input
                  id="pages"
                  value={newPages}
                  onChange={(e) => setPages(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </DrawerDescription>
          <DrawerFooter>
            <div className="flex justify-center gap-10 items-center">
              <DrawerClose>
                <Button
                  className=" hover:bg-blue-600 bg-blue-500"
                  onClick={handleEdit}
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
export default Edit;
