import React from 'react'
import Classic from '../assets/models/Classic'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

export default function Preview({ data }) {
    let models = [
        {
            id: 0,
            name: 'Classic',
            thumbnail: '/models/model1.jpeg'
        },
        {
            id: 1,
            name: 'Modern',
            thumbnail: '/models/model2.jpeg'
        },
        {
            id: 2,
            name: 'Creative',
            thumbnail: '/models/model3.jpeg'
        },
        {
            id: 3,
            name: 'Elegant',
            thumbnail: '/models/model4.jpeg'
        },

    ]

    return (
        <div className='w-full h-full flex flex-row items-center justify-center gap-10'>
            <div className='p-5 h-[60vh] no-scrollBar hidden md:flex flex-col gap-5 items-center overflow-y-scroll '>
                {models.map((model) => {
                    return (
                        <div key={model.id} className='relative w-[200px] aspect-[21/29.7]'>
                            <div className='w-[200px] bg-white aspect-[21/29.7] absolute top-0 left-0 rounded-xl overflow-hidden'>
                                <img src={model.thumbnail} alt={model.name} />

                            </div>
                            <div className='absolute rounded-xl top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 text-white font-semibold text-xl bg-neutral-400/50'>
                                {model.name}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="aspect-[21/29.7] h-[60vh] lg:h-[50vh] rounded-lg overflow-hidden bg-white">
                    <style>{`
                /* Hide PDF toolbar */
                iframe {
                    border: none !important;
                }
                
                /* Hide toolbar via shadow DOM targeting */
                .react-pdf__Document {
                    background: white !important;
                }
                
                /* Remove gray background from PDF viewer */
                canvas {
                    background: white !important;
                }
            `}</style>
                    <PDFViewer showToolbar={false} width="100%" height="100%">
                        <Classic data={data} />
                    </PDFViewer>
                </div>
            </div>
        </div>
    )
}
