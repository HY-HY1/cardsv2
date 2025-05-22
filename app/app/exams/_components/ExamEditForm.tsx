"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, X } from "lucide-react";
import { useSubjectsContext } from "@/context/SubjectContext";
import { useExams } from "@/context/ExamContext";
import { useEffect, useState } from "react";
import { useStacksContext } from "@/context/StackContext";
import { Stack } from "@/types/ResponseTypes";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ExamBase } from "@/types/RequestTypes";

const examFormSchema = z.object({
  examSubject: z.string().min(2),
  examBoard: z.string().min(2),
  examComponent: z.string().min(2),
  examDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
  linkedStacks: z.array(z.string()).optional(),
});

interface ExamFormProps {
  examId?: string;
  onEditSuccess?: (updatedExam: ExamBase) => void;
}

export function ExamForm({ examId, onEditSuccess }: ExamFormProps) {
  const { subjects } = useSubjectsContext();
  const { stacks, getStacks } = useStacksContext();
  const { createExam, updateExam, fetchExamById } = useExams();
  const [availableStacks, setAvailableStacks] = useState<Stack[]>([]);
  const [selectedStackId, setSelectedStackId] = useState<string>("");
  const [exam, setExam] = useState<ExamBase | null>(null);


  

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      examSubject: exam?.examSubject || "",
      examBoard: exam?.examBoard || "",
      examComponent: exam?.examComponent || "",
      examDate: exam?.ExamDate ?? "",
      linkedStacks: [],
    },
  });

  const handleEdit = (updatedExam: ExamBase) => {

    if (onEditSuccess) {
      onEditSuccess(updatedExam);
    }
  }

  useEffect(() => {
    const fetchResponse = async () => {
      if (!examId) return;
  
      const examData = await fetchExamById(examId);
      if (examData) {
        setExam(examData);
        console.log(`Fetched Exam: ${examData.uuid}`);
  
        // Reset the form with the fetched exam data
        form.reset({
          examSubject: examData.examSubject,
          examBoard: examData.examBoard,
          examComponent: examData.examComponent,
          examDate: examData.ExamDate,
          linkedStacks: [],
        });
      }
    };
  
    fetchResponse();
  }, [examId, form]);

  const selectedStacks = form.watch("linkedStacks") ?? [];

  useEffect(() => {
    const fetchStacks = async () => {
      const subject = subjects.find(
        (s) => s.name === form.getValues("examSubject")
      );
      if (subject?.uuid) {
        await getStacks(subject.uuid);
      }
    };
    fetchStacks();
  }, [form.watch("examSubject")]);

  useEffect(() => {
    const filtered = stacks.filter((s) => !selectedStacks.includes(s.uuid));
    setAvailableStacks(filtered);
  }, [selectedStacks, stacks]);

  const addStack = () => {
    if (!selectedStackId || selectedStacks.includes(selectedStackId)) return;
    form.setValue("linkedStacks", [...selectedStacks, selectedStackId]);
    setSelectedStackId("");
  };

  const removeStack = (uuid: string) => {
    const updated = selectedStacks.filter((id) => id !== uuid);
    form.setValue("linkedStacks", updated);
  };

  async function onSubmit(values: z.infer<typeof examFormSchema>) {
    const subject = subjects.find((s) => s.name === values.examSubject);
    if (!subject) return;
  
    const apiValues = {
      examBoard: values.examBoard,
      examSubject: values.examSubject,
      ExamDate: values.examDate,
      examComponent: values.examComponent,
      SubjectId: subject.uuid,
      linkedStacks: values.linkedStacks || [],
    };
  
    console.log(apiValues);
  
    if (examId) {
      const updated = await updateExam(examId, apiValues);
      if (updated && onEditSuccess) {
        onEditSuccess(updated); // Update parent state
      }
    } else {
      await createExam(apiValues); // (Handle creation separately if needed)
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Subject */}
        <FormField
          control={form.control}
          name="examSubject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>

                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subjects.map((s) => (
                        <SelectItem key={s.uuid} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Exam Board */}
        <FormField
          control={form.control}
          name="examBoard"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Exam Board</FormLabel>
              <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>

                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an exam board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="AQA">AQA</SelectItem>
                      <SelectItem value="Edexcel">Edexcel</SelectItem>
                      <SelectItem value="Equqas">Equqas</SelectItem>
                      <SelectItem value="OCR">OCR</SelectItem>
                      <SelectItem value="WJEC">WJEC</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Component */}
        <FormField
          control={form.control}
          name="examComponent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Component</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Paper 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="examDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value
                      ? format(new Date(field.value), "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    className="bg-white border rounded-md shadow-lg`"
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(date.toISOString());
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Linked Stacks */}
        <FormField
          control={form.control}
          name="linkedStacks"
          render={() => (
            <FormItem>
              <FormLabel>Linked Stacks</FormLabel>
              <div className="space-y-2">
                {selectedStacks.map((uuid) => {
                  const stack = stacks.find((s) => s.uuid === uuid);
                  if (!stack) return null;
                  return (
                    <div
                      key={uuid}
                      className="flex items-center justify-between border-b p-2 shadow-sm rounded-md bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      <span>{stack.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStack(uuid)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}

                {availableStacks.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedStackId}
                      onValueChange={setSelectedStackId}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a stack to link" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {availableStacks.map((stack) => (
                            <SelectItem key={stack.uuid} value={stack.uuid}>
                              {stack.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={addStack}>
                      Add
                    </Button>
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
