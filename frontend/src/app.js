import { router } from "../router/router.js";

function initRouter() {
    router(window.location.hash);

    //Re-render when hash changes
    window.addEventListener('hashchange', () => {
        router(window.location.hash);
    });
}

initRouter();