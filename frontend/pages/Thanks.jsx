import { useNavigate } from "react-router-dom";
import Card from "../src/components/Card";
import Button from "../src/components/Buttton";
import { ArrowDownRight, Banknote, Check, ChevronLeft, Facebook, Linkedin, Palette, Twitter, Zap } from "lucide-react";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export default function Thanks({ mode }) {
    const stateKey = 'STA2hx4578'
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "Facture téléchargée - InvoiceGen";
    }, []);
    const handleNavigate = (link) => {
        navigate(link)
    }

    const [open, setOpen] = useState(true);



    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={`relative w-full min-h-screen flex flex-col items-center ${mode ? 'bg-neutral-100 text-neutral-800' : 'bg-neutral-900 text-white'} transition-colors duration-200`}>
            <div className="overflow-hidden w-full h-screen lg:h-[90vh] opacity-45 absolute top-0 left-0 bg-top-left flex flex-col items-center justify-center">
                <div className="w-full absolute -top-25 left-0 h-50 rounded-full blur-2xl bg-neutral-900"></div>
                {/* <div className="w-[60%] absolute aspect-5/2 rounded-full blur-2xl bg-neutral-900"></div> */}
                <div className="w-full absolute -bottom-15 left-0 h-50 rounded-full blur-2xl bg-neutral-900"></div>
            </div>
            <header className={`w-full xl:w-[80%] p-4 px-8 flex flex-row items-center justify-between border-b ${mode ? 'border-neutral-600/20' : 'border-white/20'} z-10 fixed top-0 backdrop-blur-xl`}>
                <div className="flex flex-row items-center gap-4">
                    <ArrowDownRight className="text-[#607AFB]" />
                    <h1 className="text-xl font-semibold cursor-pointer" onClick={() => handleNavigate('/')}>InvoiceGen</h1>
                </div>
                <ul className="flex flex-row items-center gap-4">
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="#/">Home</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="#/about">A propos</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250" href="#/help">Aide</a></li>
                </ul>
            </header>

            {/* <!-- hero section --> */}
            <section className="mt-10 w-full xl:w-[80%] h-screen lg:h-[80vh] flex flex-col items-center justify-center gap-y-8 animate-fade-up duration-600">

                <div style={{ backgroundImage: "url('thanks.svg')" }} className="w-60 h-60 bg-no-repeat bg-center bg-contain"></div>
                <h1 className="z-20 w-full md:w-[80%] xl:w-[70%] text-4xl xl:text-6xl font-semibold text-center px-3">
                    Merci d'avoir utilisé InvoiceGen !
                </h1>
                <p className="text-lg opacity-40 w-full text-center font-light px-4 xl:text-xl">
                    Créez et envoyez et vos factures sans effort.
                </p>
                <div className="flex flex-row gap-3 items-center justify-center">

                    <button
                        className="text-[#697AFB] hover:text-white xl:text-xl flex flex-row items-center justify-center gap-3 border-2 border-[#697AFB] hover:bg-[#616dc2] transition-colors duration-300 font-semibold p-2.5 px-6 rounded-lg cursor-pointer"
                        onClick={() => handleNavigate(-1)}
                    >
                        <ChevronLeft />
                        Retour
                    </button>

                    <Button
                        content={'Générer une nouvelle facture'}
                        onClick={
                            () => {
                                handleNavigate('/edition')
                                localStorage.setItem("sessionData", JSON.stringify({}));
                                localStorage.setItem("chosenModelId", '0');
                                localStorage.setItem(stateKey, '0');
                            }
                        }

                    />
                </div>

            </section>
            <footer className={`absolute bottom-0 w-full xl:w-[80%] h-max flex flex-col items-center gap-8 py-8 pt-25 mt-20 `}>
                <ul className="flex flex-col md:flex-row gap-4">
                    <li className="opacity-40"><a href="/contact" className="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">Contact </a></li>
                    <li className="opacity-40"><a href="/privacy" className="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">Politique de confidentialité </a></li>
                    <li className="opacity-40"><a href="/terms" className="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">Conditions d'utilisation </a></li>
                </ul>
                <ul className="flex flex-row gap-4">
                    <li><Twitter className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" /></li>
                    <li><Linkedin className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" /></li>
                    <li><Facebook className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" /></li>
                </ul>
                <small className="opacity-30">&copy;InvoiceGen 2025. Tout droits réservés</small>
            </footer>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={open}
                onClose={handleClose}
                message={<div className="flex flex-row items-center gap-4 justify-center">Facture téléchargée <Check /> </div>}
                key={"bottom" + "right"}
            />
        </div>
    )
}
