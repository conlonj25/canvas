import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { listTitles } from './content'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon, TrashIcon } from "lucide-react"
import { CanvasData } from '@/db/schema'

type ListProps = {
	canvasData: CanvasData
	canvasDataKey: keyof CanvasData
}

function List({ canvasData, canvasDataKey }: ListProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className='p-2 flex-1 cursor-pointer hover:bg-accent transition-colors min-h-64'>
					<CardHeader>
						<CardTitle className='text-center'>{listTitles[canvasDataKey]}</CardTitle>
					</CardHeader>
					<ul className=' list-inside list-disc'>
						{canvasData[canvasDataKey].map((el, i) => <li key={`${canvasDataKey}-${i}`}>{el}</li>)}
					</ul>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>{listTitles[canvasDataKey]}</DialogTitle>
				</DialogHeader>
				<ul className='flex flex-col gap-2'>
					{canvasData[canvasDataKey].map((el, i) => (
						<li className='flex gap-2' key={`${canvasDataKey}-${i}`}>
							<Input type='text' value={el} onChange={() => { }} />
							<Button variant="ghost" onClick={() => { }}>
								<TrashIcon />
							</Button>
						</li>
					))}
					<li className='flex justify-center'>
						<Button variant="ghost" onClick={() => { }}>
							<PlusIcon /> Add Item
						</Button>
					</li>
				</ul>
			</DialogContent>
		</Dialog>
	)
}

export default List
