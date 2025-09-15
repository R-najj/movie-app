"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { Container } from "../di/Container";
import { AppConfig } from "../config/AppConfig";

interface DependencyContextValue {
  container: Container;
}

const DependencyContext = createContext<DependencyContextValue | null>(null);

interface DependencyProviderProps {
  children: ReactNode;
}

/**
 * dependency provider
 * provides DI container to React components
 * initializes container on client side only (for localStorage access)
 */
export function DependencyProvider({ children }: DependencyProviderProps) {
  const container = Container.getInstance();

  useEffect(() => {
    // initialize container on client side
    if (typeof window !== "undefined" && !container.isInitialized) {
      try {
        // Use the safe version that doesn't require environment variables
        const config = AppConfig.getAppConfigSafe();
        container.initialize(config);
      } catch (error) {
        console.error("Failed to initialize dependency container:", error);
      }
    }
  }, [container]);

  return (
    <DependencyContext.Provider value={{ container }}>
      {children}
    </DependencyContext.Provider>
  );
}

/**
 * hook to access dependency container
 */
export function useDependencies(): Container | null {
  const context = useContext(DependencyContext);

  if (!context) {
    throw new Error("useDependencies must be used within a DependencyProvider");
  }

  if (!context.container.isInitialized) {
    return null;
  }

  return context.container;
}
