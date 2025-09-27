'use client'

import { useState } from "react";
import { Canvas } from "./types";
import List from "./List";

export default function App() {
  const [canvas, setCanvas] = useState<Canvas>({
    keyPartners: ['Apple', 'IBM', 'Siemens', 'Oracle'],
    keyActivities: ['Tesla', 'SpaceX', 'Boeing', 'Lockheed Martin'],
    keyResources: ['Intel', 'Samsung', 'TSMC', 'Micron'],
    valuePropositions: ['Netflix', 'Spotify', 'Disney', 'HBO'],
    customerRelationships: ['Amazon', 'eBay', 'Shopify', 'Walmart'],
    channels: ['FedEx', 'UPS', 'DHL', 'Maersk'],
    customerSegments: ['Google', 'Facebook', 'Twitter', 'Snapchat'],
    costStructure: ['Chevron', 'ExxonMobil', 'BP', 'TotalEnergies'],
    revenueStreams: ['Visa', 'Mastercard', 'PayPal', 'Stripe'],
  })

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
    </>
  )
}
