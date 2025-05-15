import { SubjectsProvider } from "./SubjectContext";
import { StacksProvider } from "./StackContext";
import { CardsProvider } from "./CardContext";

export default function ContextProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <SubjectsProvider>
          <StacksProvider>
            <CardsProvider>
                {children}
            </CardsProvider>
          </StacksProvider>
        </SubjectsProvider>
    );
  }