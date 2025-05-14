"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateSubject } from "@/types/RequestTypes";

interface CreateParentTypes {
  title: string;
  description: string;
  onClickFunction({ name, description }: CreateSubject): void;
}

export function CreateParent({
  title,
  description,
  onClickFunction,
}: CreateParentTypes) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() =>
              onClickFunction({ name: name, description: desc })
            }
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
  );
}
