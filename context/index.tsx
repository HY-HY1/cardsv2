import { SubjectsProvider } from "./SubjectContext";
import { StacksProvider } from "./StackContext";
import { CardsProvider } from "./CardContext";
import { ExamsProvider } from "./ExamContext";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExamsProvider>
      <SubjectsProvider>
        <StacksProvider>
          <CardsProvider>{children}</CardsProvider>
        </StacksProvider>
      </SubjectsProvider>
    </ExamsProvider>
  );
}
