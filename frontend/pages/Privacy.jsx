import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ChevronLeft, Twitter, Linkedin, Facebook } from "lucide-react";
import { useEffect } from "react";

export default function Privacy({ mode }) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Politique de confidentialité - InvoiceGen";
    }, []);

    const handleNavigate = (link) => {
        navigate(link);
    };

    return (
        <div
            className={`relative w-full min-h-screen flex flex-col items-center ${mode ? "bg-neutral-100 text-neutral-800" : "bg-neutral-900 text-white"
                } transition-colors duration-200`}
        >
            {/* Background */}
            <div className="overflow-hidden w-full h-screen lg:h-[90vh] opacity-45 absolute top-0 left-0 bg-top-left flex flex-col items-center justify-center">
                <div className="w-full absolute -top-25 left-0 h-50 rounded-full blur-2xl bg-neutral-900"></div>
                <div className="w-full absolute -bottom-15 left-0 h-50 rounded-full blur-2xl bg-neutral-900"></div>
            </div>

            {/* Header */}
            <header
                className={`w-full xl:w-[80%] p-4 px-8 flex flex-row items-center justify-between border-b ${mode ? "border-neutral-600/20" : "border-white/20"
                    } z-10 fixed top-0 backdrop-blur-xl`}
            >
                <div className="flex flex-row items-center gap-4">
                    <ArrowDownRight className="text-[#607AFB]" />
                    <h1
                        className="text-xl font-semibold cursor-pointer"
                        onClick={() => handleNavigate("/")}
                    >
                        InvoiceGen
                    </h1>
                </div>
                <ul className="flex flex-row items-center gap-4">
                    <li>
                        <a
                            className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex"
                            href="#/"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex"
                            href="#/about"
                        >
                            A propos
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[#607AFB] opacity-40 transition-colors duration-250"
                            href="#/help"
                        >
                            Aide
                        </a>
                    </li>
                </ul>
            </header>

            {/* Content */}
            <section className="mt-32 mb-20 w-[80%] xl:w-[65%] flex flex-col items-start justify-center gap-y-8 animate-fade-up duration-600 px-4 lg:px-10">
                <h1 className="text-4xl xl:text-5xl font-semibold text-[#607AFB] text-center w-full">
                    Politique de confidentialité
                </h1>
                <p className="opacity-50 text-center w-full -mt-4">Dernière mise à jour : 5 novembre 2025</p>

                <article className="prose prose-invert max-w-none leading-relaxed mt-8 space-y-6 text-justify">
                    <p>
                        Chez <strong>InvoiceGen</strong>, votre vie privée est importante. Cette politique
                        explique comment les informations que vous saisissez dans l'application sont traitées
                        et protégées.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">1. Collecte de données</h2>
                    <p>
                        InvoiceGen ne collecte aucune donnée personnelle sur un serveur externe. Toutes les
                        informations que vous saisissez sont traitées uniquement sur votre appareil.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">2. Stockage local</h2>
                    <p>
                        Pour améliorer votre expérience, certaines données peuvent être temporairement
                        enregistrées dans votre navigateur via localStorage ou cache. Vous pouvez les
                        supprimer à tout moment sans affecter le fonctionnement de l’application.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">3. Cookies et technologies similaires</h2>
                    <p>
                        InvoiceGen n’utilise pas de cookies pour suivre vos activités ou pour collecter
                        des informations personnelles.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">4. Sécurité</h2>
                    <p>
                        Comme les données sont traitées localement, leur sécurité dépend de la sécurité de
                        votre appareil et de votre navigateur. Nous recommandons de garder votre navigateur
                        et votre système à jour pour garantir une protection maximale.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">5. Partage des données</h2>
                    <p>
                        Aucune donnée saisie dans InvoiceGen n’est partagée avec des tiers. Vous restez le
                        seul propriétaire de vos informations.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">6. Modifications de la politique</h2>
                    <p>
                        Cette politique peut être mise à jour de temps en temps. La date de dernière mise à
                        jour est indiquée en haut de cette page.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">7. Contact</h2>
                    <p>
                        Pour toute question concernant la confidentialité sur InvoiceGen, vous pouvez
                        contacter le développeur à l’adresse :{" "}
                        <a href="mailto:martharun514@gmail.com" className="text-[#607AFB] hover:underline">
                            martharun514@gmail.com
                        </a>
                    </p>
                </article>

                <div className="flex flex-row gap-3 items-center justify-center mt-10 w-full">
                    <button
                        className="text-[#697AFB] hover:text-white xl:text-xl flex flex-row items-center justify-center gap-3 border-2 border-[#697AFB] hover:bg-[#616dc2] transition-colors duration-300 font-semibold p-2.5 px-6 rounded-lg cursor-pointer"
                        onClick={() => handleNavigate(-1)}
                    >
                        <ChevronLeft />
                        Retour
                    </button>
                </div>
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
                    <li onClick={() => handleNavigate("/terms")}>
                        <Twitter className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" />
                    </li>
                    <li>
                        <Linkedin className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" />
                    </li>
                    <li>
                        <Facebook className="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon" />
                    </li>
                </ul>
                <small className="opacity-30">&copy; InvoiceGen 2025. Tous droits réservés.</small>
            </footer>
        </div>
    );
}
