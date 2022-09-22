async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            // Change the service worker URL to see what happens when the SW doesn't exist
            const registration = await navigator.serviceWorker.register("../sw.js");
            console.log('Service worker registered')
        } catch (error) {
            showResult("Error while registering: " + error.message);
            console.log(error)
        }
    } else {
        showResult("Service workers API not available");
    }
};
registerSW()





function showResult(data){
    console.log(data)
}