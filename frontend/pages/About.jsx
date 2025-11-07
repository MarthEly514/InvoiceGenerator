import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ChevronLeft, Mail, Linkedin, Twitter, Facebook, Code2, Check } from "lucide-react";
import { useEffect } from "react";

export default function About({ mode }) {
    const navigate = useNavigate();
    const handleNavigate = (link) => {
        navigate(link);
    };

    useEffect(() => {
        document.title = "À propos - InvoiceGen";
    }, []);

    return (
        <div className={`relative w-full min-h-screen flex flex-col items-center ${mode ? 'bg-neutral-100 text-neutral-800' : 'bg-neutral-900 text-white'} transition-colors duration-200`}>
            {/* Background */}
            <div className="overflow-hidden w-full h-screen lg:h-[90vh] opacity-45 absolute top-0 left-0 bg-top-left flex flex-col items-center justify-center">
                <div className="w-full absolute -top-25 left-0 h-50 rounded-full blur-2xl bg-neutral-900"></div>
                <div className="w-full absolute -bottom-15 left-0 h-50 rounded-full blur-2xl bg-neutral-900"></div>
            </div>

            {/* Header */}
            <header className={`w-full xl:w-[80%] p-4 px-8 flex flex-row items-center justify-between border-b ${mode ? 'border-neutral-600/20' : 'border-white/20'} z-10 fixed top-0 backdrop-blur-xl`}>
                <div className="flex flex-row items-center gap-4">
                    <ArrowDownRight className="text-[#607AFB]" />
                    <h1 className="text-xl font-semibold cursor-pointer">InvoiceGen</h1>
                </div>
                <ul className="flex flex-row items-center gap-4">
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="/">Home</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-100 transition-colors duration-250 hidden md:flex" href="/about">A propos</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250" href="/contact">Contact</a></li>
                </ul>
            </header>

            {/* Main Section */}
            <section className="mt-24 w-full xl:w-[80%] min-h-screen flex flex-col items-center justify-center gap-y-8 animate-fade-up duration-600 px-4 py-12">
                <div className="w-full max-w-3xl z-10 text-left space-y-8">
                    <h1 className="text-4xl xl:text-5xl font-semibold mb-4">À propos d’InvoiceGen</h1>
                    <p className="text-lg xl:text-xl opacity-70 leading-relaxed">
                        <strong>InvoiceGen</strong> est un générateur de factures moderne conçu pour simplifier la création, la personnalisation et la gestion de factures professionnelles.
                        Intuitif et rapide, il aide les indépendants, créateurs et petites entreprises à gagner du temps tout en garantissant une présentation soignée et conforme aux standards.
                    </p>

                    <p className="text-lg xl:text-xl opacity-70 leading-relaxed">
                        Développé avec une stack technologique moderne, <strong>InvoiceGen</strong> repose sur :
                    </p>

                    <ul className="text-left ml-20 max-w-md text-base xl:text-lg opacity-80 space-y-2">
                        <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-[#607AFB] hover:underline">React</a> — pour une interface réactive et fluide.</li>
                        <li><a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-[#607AFB] hover:underline">TailwindCSS</a> — pour un design moderne et cohérent.</li>
                        <li><a href="https://pdfmake.github.io/docs/" target="_blank" rel="noopener noreferrer" className="text-[#607AFB] hover:underline">PdfMake</a> — pour la génération dynamique et exportable des factures.</li>
                        <li><a href="https://www.tailwindcss-animated.com/" target="_blank" rel="noopener noreferrer" className="text-[#607AFB] hover:underline">TailwindCSS Animated</a> — pour des animations douces et subtiles.</li>
                    </ul>

                    <p className="text-lg xl:text-xl opacity-70 leading-relaxed">
                        Ce projet est entièrement <strong>personnel</strong> et a été conçu dans le but de proposer un outil simple et efficace pour tous ceux qui souhaitent générer des factures professionnelles sans complexité.
                    </p>

                    <div className="mt-10 flex flex-col items-start gap-3">
                        <p className="opacity-60 text-sm">Développé par <strong>Marthely Adjovi</strong></p>
                        <a href="mailto:martharun514@gmail.com" className="text-[#607AFB] hover:text-[#5169E0] transition-colors duration-300 font-medium flex items-center gap-2">
                            <Mail className="w-5 h-5" /> martharun514@gmail.com
                        </a>
                    </div>
                </div>

                <button
                    className="text-[#697AFB] hover:text-white xl:text-xl flex flex-row items-center justify-center gap-3 border-2 border-[#697AFB] hover:bg-[#616dc2] transition-colors duration-300 font-semibold p-2.5 px-6 rounded-lg cursor-pointer"
                    onClick={() => handleNavigate(-1)}
                >
                    <ChevronLeft />
                    Retour
                </button>
            </section>

            {/* Footer */}
            <footer className="w-full xl:w-[80%] flex flex-col items-center gap-8 py-8 border-t border-white/10">
                <ul className="flex flex-col md:flex-row gap-4">
                    <li className="opacity-40">
                        <a href="/contact" className="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">
                            Contact
                        </a>
                    </li>
                    <li className="opacity-40">
                        <a href="/privacy" className="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">
                            Politique de confidentialité
                        </a>
                    </li>
                    <li className="opacity-40">
                        <a href="/terms" className="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">
                            Conditions d’utilisation
                        </a>
                    </li>
                </ul>
                <ul className="flex flex-row gap-4">
                    <li><Twitter className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" /></li>
                    <li><Linkedin className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" /></li>
                    <li><Facebook className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" /></li>
                </ul>
                <small className="opacity-30">&copy; InvoiceGen 2025. Tous droits réservés.</small>
            </footer>
        </div>
    );
}
