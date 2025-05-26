import {
  Home,
  Calendar,
  ChartBar,
  Search,
  User,
  CreditCard,
  Settings,
  Plus,
} from "lucide-react";

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

function SearchBox({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandGroup heading="Suggestions">
        <CommandItem onSelect={() => { window.location.href = "/app"; setOpen(false); }}>
          <Home size={14} />
          <span>Home</span>
        </CommandItem>
        <CommandItem onSelect={() => { window.location.href = "/app/exams"; setOpen(false); }}>
          <Calendar size={14} />
          <span>Exams</span>
        </CommandItem>
        <CommandItem onSelect={() => { window.location.href = "/app/statistics"; setOpen(false); }}>
          <ChartBar size={14} />
          <span>Statistics</span>
        </CommandItem>
        <CommandItem onSelect={() => setOpen(false)}>
          <Search size={14} />
          <span>Search Cards</span>
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Settings">
        <CommandItem onSelect={() => { /* Implement profile navigation or modal */ setOpen(false); }}>
          <User size={14} />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem onSelect={() => { /* Implement billing navigation or modal */ setOpen(false); }}>
          <CreditCard size={14} />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem onSelect={() => { window.location.href = "/app/settings"; setOpen(false); }}>
          <Settings size={14} />
          <span>App Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Create">
        <CommandItem
          onSelect={() => {
            setOpen(false);
            // TODO: Trigger create subject dialog or navigate to creation page
            console.log("Trigger create subject");
          }}
        >
          <Plus size={14} />
          <span>Create Subject</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  );
}

export default SearchBox