import { About } from "../pages/about.js";
import { Edition } from "../pages/edition.js";
import { Help } from "../pages/help.js";
import { Home } from "../pages/home.js";
import { Landing } from "../pages/landing.js";


export function router(route) {
    const app = document.getElementById("app");
    

    switch (route) {
        case "#/about":
            app.innerHTML = About();
            break;
        case "#/help":
            app.innerHTML = Help();
            break;
        case "#/home":
            app.innerHTML = Home();
            break;
        case "#/edition":
            app.innerHTML = Edition({mode: true});
            break;
        case "#/landing":
        default:
            app.innerHTML = Landing({
                mode: true,
            });
            break;
    }

    // re-run lucide to render the icons
    if (window.lucide) lucide.createIcons();
}