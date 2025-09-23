import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { listTitles } from './content'
import { Canvas } from './types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

type ListProps = {
	canvas: Canvas,
	canvasKey: keyof Canvas
}

function List({ canvas, canvasKey }: ListProps) {

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
				<ul className='list-inside list-disc'>
					{canvas[canvasKey].map((el, i) => <li key={`${canvasKey}-${i}`}>{el}</li>)}
				</ul>
			</DialogContent>
		</Dialog>
	)
}

export default List
