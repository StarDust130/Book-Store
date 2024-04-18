import { FcViewDetails } from "react-icons/fc";
import React from "react";
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
import { X } from "lucide-react";

interface Props {
  _id: string;
  title: string;
  author: string;
  description: string;
  publishYear: string;
  pages?: string;
}

const Details: React.FC<Props> = ({
  _id,
  title,
  description,
  publishYear,
  pages,
  author,
}) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <FcViewDetails size={20} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              <strong>Id:</strong> {_id}
              <br />
              {description}
              <br />
              <strong>Author:</strong> {author}
              <br />
              <strong>Published Year:</strong> {publishYear}
              <br />
              <strong>Pages:</strong> {pages}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
            <div className="absolute top-5 right-5">
              <DrawerClose>
                <X />
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Details;
