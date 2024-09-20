"use client"

import React from 'react'

import { useParams} from 'next/navigation';
import { CardComponent } from '@/components/card';

const search = () => {
  const {searchQuery} = useParams()
  const TransformedSearchQuery = searchQuery.toString()


  return (
    <div className="relative overflow-x-auto flex flex-nowrap p-4">
      <CardComponent category={TransformedSearchQuery}/>
    </div>
  )
}

export default search
