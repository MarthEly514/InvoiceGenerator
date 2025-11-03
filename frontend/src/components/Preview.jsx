// import React, { useState } from 'react'
// import Classic from '../assets/models/Classic'
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import Minimalist from '../assets/models/Minimalist';
import React, { useState } from 'react'
import { generateInvoicePDF } from '../utils/generatePDF'
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import LivePDFPreview from '../utils/LivePreview';

if (!pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;
}

export default function Preview({ data, getData }) {
    // let models = [
    //     {
    //         id: 0,
    //         name: 'Minimalist',
    //         thumbnail: '/models/model1.jpeg',
    //         component: Minimalist,
    //     },
    //     {
    //         id: 1,
    //         name: 'Classic',
    //         thumbnail: '/models/model2.jpeg',
    //         component: Classic,
    //     },
    //     {
    //         id: 2,
    //         name: 'Creative',
    //         thumbnail: '/models/model3.jpeg',
    //         component: Minimalist,
    //     },
    //     {
    //         id: 3,
    //         name: 'Elegant',
    //         thumbnail: '/models/model4.jpeg',
    //         component: Minimalist,
    //     },
    // ]

    const models = [
        { id: 0, name: 'Minimalist', thumbnail: '/models/model1.jpeg' },
        { id: 1, name: 'Classic', thumbnail: '/models/model2.jpeg' },
        { id: 2, name: 'Creative', thumbnail: '/models/model3.jpeg' },
        { id: 3, name: 'Elegant', thumbnail: '/models/model4.jpeg' },
    ];

    const [chosenModelId, setChosenModelId] = useState(0);
    const chosenModel = models[chosenModelId];

    // Store the ID instead of the component
    // const [chosenModelId, setChosenModelId] = useState(0)

    // Get the component dynamically
    // const ChosenComponent = models[chosenModelId].component

    return (
        <div className='w-full h-full flex flex-row items-center justify-center gap-10'>
            <div className='p-5 h-[60vh] no-scrollBar hidden md:flex flex-col gap-5 items-center overflow-y-scroll '>
                {models.map((model) => {
                    return (
                        <div key={model.id} className='relative w-[200px] aspect-[21/29.7]'
                            // onClick={() => {
                            //     setChosenModelId(model.id);
                            //     setTimeout(() => {
                            //         () => getData(model.id)
                            //     }, 50);
                            //}}
                            onClick={() => {
                                setChosenModelId(model.id);
                                getData(model.id);
                            }}
                        >
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
                    <LivePDFPreview data={data} modelName="Classic" />
                    {/* <PDFViewer showToolbar={false} width="100%" height="100%" key={chosenModelId}>
                        <ChosenComponent data={data} />
                    </PDFViewer> */}
                </div>
            </div>
        </div>
    )
}
// import React, { useState } from 'react'
// import { generateInvoicePDF } from '../utils/generatePDF'
// import pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";

// if (!pdfMake.vfs) {
//     pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;
// }


// export default function Preview({ data, getData }) {
//     const models = [
//         { id: 0, name: 'Minimalist', thumbnail: '/models/model1.jpeg' },
//         { id: 1, name: 'Classic', thumbnail: '/models/model2.jpeg' },
//         { id: 2, name: 'Creative', thumbnail: '/models/model3.jpeg' },
//         { id: 3, name: 'Elegant', thumbnail: '/models/model4.jpeg' },
//     ];

//     const [chosenModelId, setChosenModelId] = useState(0);
//     const chosenModel = models[chosenModelId];

//     const handleDownload = () => {
//         const doc = generateInvoicePDF(data, chosenModel.name);
//         pdfMake.createPdf(doc).download("invoice.pdf");
//     };

//     const handlePreview = () => {
//         const doc = generateInvoicePDF(data, chosenModel.name);
//         pdfMake.createPdf(doc).open(); // or .print()
//     };

//     return (
//         <div className='w-full h-full flex flex-row items-center justify-center gap-10'>
//             <div className='p-5 h-[60vh] no-scrollBar hidden md:flex flex-col gap-5 items-center overflow-y-scroll '>
//                 {models.map((model) => (
//                     <div
//                         key={model.id}
//                         onClick={() => {
//                             setChosenModelId(model.id);
//                             getData(model.id);
//                         }}
//                         className='relative w-[200px] aspect-[21/29.7] cursor-pointer'
//                     >
//                         <img
//                             src={model.thumbnail}
//                             alt={model.name}
//                             className='w-[200px] rounded-xl object-cover'
//                         />
//                         <div className='absolute inset-0 flex items-center justify-center text-white text-xl bg-black/40 opacity-0 hover:opacity-100 rounded-xl transition'>
//                             {model.name}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="flex flex-col items-center justify-center gap-4">
//                 <button
//                     onClick={handlePreview}
//                     className="bg-[#607AFB] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4a64d4] transition"
//                 >
//                     Preview PDF
//                 </button>
//                 <button
//                     onClick={handleDownload}
//                     className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
//                 >
//                     Download PDF
//                 </button>
//             </div>
//         </div>
//     );
// }
