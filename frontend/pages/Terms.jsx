import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ChevronLeft, Twitter, Linkedin, Facebook } from "lucide-react";
import { useEffect } from "react";

export default function Terms({ mode }) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Conditions d’utilisation - InvoiceGen";
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
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="/">Home</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="/about">A propos</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250" href="/contact">Contact</a></li>
                </ul>
            </header>

            {/* Content */}
            <section className="mt-32 mb-20 w-[80%] xl:w-[65%] flex flex-col items-start justify-center gap-y-8 animate-fade-up duration-600 px-4 lg:px-10">
                <h1 className="text-4xl xl:text-5xl font-semibold text-[#607AFB] text-center w-full">
                    Conditions d’utilisation
                </h1>
                <p className="opacity-50 text-center w-full -mt-4">Dernière mise à jour : 4 novembre 2025</p>

                <article className="prose prose-invert max-w-none leading-relaxed mt-8 space-y-6 text-justify">
                    <p>
                        Bienvenue sur <strong>InvoiceGen</strong>, une application web qui vous permet de
                        créer et générer facilement des factures au format numérique. En utilisant cette
                        application, vous acceptez les présentes conditions d’utilisation.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">1. Objet de l’application</h2>
                    <p>
                        InvoiceGen est une application fonctionnant entièrement côté client. Elle permet aux
                        utilisateurs de créer et personnaliser des factures sans avoir besoin d’un serveur
                        distant ni d’un compte utilisateur.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">2. Données et confidentialité</h2>
                    <p>
                        Toutes les informations saisies dans InvoiceGen sont traitées exclusivement sur votre
                        appareil. Aucune donnée n’est transmise à un serveur externe ni collectée par le
                        développeur.
                    </p>
                    <p>
                        Les données peuvent être temporairement stockées dans votre navigateur (localStorage,
                        cache) pour améliorer votre expérience, mais vous pouvez les supprimer à tout moment.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">3. Utilisation de l’application</h2>
                    <p>
                        Vous pouvez utiliser InvoiceGen librement pour un usage personnel ou professionnel,
                        dans le respect des lois en vigueur. Vous êtes responsable du contenu des informations
                        que vous saisissez et des documents générés.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">4. Propriété intellectuelle</h2>
                    <p>
                        Le contenu, le design et le code source de l’application InvoiceGen sont protégés par
                        les lois sur la propriété intellectuelle. Toute reproduction ou redistribution non
                        autorisée est interdite.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">5. Absence de garantie</h2>
                    <p>
                        InvoiceGen est fourni “tel quel”, sans garantie d’aucune sorte. L’utilisateur reste
                        responsable de la validité légale de ses factures et de leur conformité aux
                        réglementations locales.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">6. Limitation de responsabilité</h2>
                    <p>
                        Le développeur ne peut être tenu responsable des pertes, erreurs ou dommages liés à
                        l’utilisation de l’application, y compris la perte de données ou d’exploitation.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">7. Modifications</h2>
                    <p>
                        Ces conditions peuvent être modifiées à tout moment sans préavis. La date de dernière
                        mise à jour figure en haut de cette page.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#607AFB]">8. Contact</h2>
                    <p>
                        Pour toute question ou suggestion, vous pouvez contacter le développeur à l’adresse :{" "}
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
                    <li
                        onClick={() => handleNavigate('/terms')}
                    >
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
