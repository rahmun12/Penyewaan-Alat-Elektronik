import { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";

export interface HasQueryClientProps {
  children: ReactNode;
}

export interface HasQueryClientViewProps {
  queryClient: QueryClient;
  children: ReactNode;
}
