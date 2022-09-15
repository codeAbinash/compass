export default function () {

    document.getElementById('data').innerHTML = (localStorage.locationData)

    console.log(localStorage.locationData)

    let data
    if (localStorage.locationData)
        data = JSON.parse(localStorage.locationData)
    else
        data = []

    function getLocation() {
        const long = document.getElementById('long')
        const lat = document.getElementById('lat')
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(pos => {
                console.log(pos)
                data.push({
                    long: pos.coords.longitude,
                    lat: pos.coords.latitude,
                })
                localStorage.locationData = JSON.stringify(data)
            })
        } else {
            long.textContent = '-'
            lat.textContent = '-'
            console.log("Location is not available")
        }
    }
    getLocation()

}