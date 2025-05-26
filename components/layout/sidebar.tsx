"use client";

import { memo, useEffect, useState } from "react";
import {
  Home,
  Search,
  Settings,
  Book,
  Plus,
  Calendar,
  ChartBar,
} from "lucide-react";
import Link from "next/link";
import { useSubjectsContext } from "@/context/SubjectContext";
import { useStacksContext } from "@/context/StackContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { Calculator, CreditCard, Smile, User } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateParent } from "../dialogs/createParent";
import SearchBox from "../command/searchBox";

const items = [
  { title: "Home", url: "/app", icon: Home },
  { title: "Exams", url: "/app/exams", icon: Calendar },
  { title: "Statistics", url: "/app/statistics", icon: ChartBar },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

function SidebarComponent() {
  const { subjects, createSubject } = useSubjectsContext();
  const { stacks } = useStacksContext();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* ---- Cards Section ---- */}
              <Collapsible defaultOpen className="group/collapsible">
                {/* Cards + Create Subject */}
                <SidebarMenuItem>
                  <div className="w-full flex items-center justify-between">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Book size={14} />
                        <span>Cards</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="p-1">
                          <Plus size={14} className="opacity-60" />
                        </Button>
                      </DialogTrigger>
                      <CreateParent
                        title="Create Subject"
                        description="Create a new subject"
                        onClickFunction={({ name, description }) => {
                          createSubject({ name, description });
                        }}
                      />
                    </Dialog>
                  </div>
                </SidebarMenuItem>

                {/* Subjects and Stacks */}
                <CollapsibleContent>
                  {subjects.map((subject) => (
                    <Collapsible key={subject.uuid} className="pl-4">
                      <SidebarMenuItem>
                        <div className="w-full flex items-center justify-between">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild>
                              <Link
                                href={`/app/cards/${subject.uuid}`}
                                className="w-full"
                              >
                                <span>{subject.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="p-1"
                              >
                                <Plus size={14} className="opacity-60" />
                              </Button>
                            </DialogTrigger>
                            <CreateParent
                              title="Create Stack"
                              description={`Create a new stack under ${subject.name}`}
                              onClickFunction={({ name, description }) => {
                                console.log(
                                  "Creating stack under subject:",
                                  subject.uuid,
                                  { name, description }
                                );
                                // Implement stack creation logic
                              }}
                            />
                          </Dialog>
                        </div>
                      </SidebarMenuItem>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {stacks.filter(
                            (stack) => stack.subjectId === subject.uuid
                          ).length > 0 ? (
                            stacks
                              .filter(
                                (stack) => stack.subjectId === subject.uuid
                              )
                              .map((stack) => (
                                <SidebarMenuSubItem key={stack.uuid}>
                                  <Link
                                    href={`/app/cards/${subject.uuid}/${stack.uuid}`}
                                    className="block w-full text-sm hover:underline pl-2"
                                  >
                                    {stack.name}
                                  </Link>
                                </SidebarMenuSubItem>
                              ))
                          ) : (
                            <SidebarMenuSubItem>
                              <span className="text-muted-foreground pl-2">
                                No stacks yet
                              </span>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* ---- Static Menu Items ---- */}
              <div>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon size={14} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Search trigger */}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setOpen(!open)}>
                    <Search size={14} />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            </SidebarMenu>

            {/* ---- SearchBox Component ---- */}
            <CommandDialog open={open}>
              <CommandInput placeholder="Type a command or search..." />
                <SearchBox setOpen={setOpen}/>
            </CommandDialog>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export const AppSidebar = memo(SidebarComponent);
