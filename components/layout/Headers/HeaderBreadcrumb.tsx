import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Stack } from "@/types/ResponseTypes";
import Link from "next/link";

interface BreadCrumbTypes {
  currentStack: string;
  stacks: Stack[];
}
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useSubjectsContext } from "@/context/SubjectContext";

export function HeaderBreadcrumb({ currentStack, stacks }: BreadCrumbTypes) {
  const { subject, stack } = useParams();
  const pathname = window.location.pathname;

  const lastSegment = pathname.split("/").pop();

    const {subjects, getSubjectById } = useSubjectsContext()
    const [ currentSubject, setCurrentSubject ] = useState<string>("")

    useEffect(() => {
        const fetchSubject = async () => {
            if(!subject || typeof subject !== "string") return
            const response = await getSubjectById(subject)
            console.log(response)
            setCurrentSubject(response?.name || '')
        }
        fetchSubject()
        console.log("Fetch subject initiated")
    }, [subject])
    console.log(currentSubject)
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/app">App</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center gap-1">
              {/* <p className=" mt-4 h-4 w-16">{currentSubject}</p> */}
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {stacks.map((s) => {
                return (
                  <Link href={`/app/cards/${subject}/${s.uuid}`}>
                    <DropdownMenuItem>{s.name}</DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/app/cards/${subject}/${stack}`}>{currentStack}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {lastSegment === "create" ? "create" : ""}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
