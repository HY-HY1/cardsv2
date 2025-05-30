"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSubjectsContext } from "@/context/SubjectContext";
import { Subject } from "@/types/ResponseTypes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChildCard from "./_components/ChildCard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateParent } from "@/components/dialogs/createParent";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteAlert } from "@/components/dialogs/deleteAlert";
import { useRouter } from "next/navigation";
import { useStacksContext } from "@/context/StackContext";
import Link from "next/link";
import { Plus } from "lucide-react";

const SubjectPage = () => {
  const { subject } = useParams(); // Get 'subject' from the URL params
  const {
    subjects,
    loading: subjectLoading,
    editSubject,
    deleteSubject,
  } = useSubjectsContext();
  const {
    stacks,
    loading: stacksLoading,
    getStacks,
    createStack,
  } = useStacksContext();
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof subject === "string") {
      getStacks(subject);
    }
  }, [subject, getStacks]);

  useEffect(() => {
    if (!subject || !subjects) return;
    const found = subjects.find((s) => s.uuid === subject);
    setCurrentSubject(found || null);
  }, [subject, subjects]);

  // Filter stacks to only those belonging to currentSubject
  const filteredStacks = stacks.filter(
    (stack) => stack.subjectId === currentSubject?.uuid
  );

  if (subjectLoading || stacksLoading) {
    return <div>Loading...</div>;
  }

  if (!currentSubject) {
    return <div>Subject not found.</div>;
  }

  return (
    <div>
      <header className="w-full border-b flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{currentSubject.name}</h1>
          <p className="text-muted-foreground">{currentSubject.description}</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-3">
                Edit {currentSubject.name}
              </Button>
            </DialogTrigger>
            <CreateParent
              title={`Edit ${currentSubject.name}`}
              description={`Update the subject "${currentSubject.name}".`}
              onClickFunction={({ name, description }) => {
                editSubject({
                  name,
                  description,
                  id: currentSubject.uuid,
                });
              }}
            />
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <DeleteAlert
              id={currentSubject.uuid}
              onClickFunction={(id) => {
                deleteSubject(id);
                router.push("/app/cards");
              }}
            />
          </AlertDialog>
        </div>
      </header>

      <div className="mt-4 w-full">
        <div className="w-full flex flex-row py-2 ">
          <h3 className="w-full flex justify-start">Stacks</h3>
          <div className="w-full flex justify-end">
           <Link href={`/app/cards/revise/${currentSubject.uuid}?type=subject`}>
            <Button variant={"default"}>Start Revising</Button>
           </Link>
          </div>
        </div>
        {filteredStacks.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStacks.map((stack) => (
              <div className="w-full" key={stack.uuid}>
                <ChildCard stack={stack} />
              </div>
            ))}

            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full flex h-full rounded-lg border shadow-sm min-h-[200px]">
                  <Button className="m-auto" variant={"outline"}>
                    <Plus size={16} /> Create New
                  </Button>
                </div>
              </DialogTrigger>
              <CreateParent
                title={`Create a ${currentSubject.name} stack`}
                description={`Create a new stack under "${currentSubject.name}".`}
                onClickFunction={({ name, description }) => {
                  createStack(currentSubject.uuid, { name, description });
                }}
              />
            </Dialog>
          </div>
        ) : (
          <div className="w-full h-[400px] flex flex-col items-center justify-center text-center">
            <div className="w-[40%]">
              <h5 className="text-muted">
                You haven't created any stacks for {currentSubject.name}
              </h5>
              <p className="text-muted">Get started now</p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="mt-4">
                    Create New
                  </Button>
                </DialogTrigger>
                <CreateParent
                  title={`Create a ${currentSubject.name} stack`}
                  description={`Create a new stack under "${currentSubject.name}".`}
                  onClickFunction={({ name, description }) => {
                    createStack(currentSubject.uuid, { name, description });
                  }}
                />
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;
