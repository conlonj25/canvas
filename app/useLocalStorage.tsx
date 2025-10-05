'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { canvasDataInitialValue, localStorageCanvasKey, defaultInitialCanvas } from "./values";
import { Canvas, CanvasDataSchema } from "@/db/schema";

export type UseLocalStorageReturnType = [canvas: Canvas, setCanvasToLocalStorage: Dispatch<SetStateAction<Canvas['data']>>];

export const useLocalStorage = (): UseLocalStorageReturnType => {
	const [canvas, setCanvas] = useState<Canvas['data']>(canvasDataInitialValue);

	useEffect(() => {
		try {
			const data = localStorage.getItem(localStorageCanvasKey) ?? '{}';
			const obj = JSON.parse(data);
			const result = CanvasDataSchema.parse(obj);
			setCanvas(result);
		} catch {
			setCanvas(defaultInitialCanvas);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(localStorageCanvasKey, JSON.stringify(canvas));
	}, [canvas]);

	return [canvas, setCanvas];
}