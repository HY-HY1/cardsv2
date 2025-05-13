"use client";
import { memo, useEffect } from "react";
import { Home, Search, Settings, Book, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

import { useSubjectsContext } from "@/context/SubjectContext";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

function SidebarComponent() {
  const { subjects } = useSubjectsContext();
  const router = useRouter();

  useEffect(() => {
    subjects.forEach((subject) => {
      const path = `/app/${subject.uuid}`;
      console.log("Prefetching:", path);
      router.prefetch(path);
    });
  }, [subjects, router]); // run only when subjects or router changes

  console.log("Sidebar rendered");

  return (
    <Dialog>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Parent "Cards" item */}
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Book />
                        <span>Cards</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      {/* Render each subject as a nested collapsible */}
                      {subjects.map((subject) => (
                        <Collapsible key={subject.uuid} className="pl-4">
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <div className="grid grid-cols-5 gap-1">
                                <Link
                                  href={`/app/${subject.uuid}`}
                                  className="w-full col-span-4"
                                >
                                  <SidebarMenuButton className="flex items-center justify-between ">
                                    <span className="opacity-80">
                                      {subject.name}
                                    </span>
                                  </SidebarMenuButton>
                                </Link>

                                <DialogTrigger>
                                  <Button variant="outline">
                                    <span className="opacity-40 p-2 cursor-pointer z-50">
                                      <Plus size={14} />
                                    </span>
                                  </Button>
                                </DialogTrigger>
                              </div>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <span className="text-muted-foreground pl-2">
                                    Stacks coming soon...
                                  </span>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      ))}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                {/* Other static menu items */}
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Dialog>
  );
}
export const AppSidebar = memo(SidebarComponent);
