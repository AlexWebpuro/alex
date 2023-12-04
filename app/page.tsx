'use client'
import type { MouseEventHandler } from 'react';
import { LazyImage } from '@/components/LazyImage';
import { useState } from 'react';
import { random } from 'lodash'; // Definitely Typed

// const random = (): Number => Math.floor( Math.random() * 123 ) + 1;
const myRandom = () => random(1, 123);
const generateId = () => Math.random().toString(36).substring(2,9);

// { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg`},
// { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg`},
// { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg`},
// { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg`}

export default function Home() {
  const [ images, setImages ] = useState <Array<IFoxImageItem>>([]);

  // 
  const addNewFox: MouseEventHandler<HTMLButtonElement> = ( event ) => {
    const newImageItem: IFoxImageItem = { 
      id: generateId(), url: `https://randomfox.ca/images/${myRandom()}.jpg`
    }

    setImages( [
      ...images,
      newImageItem
    ] );
    window.plausible('add_fox');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Alex fetching fox!</h1>
      <button
        onClick={ addNewFox }
        type="button"
        className='g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
        >Get another foxes!</button>
      {
        images.map( ({ id, url }, index ) => (
          <div className='p-4' key={ id }>
            <LazyImage
              src={ url }
              width={320} 
              height='auto' 
              className="rounded bg-slate-600" 
              title='Random Fox'
              onLazyLoad={ (img) => console.log(`Image loaded ${index + 1}, Node:`, img)}
            />
          </div>
        ) )
      }
    </main>
  )
}
