export default function home() {
    const skip = document.getElementById('skip')
    const grant = document.getElementById('grant')

    if (localStorage.compassLoggedIn)
        loadScreen('./main.html', 0, 0)
    else
        localStorage.compassLoggedIn = "true"



    skip.onclick = () => { loadScreen('./main.html') }
    grant.onclick = () => {
        if (!navigator.geolocation)
            alert("Geolocation is not Available in your device")
        else {
            grant.innerText = 'Getting Location info...'
            navigator.geolocation.getCurrentPosition((pos) => {
                // Permission Granted and location is loaded
                loadScreen('./main.html')
            })
        }
    }
}