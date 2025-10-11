'use client'

import List from "./List";
import { Canvas } from "@/db/schema";

type CanvasGridProps = {
  canvas: Canvas;
}

export default function CanvasGrid({ canvas }: CanvasGridProps) {
  return (
    <>
      <h1 className='text-6xl text-center'>{canvas.name}</h1>
      <div className='flex flex-col gap-2 p-2'>
        <div className='flex flex-row gap-2'>
          <div className='flex flex-col flex-1'>
            <List canvasData={canvas.data} canvasDataKey='keyPartners' />
          </div>
          <div className='flex flex-col flex-1 gap-2'>
            <div className='flex-1'>
              <List canvasData={canvas.data} canvasDataKey='keyActivities' />
            </div>
            <div className='flex-1'>
              <List canvasData={canvas.data} canvasDataKey='keyResources' />
            </div>
          </div>
          <div className='flex flex-col flex-1'>
            <List canvasData={canvas.data} canvasDataKey='valuePropositions' />
          </div>
          <div className='flex flex-col flex-1 gap-2'>
            <div className='flex-1'>
              <List canvasData={canvas.data} canvasDataKey='customerRelationships' />
            </div>
            <div className='flex-1'>
              <List canvasData={canvas.data} canvasDataKey='channels' />
            </div>
          </div>
          <div className='flex flex-col flex-1'>
            <List canvasData={canvas.data} canvasDataKey='customerSegments' />
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='flex-1'>
            <List canvasData={canvas.data} canvasDataKey='costStructure' />
          </div>
          <div className='flex-1'>
            <List canvasData={canvas.data} canvasDataKey='revenueStreams' />
          </div>
        </div>
      </div>
    </>
  )
}
