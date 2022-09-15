export default function () {

    const compass = document.getElementById('compass-circle')
    const deg = document.getElementById('deg')
    let alpha, beta, gamma

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function (eventData) {
            gamma = eventData.gamma
            beta = eventData.beta
            alpha = eventData.alpha
            deviceOrientationHandler(alpha, beta, gamma);
        }, false);
    } else {
        alert('Compass Not Available')
    };

    function deviceOrientationHandler(alpha) {
        deg.innerHTML = `${getCompassHead(Math.abs(Math.ceil(alpha) - 360))}&deg`;
        compass.style.rotate = `${alpha}deg`
    }

    function getCompassHead(d) {
        if (d > 337 || d <= 22)
            return `N ${d}`
        else if (d > 22 && d <= 68)
            return `NE ${d}`
        else if (d > 68 && d <= 112)
            return `E ${d}`
        else if (d > 112 && d <= 158)
            return `SE ${d}`
        else if (d > 158 && d <= 202)
            return `S ${d}`
        else if (d > 202 && d <= 248)
            return `SW ${d}`
        else if (d > 248 && d <= 292)
            return `W ${d}`
        else if (d > 292 && d <= 338)
            return `NW ${d}`

        return 'N' + d
    }



    // function gyro() {
    //     let gyroscope = new Gyroscope({ frequency: 6 });

    //     gyroscope.addEventListener('reading', (e) => {
    //         document.getElementById('x').innerHTML = (`X ${(10 * gyroscope.x).toFixed(5)}`);
    //         document.getElementById('y').innerHTML = (`Y ${(10 * gyroscope.y).toFixed(5)}`);
    //         document.getElementById('z').innerHTML = (`Z ${(10 * gyroscope.z).toFixed(5)}`);
    //     });
    //     gyroscope.start();
    // }

    function makeDegMinSecStr(data) {
        data = Math.abs(data)
        let deg = parseInt(data)
        data -= deg
        data *= 60

        let min = parseInt(data)
        data -= min
        data *= 60

        let sec = parseInt(data)
        return `${deg}&deg ${min}' ${sec}''`
    }


    // Get Location Location Data
    function getLocation() {
        const long = document.getElementById('long')
        const lat = document.getElementById('lat')
        const acc = document.getElementById('acc')

        const options = {
            enableHighAccuracy: true,
            timeout: 60000
            // maximumAge: 5000
        };

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(success, error, options)
        } else {
            long.textContent = '-'
            lat.textContent = '-'
            console.log("Location is not available")
        }

        function success(pos) {
            long.innerHTML = makeDegMinSecStr(pos.coords.longitude) + ' ' + EorW(pos.coords.longitude)
            lat.innerHTML = makeDegMinSecStr(pos.coords.latitude) + ' ' + NorS(pos.coords.latitude)
            acc.innerHTML = `Accuracy ${Number(pos.coords.accuracy.toFixed(2).toString())} Meters`
        }

        function error(err) {
            console.log(err)
        }


    }


    function EorW(data) {
        return data > 0 ? 'E' : 'W'
    }
    function NorS(data) {
        return data > 0 ? 'N' : 'S'
    }

    getLocation()
}