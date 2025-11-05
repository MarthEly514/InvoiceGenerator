import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ChevronLeft, Mail, Linkedin, Twitter, Facebook, User, MessageSquare, Send, Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function Contact({ mode }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const navigate = useNavigate();
    const handleNavigate = (link) => {
        navigate(link)
    }

    useEffect(() => {
        document.title = "Contact - InvoiceGen";
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            return;
        }

        setStatus('sending');

        try {
            const response = await fetch('https://formspree.io/f/mnnoedrv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setShowSnackbar(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    setStatus('');
                    setShowSnackbar(false);
                }, 3000);
            }
        } catch (error) {
            setStatus('error', error);
        }
    };

    return (
        <div className={`relative w-full min-h-screen flex flex-col items-center ${mode ? 'bg-neutral-100 text-neutral-800' : 'bg-neutral-900 text-white'} transition-colors duration-200`}>
            <div className="overflow-hidden w-full h-screen lg:h-[90vh] opacity-45 absolute top-0 left-0 bg-top-left flex flex-col items-center justify-center">
                <div className="w-full absolute -top-25 left-0 h-50 rounded-full blur-2xl bg-neutral-900"></div>
                <div className="w-full absolute -bottom-15 left-0 h-50 rounded-full blur-2xl bg-neutral-900"></div>
            </div>

            <header className={`w-full xl:w-[80%] p-4 px-8 flex flex-row items-center justify-between border-b ${mode ? 'border-neutral-600/20' : 'border-white/20'} z-10 fixed top-0 backdrop-blur-xl`}>
                <div className="flex flex-row items-center gap-4">
                    <ArrowDownRight className="text-[#607AFB]" />
                    <h1 className="text-xl font-semibold cursor-pointer">InvoiceGen</h1>
                </div>
                <ul className="flex flex-row items-center gap-4">
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="#/">Home</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250 hidden md:flex" href="#/about">A propos</a></li>
                    <li><a className="hover:text-[#607AFB] opacity-40 transition-colors duration-250" href="#/help">Aide</a></li>
                </ul>
            </header>

            <section className="mt-24 w-full xl:w-[80%] min-h-screen flex flex-col items-center justify-center gap-y-8 animate-fade-up duration-600 px-4 py-12">
                <div className="w-full max-w-2xl z-10">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl xl:text-5xl font-semibold mb-4">
                            Contactez-nous
                        </h1>
                        <p className="text-lg opacity-40 font-light xl:text-xl">
                            Nous sommes là pour vous aider
                        </p>
                    </div>

                    <div className={`${mode ? 'bg-white/80' : 'bg-neutral-800/80'} backdrop-blur-xl rounded-2xl shadow-xl p-8`}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 opacity-70">
                                    Nom
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 opacity-40" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 ${mode ? 'bg-neutral-50 border-neutral-300 focus:border-[#607AFB]' : 'bg-neutral-700 border-neutral-700 focus:border-[#607AFB]'} border rounded-lg focus:ring-2 focus:ring-[#607AFB]/20 transition outline-none`}
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 opacity-70">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 opacity-40" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-3 ${mode ? 'bg-neutral-50 border-neutral-300 focus:border-[#607AFB]' : 'bg-neutral-700 border-neutral-700 focus:border-[#607AFB]'} border rounded-lg focus:ring-2 focus:ring-[#607AFB]/20 transition outline-none`}
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 opacity-70">
                                    Message
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <MessageSquare className="h-5 w-5 opacity-40" />
                                    </div>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className={`block w-full pl-10 pr-3 py-3 ${mode ? 'bg-neutral-50 border-neutral-300 focus:border-[#607AFB]' : 'bg-neutral-700 border-neutral-700 focus:border-[#607AFB]'} border rounded-lg focus:ring-2 focus:ring-[#607AFB]/20 transition resize-none outline-none`}
                                        placeholder="Votre message..."
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={status === 'sending'}
                                className="w-full bg-[#607AFB] hover:bg-[#5169E0] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Envoyer le message</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-opacity-20 text-center text-sm opacity-60">
                            <p>Ou écrivez-nous directement à</p>
                            <a href="mailto:martharun514@gmail.com" className="text-[#607AFB] hover:text-[#5169E0] font-medium transition-colors duration-300">
                                martharun514@gmail.com
                            </a>
                        </div>
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
            {showSnackbar && (
                <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-up z-50">
                    <span>Message envoyé avec succès</span>
                    <Check className="w-5 h-5" />
                </div>
            )}
        </div>
    );
}
