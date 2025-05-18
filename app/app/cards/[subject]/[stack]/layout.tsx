"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useStacksContext } from "@/context/StackContext";
import { Button } from "@/components/ui/button";
import { CreateParent } from "@/components/dialogs/createParent";
import { Trash2 } from "lucide-react";
import { DeleteAlert } from "@/components/dialogs/deleteAlert";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { HeaderBreadcrumb } from "@/components/layout/Headers/HeaderBreadcrumb";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { stack, subject } = useParams();
  const router = useRouter();
  const { getStacks, getStackById, editStack, deleteStack, stacks } = useStacksContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!subject) return;

    const fetchStacks = async () => {
      try {
        setIsLoading(true);
         await getStacks(subject as string);
      } catch (error) {
        console.error("Error fetching stacks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStacks();
  }, [subject, getStacks]);

  const currentStack = useMemo(() => {
    return getStackById(stack as string);
  }, [getStackById, stack]);




  return (
    <>
      <header className="w-full border-b py-4 px-6">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading stack...</p>
        ) : currentStack ? (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <HeaderBreadcrumb currentStack={currentStack.name} stacks={stacks}/>
              <h1 className="text-2xl font-bold">{currentStack.name}</h1>
              <p className="text-muted-foreground">{currentStack.description}</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit {currentStack.name}</Button>
                </DialogTrigger>
                <CreateParent
                  title={`Edit ${currentStack.name}`}
                  description={`Update the stack "${currentStack.name}".`}
                  onClickFunction={({ name, description }) => {
                    editStack(currentStack.uuid, {
                      name,
                      description: description || "",
                    });
                  }}
                />
              </Dialog>

              {/* Delete Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <DeleteAlert
                  id={currentStack.uuid}
                  onClickFunction={() => {
                    deleteStack(currentStack.uuid);
                    router.push(`/app/${subject}`);
                  }}
                />
              </AlertDialog>
            </div>
          </div>
        ) : (
          <p className="text-sm text-destructive">Stack not found</p>
        )}
      </header>

      <main className="w-[90vw] w-full mt-10">{children}</main>
    </>
  );
}
