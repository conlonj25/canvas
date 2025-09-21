import { listTitles } from './content'
import { Canvas } from './types'

type ListProps = {
	canvas: Canvas,
	canvasKey: keyof Canvas
}

function List({ canvas, canvasKey }: ListProps) {

	return (
		<div className='p-2 border rounded-lg flex-1'>
			<h1 className='text-center font-semibold'>{listTitles[canvasKey]}</h1>
			<ul className=' list-inside list-disc'>
				{canvas[canvasKey].map((el, i) => <li key={`${canvasKey}-${i}`}>{el}</li>)}
			</ul>
		</div>
	)
}

export default List
