'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { emptyInitialCanvas, localStorageCanvasKey, defaultInitialCanvas } from "./values";
import { Canvas, CanvasSchema } from "./types";

export type UseLocalStorageReturnType = [canvas: Canvas, setCanvasToLocalStorage: Dispatch<SetStateAction<Canvas>>];

export const useLocalStorage = (): UseLocalStorageReturnType => {
	const [canvas, setCanvas] = useState<Canvas>(emptyInitialCanvas);

	useEffect(() => {
		try {
			const data = localStorage.getItem(localStorageCanvasKey) ?? '{}';
			const obj = JSON.parse(data);
			const result = CanvasSchema.parse(obj);
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