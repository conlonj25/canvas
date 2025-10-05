'use client'

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { InferSelectModel } from "drizzle-orm";
import { canvasesTable } from "@/db/schema";

export function AppSidebar() {
	const [canvases, setCanvases] = useState<InferSelectModel<typeof canvasesTable>[]>([]);
	const [creatingNewCanvas, setCreatingNewCanvas] = useState(false);

	useEffect(() => {
		if (!creatingNewCanvas) {
			fetch("/api/canvases")
				.then(res => res.json())
				.then(setCanvases);
		}
	}, [creatingNewCanvas]);

	const createNewCanvas = async () => {
		setCreatingNewCanvas(true);
		await fetch("/api/canvases", { method: "POST" });
		setCreatingNewCanvas(false);
	}

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
				{canvases.map((canvas, i) => (
					<Button key={canvas.id} variant="ghost" className="w-full justify-start">
						{canvas.name}
					</Button>
				))}
				<Button variant="outline" className="w-full justify-start" disabled={creatingNewCanvas} onClick={createNewCanvas}>
					{creatingNewCanvas && <Spinner />}
					New Canvas
				</Button>
			</SidebarContent>

		</Sidebar>
	)
}