import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ChevronLeft, Mail, Linkedin, Twitter, Facebook } from "lucide-react";
import { useEffect, useState } from "react";

export default function Contact({ mode }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        document.title = "Contact - InvoiceGen";
    }, []);

    const handleNavigate = (link) => {
        navigate(link);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, on ouvre le client mail avec les infos pré-remplies
        window.location.href = `mailto:martharun514@gmail.com.com?subject=Message de ${formData.name}&body=Email: ${formData.email}%0D%0A%0D%0A${formData.message}`;
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div
            className={`relative w-full min-h-screen flex flex-col items-center ${mode ? "bg-neutral-100 text-neutral-800" : "bg-neutral-900 text-white"
                } transition-colors duration-200`}
        >
            {/* Background */}
            <div className="overflow-hidden w-full h-screen lg:h-[90vh] opacity-45 absolute top-0 left-0 flex flex-col items-center justify-center">
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
                            href="/"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex"
                            href="/about"
                        >
                            A propos
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[#607AFB] opacity-40 transition-colors duration-250"
                            href="/help"
                        >
                            Aide
                        </a>
                    </li>
                </ul>
            </header>

            {/* Content */}
            <section className="mt-32 mb-20 w-[80%] xl:w-[65%] flex flex-col items-start justify-center gap-y-8 animate-fade-up duration-600 px-4 lg:px-10">
                <h1 className="text-4xl xl:text-5xl font-semibold text-white text-center w-full">
                    Contact
                </h1>
                <p className="opacity-40 text-center w-full -mt-4">Nous serons ravis de vous répondre</p>

                <div className="mt-8 w-full flex flex-col lg:flex-row gap-10">
                    {/* Formulaire de contact */}
                    <form className="flex-1 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="p-3 rounded-lg border border-white/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#607AFB] transition-colors"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="p-3 rounded-lg border border-white/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#607AFB] transition-colors"
                        />
                        <textarea
                            name="message"
                            placeholder="Votre message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="p-3 rounded-lg border border-white/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#607AFB] transition-colors resize-none"
                        />
                        <button
                            type="submit"
                            className="text-white bg-[#607AFB] hover:bg-[#505fd1] transition-colors font-semibold p-3 rounded-lg mt-2"
                        >
                            Envoyer
                        </button>
                        {submitted && <p className="text-green-400 mt-2">Message prêt à être envoyé via votre client mail !</p>}
                    </form>

                    {/* Contact direct */}
                    <div className="flex-1 flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold text-white">Nous contacter directement</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-white/50">
                                <Mail />
                                <a href="mailto:martharun514@gmail.com" className="hover:text-[#607AFB] ">
                                    martharun514@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-white/50">
                                <Linkedin className=" filled-icon" />
                                <a href="https://www.linkedin.com/in/ton-profil" target="_blank" className="hover:text-[#607AFB] ">
                                    LinkedIn
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-white/50">
                                <Twitter className=" filled-icon" />
                                <a href="https://twitter.com/ton-profil" target="_blank" className="hover:text-[#607AFB] ">
                                    Twitter
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-white/50">
                                <Facebook className=" filled-icon" />
                                <a href="https://facebook.com/ton-profil" target="_blank" className="hover:text-[#607AFB] ">
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

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
