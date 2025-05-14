"use client"
import { memo } from "react"
import { Home, Search, Settings, Book, Plus } from "lucide-react"
import Link from "next/link"
import { useSubjectsContext } from "@/context/SubjectContext"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CreateParent } from "../dialogs/createParent"

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
]

function SidebarComponent() {
  const { subjects, createSubject } = useSubjectsContext()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* ---- Cards Section ---- */}
              <Collapsible defaultOpen className="group/collapsible">
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
                          createSubject({name: name, description: description})
                        }}
                      />
                    </Dialog>
                  </div>
                </SidebarMenuItem>

                <CollapsibleContent>
                  {/* ---- List Subjects ---- */}
                  {subjects.map((subject) => (
                    <Collapsible key={subject.uuid} className="pl-4">
                      <SidebarMenuItem>
                        <div className="w-full flex items-center justify-between">
                          <CollapsibleTrigger asChild>
                            <Link href={`/app/${subject.uuid}`} className="w-full">
                              <SidebarMenuButton className="col-span-4">
                                <span>{subject.name}</span>
                              </SidebarMenuButton>
                            </Link>
                          </CollapsibleTrigger>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="p-1">
                                <Plus size={14} className="opacity-60" />
                              </Button>
                            </DialogTrigger>
                            <CreateParent
                              title="Create Stack"
                              description={`Create a new stack under ${subject.name}`}
                              onClickFunction={({ name, description }) => {
                                console.log("Creating stack under subject:", subject.uuid, {
                                  name,
                                  description,
                                })
                                // Add your logic here
                              }}
                            />
                          </Dialog>
                        </div>
                      </SidebarMenuItem>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <span className="text-muted-foreground pl-2">Stacks coming soon...</span>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* ---- Static Menu Items ---- */}
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export const AppSidebar = memo(SidebarComponent)
