"use client";
import { ClerkProvider as ClerkBaseProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

const clerkAppearance = {
  light: {
    variables: {
      colorPrimary: "#0e78f9",
      colorBackground: "#fff",
      colorText: "#18181b",
    },
    elements: {
      card: "rounded-lg shadow-lg ",
      formButtonPrimary: "bg-primary text-white hover:bg-primary/90",
    },
  },
  dark: {
    variables: {
      colorPrimary: "#0e78f9",
      colorBackground: "#161925",
      colorText: "#fff",


    },
    elements: {
      card: "rounded-lg shadow-lg ",
      formButtonPrimary: "bg-primary text-white hover:bg-primary/80",
      
    },
  },
};

export default function ClerkProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  const appearance =
    theme == "dark" ? clerkAppearance.dark : clerkAppearance.light;

  return (
    <ClerkBaseProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        ...appearance,
      }}
    >
      {children}
    </ClerkBaseProvider>
  );
}
