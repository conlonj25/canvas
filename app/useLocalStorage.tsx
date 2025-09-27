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

	const setCanvasStateAndLocalStorage = (updater: Canvas | ((prev: Canvas) => Canvas)) => {
		setCanvas(prev => {
			const newCanvas = typeof updater === 'function' ? updater(prev) : updater;
			localStorage.setItem(localStorageCanvasKey, JSON.stringify(newCanvas));
			return newCanvas;
		});
		localStorage.setItem(localStorageCanvasKey, JSON.stringify(canvas))
	};

	return [canvas, setCanvasStateAndLocalStorage];
}