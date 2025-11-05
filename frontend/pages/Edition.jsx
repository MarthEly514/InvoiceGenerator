import { ArrowDownCircle, ArrowDownRight, ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, Check, CloudUpload, Download, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { NavButton } from "../src/components/NavigationButtton";
import UserForm from "../src/components/UserForm";
import ClientForm from "../src/components/ClientForm";
import InvoiceInfos from "../src/components/InvoiceInfos";
import Notes from "../src/components/Notes";
import Preview from "../src/components/Preview";
import { minimalInvoice } from "../src/utils/models/minimalInvoice";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { classicInvoice } from "../src/utils/models/classicInvoice";
import { creativeInvoice } from "../src/utils/models/creativeInvoice";
import { simpleInvoice } from "../src/utils/models/simpleInvoice";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';



if (!pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake?.vfs || pdfFonts.vfs;
}

export default function Edition({ mode }) {
    const navigate = useNavigate()
    const handleNavigate = (link) => {
        navigate(link)
    }

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
    let sessionData = JSON.parse(localStorage.getItem('sessionData'));
    const [activeDot, setActiveDot] = useState(parseInt(localStorage.getItem(stateKey)) || 0)
    const [lastActiveDot, setLastActiveDot] = useState(null)
    const [editionState, setEditionState] = useState(parseInt(localStorage.getItem(stateKey)) || 0)
    const [content1, setContent1] = useState('Précédent')
    const [content2, setContent2] = useState('Suivant')

    const [userInfos, setUserInfos] = useState(sessionData.userInfos ? sessionData.userInfos : {})
    const [clientInfos, setClientInfos] = useState(sessionData.clientInfos ? sessionData.clientInfos : {})
    const [invoiceInfos, setInvoiceInfos] = useState(sessionData.invoiceInfos ? sessionData.invoiceInfos : {
        details: details,
        items: [],
        currency: ''
    })
    const [options, setOptions] = useState(sessionData.options ? sessionData.options : {})
    const [chosenModelId, setChosenModelId] = useState(localStorage.getItem("chosenModelId") ? parseInt(localStorage.getItem("chosenModelId")) : 0);

    const models = [
        { id: 0, name: "Minimal", element: minimalInvoice, thumbnail: '/models/model1.jpeg' },
        { id: 1, name: "Classic", element: classicInvoice, thumbnail: '/models/model2.jpeg' },
        { id: 2, name: "Creative", element: creativeInvoice, thumbnail: '/models/model3.jpeg' },
        { id: 3, name: "Simple", element: simpleInvoice, thumbnail: '/models/model4.jpeg' },
    ];


    const chosenModel = models[chosenModelId].element // Use chosenModelId from state

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
        //console.log(activeDot);
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

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        const doc = chosenModel(data);
        pdfMake.createPdf(doc).download("invoice.pdf");
    };

    return (
            <div className={`w-full select-none h-screen ${mode ? 'bg-neutral-100 text-neutral-800' : 'bg-neutral-900 text-white'} flex flex-col items-center justify-center transition-colors duration-200`}>
                <header className={`w-full xl:w-[80%] p-4 lg:px-8 flex flex-row items-center justify-between border-b ${mode ? 'border-neutral-600/20' : 'border-white/20'} z-10 fixed top-0`}>
                    <div className="flex flex-row items-center gap-4">
                        <ArrowDownRight className="text-[#607AFB]" />
                        <h1 className="text-xl font-semibold cursor-pointer" onClick={() => handleNavigate('/')}>InvoiceGen</h1>
                    </div>
                    <ul className="flex flex-row items-center gap-4">
                        <button
                            className="text-white flex flex-row gap-3 bg-[#607AFB] hover:bg-[#616dc2] transition-colors duration-300 font-semibold p-3 px-6 rounded-lg cursor-pointer"
                            onClick={() => {
                                localStorage.setItem('sessionData', JSON.stringify(
                                    {
                                        userInfos: userInfos,
                                        clientInfos: clientInfos,
                                        invoiceInfos: invoiceInfos,
                                        options: options,
                                    }));
                                handleClick()
                                console.log("draft saved");

                            }}
                        >
                            <span className="hidden lg:inline">Enregistrer brouillon</span>
                            <CloudUpload className="lg:hidden" />
                        </button >

                        <button
                            onClick={() => {
                                handleDownload();
                                handleNavigate('/thank-you');
                            }}
                            ref={downloadButton}
                            className={`text-white flex bg-[#607AFB] hover:bg-[#616dc2] disabled:bg-neutral-400 flex-row gap-3 transition-colors duration-300 font-semibold p-3 px-6 rounded-lg cursor-pointer`}>
                            <span className="hidden lg:inline">Télécharger</span> < Download />
                        </button>
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
                                getUserInfos={(userData) => {
                                    setUserInfos(userData);
                                    //console.log(data);
                                    localStorage.setItem('sessionData', JSON.stringify(
                                        {
                                            userInfos: userData,
                                            clientInfos: clientInfos,
                                            invoiceInfos: invoiceInfos,
                                            options: options,
                                        }
                                    ));
                                }}
                            />
                        )}
                        {activeDot == 1 && (
                            <ClientForm mode={mode}
                                clientInfos={data.clientInfos}
                                getClientInfos={(clientData) => {
                                    setClientInfos(clientData);
                                    //console.log(data);
                                    localStorage.setItem('sessionData', JSON.stringify(
                                        {
                                            userInfos: userInfos,
                                            clientInfos: clientData,
                                            invoiceInfos: invoiceInfos,
                                            options: options,
                                        }
                                    ));
                                }} />
                        )}
                        {activeDot == 2 && (
                            <InvoiceInfos mode={mode}
                                invoiceInfos={data.invoiceInfos}
                                getInvoiceInfos={(invoiceData) => {
                                    setInvoiceInfos(invoiceData);
                                    //console.log(data);
                                    localStorage.setItem('sessionData', JSON.stringify(
                                        {
                                            userInfos: userInfos,
                                            clientInfos: clientInfos,
                                            invoiceInfos: invoiceData,
                                            options: options,
                                        }
                                    ));
                                }} />
                        )}
                        {activeDot == 3 && (
                            <Notes mode={mode}
                                options={data.options}
                                getOptions={(optionsData) => {
                                    setOptions(optionsData);
                                    localStorage.setItem('sessionData', JSON.stringify(
                                        {
                                            userInfos: userInfos,
                                            clientInfos: clientInfos,
                                            invoiceInfos: invoiceInfos,
                                            options: optionsData,
                                        }
                                    ));
                                }} />
                        )}
                        {activeDot == 4 && (
                            <Preview
                                data={data}
                                models={models}
                                getData={(data) => {
                                    setChosenModelId(data);
                                    //localStorage.setItem('sessionData', JSON.stringify(data));
                                    // //console.log(data);
                                    // //console.log(chosenModelId);
                                }}

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
                            onclick={
                                activeDot == 4 ?
                                    () => {
                                        handleDownload();
                                        handleNavigate('/thank-you');
                                    } :
                                    () => {
                                        stateForward(true);
                                        localStorage.setItem('sessionData', JSON.stringify(data));
                                    }} />
                    </div>

                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        open={open}
                        onClose={handleClose}
                        message={<div className="flex flex-row items-center gap-4 justify-center">Brouillon sauvegardé <Check /> </div>}
                        key={"bottom" + "center"}
                    />
                </div>
            </div >
    )
}