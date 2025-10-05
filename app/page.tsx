'use client'

import { useState } from "react";
import List from "./List";
import { defaultInitialCanvas } from "./values";

export default function App() {
  const [canvas, setCanvas] = useState(defaultInitialCanvas);

  return (
    <>
      <div className='flex flex-col gap-2 p-2'>
        <div className='flex flex-row gap-2'>
          <div className='flex flex-col flex-1'>
            <List canvas={canvas} setCanvas={setCanvas} canvasKey='keyPartners' />
          </div>
          <div className='flex flex-col flex-1 gap-2'>
            <div className='flex-1'>
              <List canvas={canvas} setCanvas={setCanvas} canvasKey='keyActivities' />
            </div>
            <div className='flex-1'>
              <List canvas={canvas} setCanvas={setCanvas} canvasKey='keyResources' />
            </div>
          </div>
          <div className='flex flex-col flex-1'>
            <List canvas={canvas} setCanvas={setCanvas} canvasKey='valuePropositions' />
          </div>
          <div className='flex flex-col flex-1 gap-2'>
            <div className='flex-1'>
              <List canvas={canvas} setCanvas={setCanvas} canvasKey='customerRelationships' />
            </div>
            <div className='flex-1'>
              <List canvas={canvas} setCanvas={setCanvas} canvasKey='channels' />
            </div>
          </div>
          <div className='flex flex-col flex-1'>
            <List canvas={canvas} setCanvas={setCanvas} canvasKey='customerSegments' />
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='flex-1'>
            <List canvas={canvas} setCanvas={setCanvas} canvasKey='costStructure' />
          </div>
          <div className='flex-1'>
            <List canvas={canvas} setCanvas={setCanvas} canvasKey='revenueStreams' />
          </div>
        </div>
      </div>
      <h1 className='text-6xl text-center'>ADD A DELETE FUNCTION TO SIDEBAR</h1>
    </>
  )
}
