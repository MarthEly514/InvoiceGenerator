import { ArrowDownCircle, ArrowDownRight, ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, CloudUpload, Download, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { NavButton } from "../src/components/NavigationButtton";
import UserForm from "../src/components/UserForm";
import ClientForm from "../src/components/ClientForm";
import InvoiceInfos from "../src/components/InvoiceInfos";
import Notes from "../src/components/Notes";
import Preview from "../src/components/Preview";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Classic from "../src/assets/models/Classic";
import Minimalist from "../src/assets/models/Minimalist";
import { generateInvoicePDF } from "../src/utils/generatePDF";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

if (!pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;
}

export default function Edition({ mode }) {
    const dots = useRef(null)
    const stateKey = 'STA2hx4578'
    let date = new Date;
    let number = 0;
    let details = {
        invoiceNo: `FAC-${date.getFullYear()}${date.getMonth()}${date.getDate()}${number}`,
        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    }
    const downloadButton = useRef(null)
    localStorage.setItem('currentState', '0')
    const [activeDot, setActiveDot] = useState(parseInt(localStorage.getItem(stateKey)) || 0)
    const [lastActiveDot, setLastActiveDot] = useState(null)
    const [editionState, setEditionState] = useState(parseInt(localStorage.getItem(stateKey)) || 0)
    const [content1, setContent1] = useState('Précédent')
    const [content2, setContent2] = useState('Suivant')

    const [userInfos, setUserInfos] = useState({})
    const [clientInfos, setClientInfos] = useState({})
    const [invoiceInfos, setInvoiceInfos] = useState({
        details: details,
        items: [],
        currency: ''
    })
    const [options, setOptions] = useState({})
    const [chosenModelId, setChosenModelId] = useState(0) // Add this state

    let models = [
        {
            id: 0,
            name: 'Minimalist',
            thumbnail: '/models/model1.jpeg',
            component: Minimalist,
        },
        {
            id: 1,
            name: 'Classic',
            thumbnail: '/models/model2.jpeg',
            component: Classic,
        },
        {
            id: 2,
            name: 'Creative',
            thumbnail: '/models/model3.jpeg',
            component: Minimalist,
        },
        {
            id: 3,
            name: 'Elegant',
            thumbnail: '/models/model4.jpeg',
            component: Minimalist,
        },
    ]

    const ChosenComponent = models[chosenModelId].component // Use chosenModelId from state

    let data = {
        userInfos: userInfos,
        clientInfos: clientInfos,
        invoiceInfos: invoiceInfos,
        options: options,
    }

    const editionStates = [
        'Vos informations',
        'Informations du client',
        'Informations facture',
        'Méthode de paiement',
        'Prévisualisation',
    ]

    const mod = (a, b) => {
        let result = ((a / b) - Math.floor(a / b)) * b
        return result
    }

    const stateBackward = (limited) => {
        if (limited == false) {
            setActiveDot(activeDot => mod((activeDot - 1), 5))
        } else {
            if (activeDot > 0) {
                setActiveDot(activeDot => (activeDot - 1))
            }
        }
        console.log(activeDot);
    }

    const stateForward = (limited) => {
        if (limited == false) {
            setActiveDot(activeDot => mod((activeDot + 1), 5))
        }
        else {
            if (activeDot < 4) {
                setActiveDot(activeDot => (activeDot + 1))
            }
        }
    }
    // const finalData = useRef(data)

    useEffect(() => {
        lastActiveDot != null && dots.current.children[lastActiveDot].classList.remove("scale-150")
        setLastActiveDot(activeDot)
        setEditionState(activeDot)
        activeDot == 0 ? setContent1('Début') : setContent1('Précédent');
        activeDot == 4 ? setContent2(<><span className="hidden lg:inline">Télécharger</span> < Download /></>) : setContent2('Suivant');
        activeDot == 4 ? downloadButton.current.removeAttribute("disabled") : downloadButton.current.setAttribute("disabled", "true");
        // activeDot == 4 ? finalData.current = data : undefined;
        localStorage.setItem(stateKey, activeDot.toString())
        dots.current.children[activeDot].classList.add("scale-150")
    }, [dots, activeDot])

    const handleDownload = () => {
        const doc = generateInvoicePDF(data, ChosenComponent.name);
        pdfMake.createPdf(doc).download("invoice.pdf");
    };

    return (
        <div className={`w-full select-none h-screen ${mode ? 'bg-neutral-100 text-neutral-800' : 'bg-neutral-900 text-white'} flex flex-col items-center justify-center transition-colors duration-200`}>
            <header className={`w-full xl:w-[80%] p-4 lg:px-8 flex flex-row items-center justify-between border-b ${mode ? 'border-neutral-600/20' : 'border-white/20'} z-10 fixed top-0`}>
                <div className="flex flex-row items-center gap-4">
                    <ArrowDownRight className="text-[#607AFB]" />
                    <h1 className="text-xl font-semibold">InvoiceGen</h1>
                </div>
                <ul className="flex flex-row items-center gap-4">
                    <button
                        className="text-white flex flex-row gap-3 bg-[#607AFB] hover:bg-[#616dc2] transition-colors duration-300 font-semibold p-3 px-6 rounded-lg cursor-pointer"
                    >
                        <span className="hidden lg:inline">Enregistrer brouillon</span>
                        <CloudUpload className="lg:hidden" />
                    </button >

                    <button
                        onClick={() => handleDownload()}
                        ref={downloadButton}
                        className={`text-white flex bg-[#607AFB] hover:bg-[#616dc2] disabled:bg-neutral-400 flex-row gap-3 transition-colors duration-300 font-semibold p-3 px-6 rounded-lg cursor-pointer`}>
                        <span className="hidden lg:inline">Télécharger</span> < Download />
                    </button>
                    {/* <PDFViewer>
                        <ChosenComponent data={data} />
                    </PDFViewer> */}

                </ul>
            </header>

            <div className={`overflow-hidden w-full lg:w-[80%] max-w-[1300px] h-screen lg:h-[80vh] lg:rounded-xl shadow-2xl grid grid-cols-6 grid-rows-8 lg:grid-rows-7 ${mode ? 'shadow-neutral-200 shadow-2xl bg-white' : 'shadow-xl bg-neutral-800'}`}>
                <div className={`col-start-1 col-end-7 lg:col-end-2 row-start-8 row-span-1 lg:row-start-1 lg:row-end-8 h-full flex flex-row lg:flex-col items-center justify-between px-10 lg:p-10 text-white ${mode ? 'bg-[#607AFB]' : 'bg-neutral-700'}`}>
                    <div onClick={() => stateBackward(false)}>
                        <ArrowUpCircle className="w-10 h-10 hidden lg:flex opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer" />
                        <ArrowLeftCircle className="w-10 h-10 lg:hidden opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer" />
                    </div>
                    <div className="w-max h-full flex flex-col items-center justify-evenly">
                        <h1 className="text-center lg:hidden text-xl font-semibold">{editionStates[editionState]}</h1>
                        <ul className="w-max flex flex-row lg:flex-col items-center gap-3" ref={dots}>
                            <li className="w-2 h-2 rounded-full transition-transform duration-200 bg-white/40"></li>
                            <li className="w-2 h-2 rounded-full transition-transform duration-200 bg-white/40"></li>
                            <li className="w-2 h-2 rounded-full transition-transform duration-200 bg-white/40"></li>
                            <li className="w-2 h-2 rounded-full transition-transform duration-200 bg-white/40"></li>
                            <li className="w-2 h-2 rounded-full transition-transform duration-200 bg-white/40"></li>
                        </ul>
                    </div>
                    <div onClick={() => stateForward(false)}>
                        <ArrowDownCircle className="w-10 h-10 hidden lg:flex opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer" />
                        <ArrowRightCircle className="w-10 h-10 lg:hidden opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer" />
                    </div>
                </div>
                <div className={`col-start-1 lg:col-start-2 col-end-5 row-start-1 row-end-2 hidden lg:flex flex-row items-center justify-start p-6 ${mode ? 'text-[#607AFB]' : 'text-neutral-300'}`}>
                    <h1 className="text-center lg:text-left text-xl lg:text-3xl font-semibold">{editionStates[editionState]}</h1>
                </div>

                <div className="col-start-1 no-scrollBar overflow-y-scroll lg:overflow-hidden lg:col-start-2 row-start-2 col-end-7 lg:row-end-7 row-end-8 flex flex-col items-center justify-start lg:justify-center">
                    {activeDot == 0 && (
                        <UserForm
                            mode={mode}
                            userInfos={data.userInfos}
                            getUserInfos={(data) => {
                                setUserInfos(data); console.log(data);
                            }}
                        />
                    )}
                    {activeDot == 1 && (
                        <ClientForm mode={mode}
                            clientInfos={data.clientInfos}
                            getClientInfos={(data) => {
                                setClientInfos(data); console.log(data);
                            }} />
                    )}
                    {activeDot == 2 && (
                        <InvoiceInfos mode={mode}
                            invoiceInfos={data.invoiceInfos}
                            getInvoiceInfos={(data) => {
                                setInvoiceInfos(data);
                                console.log(data);
                            }} />
                    )}
                    {activeDot == 3 && (
                        <Notes mode={mode}
                            options={data.options}
                            getOptions={(data) => {
                                setOptions(data); console.log(data);
                            }} />
                    )}
                    {activeDot == 4 && (
                        <Preview
                            data={data}
                            models={models}
                            getData={(data) => {
                                setTimeout(() => {
                                    () => setChosenModelId(data)
                                }, 50);
                                console.log(data);
                                console.log(chosenModelId);
                            }}
                        // chosenModelId={chosenModelId}
                        // setChosenModelId={setChosenModelId}
                        />
                    )}
                </div>
                <div className="z-10 col-start-2 col-end-7 row-start-7 row-end-8 hidden lg:flex flex-row items-center justify-between px-6">
                    <NavButton
                        mode={mode}
                        content={content1}
                        onclick={() => stateBackward(true)} />

                    <NavButton
                        mode={mode}
                        type="primary"
                        content={content2}
                        onclick={activeDot == 4 ? () => handleDownload() : () => stateForward(true)} />
                </div>
            </div>
        </div >
    )
}