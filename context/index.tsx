import { SubjectsProvider } from "./SubjectContext";
import { StacksProvider } from "./StackContext";
import { CardsProvider } from "./CardContext";
import { ExamsProvider } from "./ExamContext";
import { RevisionCardsProvider } from "./ReviseContext";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExamsProvider>
      <SubjectsProvider>
        <StacksProvider>
          <RevisionCardsProvider>
            <CardsProvider>{children}</CardsProvider>
          </RevisionCardsProvider>
        </StacksProvider>
      </SubjectsProvider>
    </ExamsProvider>
  );
}
