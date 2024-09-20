"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const queryClient = new QueryClient();
  axios.defaults.baseURL="http://localhost:3000/api"

  return (
    <NextUIProvider navigate={router.push}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}