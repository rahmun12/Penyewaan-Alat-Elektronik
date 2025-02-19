"use client";
import { FC, memo } from "react";
import { HasQueryClientProps } from "./HasQueryClient.type";
import HasQueryClientView from "./HasQueryClient.view";
import { QueryClient } from "@tanstack/react-query";

const HasQueryClient: FC<HasQueryClientProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return <HasQueryClientView queryClient={queryClient} children={children} />;
};

export default memo(HasQueryClient);
