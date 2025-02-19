import { FC, memo } from "react";
import { HasQueryClientViewProps } from "./HasQueryClient.type";
import { QueryClientProvider } from "@tanstack/react-query";

const HasQueryClientView: FC<HasQueryClientViewProps> = ({
  queryClient,
  children,
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default memo(HasQueryClientView);
