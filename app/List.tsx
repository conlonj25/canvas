import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { listTitles, newListItemDefaultValue } from './content'
import { Canvas } from './types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon, TrashIcon } from "lucide-react"

type ListProps = {
	canvas: Canvas
	setCanvas: Dispatch<SetStateAction<Canvas>>
	canvasKey: keyof Canvas
}

function List({ canvas, setCanvas, canvasKey }: ListProps) {

	const createListItem = () => {
		const newList = [...canvas[canvasKey]];
		newList.push(newListItemDefaultValue);

		setCanvas({ ...canvas, [canvasKey]: newList });
	};

	const updateListItem = (i: number, newValue: string) => {
		console.log('updateListItem', newValue);
		const newList = [...canvas[canvasKey]];
		newList[i] = newValue;

		setCanvas({ ...canvas, [canvasKey]: newList });
	};

	const deleteListItem = (i: number) => {
		const newList = [
			...canvas[canvasKey].slice(0, i),
			...canvas[canvasKey].slice(i + 1),
		]

		setCanvas({ ...canvas, [canvasKey]: newList });
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className='p-2 flex-1 cursor-pointer hover:bg-accent transition-colors min-h-64'>
					<CardHeader>
						<CardTitle className='text-center'>{listTitles[canvasKey]}</CardTitle>
					</CardHeader>
					<ul className=' list-inside list-disc'>
						{canvas[canvasKey].map((el, i) => <li key={`${canvasKey}-${i}`}>{el}</li>)}
					</ul>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>{listTitles[canvasKey]}</DialogTitle>
				</DialogHeader>
				<ul className='flex flex-col gap-2'>
					{canvas[canvasKey].map((el, i) => (
						<li className='flex gap-2' key={`${canvasKey}-${i}`}>
							<Input type='text' value={el} onChange={(e) => updateListItem(i, e.target.value)} />
							<Button variant="ghost" onClick={() => deleteListItem(i)}>
								<TrashIcon />
							</Button>
						</li>
					))}
					<li className='flex justify-center'>
						<Button variant="ghost" onClick={createListItem}>
							<PlusIcon /> Add Item
						</Button>
					</li>
				</ul>
			</DialogContent>
		</Dialog>
	)
}

export default List
