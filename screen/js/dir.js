export default function () {
    function getLocation() {
        const long = document.getElementById('long')
        const lat = document.getElementById('lat')
        if (navigator.geolocation) {
            const options = {
                enableHighAccuracy: true,
                timeout: 60000
                // maximumAge: 5000
            };
            function getCurrPos() {
                navigator.geolocation.watchPosition(success, error, options)
                setTimeout(() => {
                    getCurrPos()
                }, 5000);
            }
            getCurrPos()


            function success(pos) {
                // console.log(pos)
                long.innerHTML += pos.coords.longitude + '<br>'
                // lat.innerHTML += pos.coords.latitude + ' '
            }
            function error() {

            }


        } else {
            long.textContent = '-'
            lat.textContent = '-'
            console.log("Location is not available")
        }
    }
    getLocation()

}