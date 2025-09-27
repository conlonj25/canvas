import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { listTitles } from './content'
import { Canvas } from './types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction } from 'react'

type ListProps = {
	canvas: Canvas
	setCanvas: Dispatch<SetStateAction<Canvas>>
	canvasKey: keyof Canvas
}

function List({ canvas, setCanvas, canvasKey }: ListProps) {

	const updateListItem = (i: number, newValue: string) => {
		const newList = [...canvas[canvasKey]];
		newList[i] = newValue;

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
						<li key={`${canvasKey}-${i}`}>
							<Input type='text' value={el} onChange={(e) => updateListItem(i, e.target.value)} />
						</li>
					))}
				</ul>
			</DialogContent>
		</Dialog>
	)
}

export default List
