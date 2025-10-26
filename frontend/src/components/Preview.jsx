import React from 'react'
import Classic from '../assets/models/Classic'

export default function Preview({ data }) {
    let models = [
        {
            id: 0,
            name: 'Classic',
            thumbnail: 'filePath'
        },
        {
            id: 1,
            name: 'Modern',
            thumbnail: 'filePath'
        },
        {
            id: 2,
            name: 'Creative',
            thumbnail: 'filePath'
        },
        {
            id: 3,
            name: 'Elegant',
            thumbnail: 'filePath'
        },

    ]
    return (
        <div className='flex flex-row items-center justify-center gap-10'>
            <div className='p-5 h-[60vh] no-scrollBar flex flex-col gap-5 items-center overflow-y-scroll '>
                {models.map((model) => {
                    return (
                        <div key={model.id} className='relative w-[200px] aspect-[21/29.7]'>
                            <div className='w-[200px] bg-white aspect-[21/29.7] absolute top-0 left-0 rounded-xl'>
                                {model.thumbnail}
                            </div>
                            <div className='absolute rounded-xl top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 text-white font-semibold text-xl bg-neutral-400/50'>
                                {model.name}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Classic data={data} />
            <div className='h-[60vh] w-[200px] rounded-xl bg-neutral-600'>

            </div>
        </div>
    )
}
