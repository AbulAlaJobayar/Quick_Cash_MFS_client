"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <Provider store={store}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </Provider>
  );
}
