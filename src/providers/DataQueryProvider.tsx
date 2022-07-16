import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import type { ChildrenProps } from "../types/props";

const queryClient = new QueryClient();

function DataQueryProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}

export default DataQueryProvider;
