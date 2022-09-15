export default function () {
    let count = 0
    let totalDist = 0
    let lastPos
    function getLocation() {
        const long = document.getElementById('long')
        const lat = document.getElementById('lat')
        const acc = document.getElementById('acc')
        const speed = document.getElementById('speed')
        const dist = document.getElementById('dist')
        const options = {
            enableHighAccuracy: true
            // timeout: 60000
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
            lastPos = lastPos ? lastPos : pos
            speedAndDist(pos)
        }

        function error(err) {
            console.log(err)
        }
        // setTimeout(() => { getLocation() }, 10000);
    }
    getLocation()

    // const lastTime 



    function speedAndDist(pos) {
        totalDist =+ distance({ lat1: lastPos.coords.latitude, lon1: lastPos.coords.longitude }, { lat2: pos.coords.latitude, lon2: pos.coords.longitude })
        dist.textContent = totalDist 
        // speed.innerHTML = distance({ lat1: 59.3293371, lon1: 13.4877472 }, { lat2: 59.3225525, lon2: 13.4619422 })
        lastPos = pos
    }

    function distance({ lat1, lon1 }, { lat2, lon2 }) {
        let R = 6371; // km
        let dLat = toRad(lat2 - lat1);
        let dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        // alert(d)
        return (d * 1000).toFixed(0);
    }

    function toRad(Value) {
        return Value * Math.PI / 180;
    }

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

    function EorW(data) {
        return data > 0 ? 'E' : 'W'
    }
    function NorS(data) {
        return data > 0 ? 'N' : 'S'
    }



}