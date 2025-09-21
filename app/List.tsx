import { Card } from '@/components/ui/card'
import { listTitles } from './content'
import { Canvas } from './types'

type ListProps = {
	canvas: Canvas,
	canvasKey: keyof Canvas
}

function List({ canvas, canvasKey }: ListProps) {

	return (
		<Card className='p-2 flex-1'>
			<h1 className='text-center font-semibold'>{listTitles[canvasKey]}</h1>
			<ul className=' list-inside list-disc'>
				{canvas[canvasKey].map((el, i) => <li key={`${canvasKey}-${i}`}>{el}</li>)}
			</ul>
		</Card>
	)
}

export default List
