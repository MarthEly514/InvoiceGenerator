import { Card } from "../src/components/card.js";
import { NavButton } from "../src/components/navigationButtton.js";

export function Landing({mode}) {
    return `
    <div class="w-full min-h-screen h-full flex flex-col items-center ${mode ? 'bg-neutral-100 text-neutral-800' : 'bg-gray-900 text-white'}">
        
        <header class="w-full xl:w-[80%] p-4 px-8 flex flex-row items-center justify-between border-b ${mode?'border-neutral-600/20':'border-white/20'} z-10 fixed top-0 backdrop-blur-xl">
           <div class="flex flex-row items-center gap-4">
                <i data-lucide="arrow-down-right" class="text-[#607AFB]"></i>
               <h1 class="text-xl font-semibold">Invoice Gen</h1>
           </div>
           <ul class="flex flex-row items-center gap-4">
               <li><a class="hover:text-[#607AFB] opacity-40 transition-colors duration-250" href="#/">Home</a></li>
               <li><a class="hover:text-[#607AFB] opacity-40 transition-colors duration-250" href="#/about">A propos</a></li>
               <li><a class="hover:text-[#607AFB] opacity-40 transition-colors duration-250" href="#/help">Aide</a></li>
           </ul>
       </header>

        <!-- hero section -->
        <section class="mt-10 w-full xl:w-[80%] h-screen lg:h-[90vh] flex flex-col items-center justify-center gap-8 animate-fade-up duration-600">
            <h1 class="w-full md:w-[80%] xl:w-[70%] text-5xl xl:text-6xl font-semibold text-center px-3">
                Générez des factures professionnelles en quelques secondes
            </h1>
            <p class="text-lg opacity-40 w-full text-center font-light px-4 xl:text-xl">
                Notre outil intuitif vous aide à créer, envoyer et suivre vos factures sans effort.
            </p>
            ${NavButton(
                {
                    content: 'Générer une facture maintenant',
                    link: '#/edition'
                }    
            )}
        </section>

        <!-- functionnalities section -->
        <section class="w-full xl:w-[80%] h-max flex flex-col items-center gap-8 animate-fade-up duration-500">
            <h1 class="w-full text-4xl font-semibold text-center px-3">
                Fonctionnalités clés
            </h1>
            <p class="opacity-40 w-full text-center text-lg font-light px-4">
                Découvrez les avantages d'utiliser notre générateur de factures.
            </p>  
            <div class="w-full 2xl:w-[90%] grid grid-cols-1 lg:grid-cols-3 gap-4 place-items-center p-4">
            ${Card({
                mode: mode,
                icon: "zap",
                title:"Simplicité",
                content: "Créez des factures avec une facilité déconcertante.",
            })}
            ${Card({
                mode: mode,
                icon: "palette",
                title:"Personnalisation",
                content: "Adaptez vos factures à l'image de votre marque.",
            })}
            ${Card({
                mode: mode,
                icon: "banknote",
                title:"Suivi des paiements",
                content: "Gardez un oeil sur vos paiements en temps réel.",

            })}
            </div>
          </section>
        <footer class="w-full xl:w-[80%] h-max flex flex-col items-center gap-8 py-25 mt-40 border-t ${mode?'border-neutral-600/20':'border-white/20'}">
            <ul class="flex flex-row gap-4">    
                <li class="opacity-40"><a href="" class="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">Contact </a></li>
                <li class="opacity-40"><a href="" class="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">Politique de confidentialité </a></li>
                <li class="opacity-40"><a href="" class="cursor-pointer hover:text-[#607AFB] transition-colors duration-300">Conditions d'utilisation </a></li>
            </ul>
            <ul class="flex flex-row gap-4">    
                <li><i data-lucide="twitter"  class="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon"></i></li>
                <li><i data-lucide="linkedin" class="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon"></i></li>
                <li><i data-lucide="facebook" class="cursor-pointer opacity-40 hover:text-[#607AFB] transition-colors duration-300 filled-icon"></i></li>
            </ul>
            <small class="opacity-30">Copyright &copy; Invoice Gen 2025</small>
        </footer>
    </div>
    `
}
