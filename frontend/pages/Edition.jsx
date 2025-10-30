import { ArrowDownCircle, ArrowDownRight, ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, CloudUpload, Download, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { NavButton } from "../src/components/NavigationButtton";
import UserForm from "../src/components/UserForm";
import ClientForm from "../src/components/ClientForm";
import InvoiceInfos from "../src/components/InvoiceInfos";
import Notes from "../src/components/Notes";
import Preview from "../src/components/Preview";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Classic from "../src/assets/models/Classic";
import Minimalist from "../src/assets/models/Minimalist";

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


    let data = {
        userInfos: userInfos,
        clientInfos: clientInfos,
        invoiceInfos: invoiceInfos,
        options: options,
    }

    {
        /**
         * data ={
         *  userInfos:{
         *      senderName: string,
                senderAdress: string,
                senderPhone: string,
                senderNo: string,
                senderLogo: string,
         *      },
         *  clientInfos:{
         *      clientName: string,
                clientAdress: string,
                clientPhone: stings,
                clientBillingDate: string,
         *      },
         * invoiceInfos:{
         *      details:{
         *          invoiceNo: string,
         *          date: date,
         *          },
         *      items:[],
         *      currency: string,
         *      },
         * options:{
         *      option: string,
                paymentMethod: string,
                paymentInfos: string,
                generalTVA: int
         *      }
         * }
         */
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
        // console.log(activeDot);

    }

    useEffect(() => {
        lastActiveDot != null && dots.current.children[lastActiveDot].classList.remove("scale-150")
        setLastActiveDot(activeDot)
        setEditionState(activeDot)
        activeDot == 0 ? setContent1('Début') : setContent1('Précédent');
        activeDot == 4 ? setContent2('Fin') : setContent2('Suivant');
        localStorage.setItem(stateKey, activeDot.toString())
        dots.current.children[activeDot].classList.add("scale-150")
        // activeDot == 4 ? '' : 'disabled';
        // console.log(dots.current.children[activeDot].classList);
        // console.log(lastActiveDot, activeDot);

    }, [dots, activeDot])



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
                    <PDFDownloadLink
                        ref={downloadButton}
                        document={<Minimalist data={data} />}
                        fileName="invoice.pdf"
                        className={`text-white ${activeDot == 4 ? 'bg-[#607AFB] hover:bg-[#616dc2]' : 'bg-neutral-500'} flex flex-row gap-3 transition-colors duration-300 font-semibold p-3 px-6 rounded-lg cursor-pointer`}>
                        {({ loading }) => (loading && activeDot == 4 ? <> <span className="hidden lg:inline">Génération du PDF</span> <Loader2 className="animate-spin animate-duration-500" /> </> : <> <span className="hidden lg:inline">Télécharger</span> < Download /></>)}
                    </PDFDownloadLink>
                </ul>
            </header>
            {/* form container */}
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
                {/* that actual form container 💀: renders the form based on the current state*/}
                <div className="col-start-1 no-scrollBar overflow-y-scroll lg:overflow-hidden lg:col-start-2 row-start-2 col-end-7 lg:row-end-7 row-end-8 flex flex-col items-center justify-start lg:justify-center">
                    {activeDot == 0 &&
                        <>
                            <UserForm
                                mode={mode}
                                userInfos={data.userInfos}
                                getUserInfos={(data) => {
                                    setUserInfos(data); console.log(data);
                                }}
                            />
                        </>
                    }
                    {activeDot == 1 &&
                        <>
                            <ClientForm mode={mode}
                                clientInfos={data.clientInfos}
                                getClientInfos={(data) => {
                                    setClientInfos(data); console.log(data);
                                }} />
                        </>
                    }
                    {activeDot == 2 &&
                        <>
                            <InvoiceInfos mode={mode}
                                invoiceInfos={data.invoiceInfos}
                                getInvoiceInfos={(data) => {
                                    setInvoiceInfos(data);
                                    console.log(data);

                                }} />
                        </>
                    }
                    {activeDot == 3 &&
                        <>
                            <Notes mode={mode}
                                options={data.options}
                                getOptions={(data) => {
                                    setOptions(data); console.log(data);
                                }} />
                        </>
                    }
                    {activeDot == 4 &&
                        <>
                            <Preview data={data} />
                        </>
                    }
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
                        onclick={() => stateForward(true)} />
                </div>
            </div>
        </div >
    )
}