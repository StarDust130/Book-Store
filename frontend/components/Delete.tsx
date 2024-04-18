import axios from "axios";
import { MdDelete } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";




const DeleteBook = ({ id, onDelete }: { id: string, onDelete: (id: string) => void }) => {
  const handleDelete = () => {
    // Send DELETE request to delete the book with the specified 'id'
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then((res) => {
        toast("Book deleted successfully! 🥳");

        console.log("Deleted Book with ID:", id);
        onDelete(id); // Notify parent component of successful deletion
        // Optionally, you can perform additional actions upon successful deletion
      })
      .catch((err) => {
        console.error("Error deleting book:", err);
        // Handle errors appropriately (e.g., display an error message)
      });
  };

  

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <MdDelete size={20} color="red" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}  className="bg-red-500 hover:bg-red-600">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </div>
  );
};

export default DeleteBook;
