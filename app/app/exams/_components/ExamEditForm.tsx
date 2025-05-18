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
import { useSubjectsContext } from "@/context/SubjectContext";
import * as React from "react";

const examFormSchema = z.object({
  examSubject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  examBoard: z.string().min(2, {
    message: "Board must be at least 2 characters.",
  }),
  examComponent: z.string().min(2, {
    message: "Component must be at least 2 characters.",
  }),
  examDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
});

interface ExamFormProps {
  examId?: string;
}

export function ExamForm({ examId }: ExamFormProps) {
  const { subjects } = useSubjectsContext();
  const [stackIds, setStackIds] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      examSubject: "",
      examBoard: "",
      examComponent: "",
      examDate: "",
    },
  });

  const watchSubject = form.watch("examSubject");

  React.useEffect(() => {
    const selectedSubject = subjects.find((s) => s.name === watchSubject);
    if (selectedSubject) {
      setStackIds(selectedSubject.stackIds || []);
    } else {
      setStackIds([]);
    }
    console.log(stackIds)
  }, [watchSubject, subjects]);

  function onSubmit(values: z.infer<typeof examFormSchema>) {
    const selectedSubject = subjects.find((s) => s.name === values.examSubject);

    const formattedData = {
      ...values,
      subjectId: selectedSubject?.uuid,
      stackIds: selectedSubject?.stackIds || [],
      examDate: new Date(values.examDate),
    };

    if (examId) {
      // Update logic
    } else {
      // Create logic
    }

    console.log("Submitted Exam:", formattedData);
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
                      <SelectLabel>Subject</SelectLabel>
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

        {/* Board */}
        <FormField
          control={form.control}
          name="examBoard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam Board</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an examboard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Board</SelectLabel>
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
                <Input placeholder="Paper 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="examDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Choose the date of the exam.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Exam
        </Button>
      </form>
    </Form>
  );
}
