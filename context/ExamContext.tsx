// context/ExamsContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";
  
  import {
    getExamsRequest,
    getExamByIdRequest,
    createExamRequest,
    updateExamRequest,
    deleteExamRequest,
    linkExamRequest,
    removeLinkExamRequest,
  } from "@/hooks/useExams";
  
  import {
    ExamBase,
    CreateExamRequest,
    UpdateExamRequest,
    ExamIdParams,
    StackLinkParams,
  } from "@/types/RequestTypes";
  
  import {
    ExamsResponse,
    ExamResponse,
    CreateExamResponse,
    UpdateExamResponse,
    DeleteExamResponse,
    StackLinkResponse,
  } from "@/types/ResponseTypes";
import { fetchExamByIdResponse } from "@/app/app/exams/[id]/page";
  
  interface ExamsContextType {
    exams: ExamBase[] | null;
    loading: boolean;
    error: string | null;
  
    fetchExams: () => Promise<void>;
    fetchExamById: (id: ExamIdParams["id"]) => Promise<fetchExamByIdResponse | null>;
    createExam: (data: CreateExamRequest) => Promise<ExamBase | null>;
    updateExam: (id: ExamIdParams["id"], data: UpdateExamRequest) => Promise<ExamBase | null>;
    deleteExam: (id: ExamIdParams["id"]) => Promise<ExamBase | null>;
    linkStackToExam: (params: StackLinkParams) => Promise<StackLinkResponse | null>;
    unlinkStackFromExam: (params: StackLinkParams) => Promise<StackLinkResponse | null>;
  }
  
  const ExamsContext = createContext<ExamsContextType | undefined>(undefined);
  
  export const ExamsProvider = ({ children }: { children: ReactNode }) => {
    const [exams, setExams] = useState<ExamBase[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    async function fetchExams() {
      setLoading(true);
      setError(null);
      try {
        const data: ExamsResponse = await getExamsRequest();
        setExams(data.exams);
      } catch (err: any) {
        setError(err.message || "Failed to fetch exams");
      } finally {
        setLoading(false);
      }
    }
  
    async function fetchExamById(id: ExamIdParams["id"]) {
      setLoading(true);
      setError(null);
      try {
        const data: fetchExamByIdResponse = await getExamByIdRequest(id);
        return data;
      } catch (err: any) {
        setError(err.message || "Failed to fetch exam");
        return null;
      } finally {
        setLoading(false);
      }
    }
  
    async function createExam(data: CreateExamRequest) {
      setLoading(true);
      setError(null);
      try {
        const response: CreateExamResponse = await createExamRequest(data);
        // Update local state with new exam
        setExams((prev) => (prev ? [...prev, response.exam] : [response.exam]));
        return response.exam;
      } catch (err: any) {
        setError(err.message || "Failed to create exam");
        return null;
      } finally {
        setLoading(false);
      }
    }
  
    async function updateExam(id: ExamIdParams["id"], data: UpdateExamRequest) {
      setLoading(true);
      setError(null);
      try {
        const response: UpdateExamResponse = await updateExamRequest(id, data);
        // Update local state
        setExams((prev) =>
          prev
            ? prev.map((exam) => (exam.uuid === id ? response.exam : exam))
            : null
        );
        return response.exam;
      } catch (err: any) {
        setError(err.message || "Failed to update exam");
        return null;
      } finally {
        setLoading(false);
      }
    }
  
    async function deleteExam(id: ExamIdParams["id"]) {
      setLoading(true);
      setError(null);
      try {
        const response: DeleteExamResponse = await deleteExamRequest(id);
        // Remove from local state
        setExams((prev) => (prev ? prev.filter((exam) => exam.uuid !== id) : null));
        return response.deleted;
      } catch (err: any) {
        setError(err.message || "Failed to delete exam");
        return null;
      } finally {
        setLoading(false);
      }
    }
  
    async function linkStackToExam(params: StackLinkParams) {
      setLoading(true);
      setError(null);
      try {
        const response: StackLinkResponse = await linkExamRequest(params);
        // Update the specific exam's stacks locally
        setExams((prev) =>
          prev
            ? prev.map((exam) =>
                exam.uuid === response.exam.uuid
                  ? { ...exam, Stacks: response.exam.Stacks }
                  : exam
              )
            : null
        );
        return response;
      } catch (err: any) {
        setError(err.message || "Failed to link stack to exam");
        return null;
      } finally {
        setLoading(false);
      }
    }
  
    async function unlinkStackFromExam(params: StackLinkParams) {
      setLoading(true);
      setError(null);
      try {
        const response: StackLinkResponse = await removeLinkExamRequest(params);
        // Update local state for stacks
        setExams((prev) =>
          prev
            ? prev.map((exam) =>
                exam.uuid === response.exam.uuid
                  ? { ...exam, Stacks: response.exam.Stacks }
                  : exam
              )
            : null
        );
        return response;
      } catch (err: any) {
        setError(err.message || "Failed to unlink stack from exam");
        return null;
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      fetchExams();
    }, []);
  
    return (
      <ExamsContext.Provider
        value={{
          exams,
          loading,
          error,
          fetchExams,
          fetchExamById,
          createExam,
          updateExam,
          deleteExam,
          linkStackToExam,
          unlinkStackFromExam,
        }}
      >
        {children}
      </ExamsContext.Provider>
    );
  };
  
  // Custom hook to use the Exams context
  export function useExams() {
    const context = useContext(ExamsContext);
    if (context === undefined) {
      throw new Error("useExams must be used within an ExamsProvider");
    }
    return context;
  }
  