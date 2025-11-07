import { useNavigate } from "react-router-dom";
import Card from "../src/components/Card";
import Button from "../src/components/Buttton";
import { ArrowDownRight, Banknote, Facebook, Linkedin, Palette, Twitter, Zap } from "lucide-react";

export default function Landing({ mode }) {
    const navigate = useNavigate()
    const handleNavigate = (link) => {
        navigate(link)
    }
    return (
        <div id="about" className={`relative w-full min-h-screen flex flex-col items-center ${mode ? 'bg-neutral-100 text-neutral-800' : 'bg-neutral-900 text-white'} transition-colors duration-200`}>
            <div style={{ backgroundImage: 'url(/linesPattern.svg)', backgroundSize: '5%' }} className="overflow-hidden w-full h-screen lg:h-[90vh] opacity-45 absolute top-0 left-0 bg-top-left flex flex-col items-center justify-center">
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
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="/">Home</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="/about">A propos</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250" href="/contact">Contact</a></li>
                </ul>
            </header>

            {/* <!-- hero section --> */}
            <section className="mt-10 w-full xl:w-[80%] h-screen lg:h-[90vh] flex flex-col items-center justify-center gap-y-8 animate-fade-up duration-600">

                <h1 className="z-20 w-full md:w-[80%] xl:w-[70%] text-4xl xl:text-6xl font-semibold text-center px-3">
                    Générez des factures professionnelles en quelques secondes
                </h1>
                <p className="text-lg opacity-40 w-full text-center font-light px-4 xl:text-xl">
                    Notre outil intuitif vous aide à créer et envoyer vos factures sans effort.
                </p>
                <Button
                    content={'Générer une facture maintenant'}
                    onClick={() => {
                        handleNavigate('/edition');
                        localStorage.setItem("STA2hx4578", "0");
                        localStorage.setItem("chosenModelId", "0");
                        localStorage.setItem("currentState","0");
                        localStorage.setItem("sessionData", "{}");
                    }}
                />

            </section>

            {/* <!-- functionnalities section --> */}
            <section className="w-full xl:w-[80%] h-max flex flex-col items-center gap-8 animate-fade-up duration-500">
                <h1 className="w-full text-3xl md:text-4xl font-semibold text-center px-3">
                    Fonctionnalités clés
                </h1>
                <p className="opacity-40 w-full text-center text-lg font-light px-4">
                    Découvrez les avantages d'utiliser notre générateur de factures.
                </p>
                <div className="w-full 2xl:w-[90%] grid grid-cols-1 lg:grid-cols-3 gap-4 place-items-center p-4">
                    <Card
                        mode={mode}
                        icon={<Zap className="text-[#607AFB] w-13 h-13" />}
                        title="Simplicité"
                        content={"Créez des factures avec une facilité déconcertante."}
                    />
                    <Card
                        mode={mode}
                        icon={<Palette className="text-[#607AFB] w-13 h-13" />}
                        title="Personnalisation"
                        content={"Adaptez vos factures à l'image de votre marque."}
                    />
                    <Card
                        mode={mode}
                        icon={<Banknote className="text-[#607AFB] w-13 h-13" />}
                        title="Suivi des paiements"
                        content={"Gardez un oeil sur vos paiements en temps réel."}
                    />
                </div>
            </section>
            <footer className={`w-full xl:w-[80%] h-max flex flex-col items-center gap-8 py-25 mt-40 border-t ${mode ? 'border-neutral-600/20' : 'border-white/20'}`}>
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
        </div>
    )
}
