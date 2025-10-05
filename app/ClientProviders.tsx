"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<QueryClientProvider client={queryClient} >
				<SidebarProvider>
					{children}
				</SidebarProvider>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
