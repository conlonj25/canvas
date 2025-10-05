'use client'

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { InferSelectModel } from "drizzle-orm";
import { Canvas, canvasesTable } from "@/db/schema";

import {
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { PlusIcon } from "lucide-react";

export function AppSidebar() {
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<Canvas[]>({
		queryKey: ['canvases'],
		queryFn: async () => (await fetch("/api/canvases", { method: "GET" })).json(),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async () => (await fetch("/api/canvases", { method: "POST" })).json(),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['canvases'] }),
	});

	return (

		<Sidebar>
			<SidebarHeader className="flex justify-end items-center p-4 gap-4">
				<SignedOut>
					<SignInButton />
					<SignUpButton>
						<button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
							Sign Up
						</button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</SidebarHeader>

			<SidebarContent>
				{data?.map((canvas, i) => (
					<Button key={canvas.id} variant="ghost" className="w-full justify-start">
						{canvas.name}
					</Button>
				))}
				<div className="flex justify-center mt-4">
					<Button className="w-50%" disabled={isLoading || isPending} onClick={() => mutate()}>
						{isLoading || isPending && <Spinner />}
						<PlusIcon />
						New Canvas
					</Button>
				</div>
			</SidebarContent>

		</Sidebar>
	)
}