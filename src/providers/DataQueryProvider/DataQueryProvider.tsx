import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import toast from "react-hot-toast";
import type { ChildrenProps } from "../../types/props";

const queryClient = new QueryClient();

function DataQueryProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}

function handleNoInternet() {
  queryClient.cancelQueries();
  toast.error("No internet connection", {
    id: "no-internet",
  });
}

export default DataQueryProvider;
export { queryClient, handleNoInternet };
