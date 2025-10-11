'use client'

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import CanvasGrid from "./CanvasGrid";
import {
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { Canvas } from "@/db/schema";
import { useState } from "react";

export default function App() {
	const queryClient = useQueryClient();
	const [currentlySlectedCanvasIndex, setCurrentlySelectedCanvasIndex] = useState(0);

	const { data, isLoading } = useQuery<Canvas[]>({
		queryKey: ['canvases'],
		queryFn: async () => (await fetch("/api/canvases", { method: "GET" })).json(),
	});

	const postMutation = useMutation({
		mutationFn: async () => (await fetch("/api/canvases", { method: "POST" })).json(),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['canvases'] }),
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: number) => (await fetch(`/api/canvases/${id}`, { method: "DELETE" })).json(),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['canvases'] }),
	});

	const currentlySlectedCanvas = data && data[currentlySlectedCanvasIndex] ? data[currentlySlectedCanvasIndex] : null;

	if (!currentlySlectedCanvas) {
		return (
			<>
				<AppSidebar data={data} isLoading={isLoading} postMutation={postMutation} deleteMutation={deleteMutation} setCurrentlySelectedCanvasIndex={setCurrentlySelectedCanvasIndex} />
				<main className="flex-1">
					<SidebarTrigger />
					return <div className="text-center text-2xl mt-10">No canvases found. Create one!</div>
				</main>
			</>
		);
	}

	return (
		<>
			<AppSidebar data={data} isLoading={isLoading} postMutation={postMutation} deleteMutation={deleteMutation} setCurrentlySelectedCanvasIndex={setCurrentlySelectedCanvasIndex} />
			<main className="flex-1">
				<SidebarTrigger />
				<CanvasGrid canvas={currentlySlectedCanvas} />
				<h1 className='text-6xl text-center'>MOVE STATE UP TO APP</h1>
			</main>
		</>
	)
}
