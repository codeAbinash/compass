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
        alpha += 90
        deg.innerHTML = `${Math.ceil(alpha)}&deg`;
        compass.style.rotate = `${alpha}deg`

    }


    // let gyroscope = new Gyroscope({ frequency: 6 });

    // gyroscope.addEventListener('reading', (e) => {
    //     document.getElementById('x').innerHTML = (`X-axis ${gyroscope.x.toFixed(5)}`);
    //     document.getElementById('y').innerHTML = (`Y-axis ${gyroscope.y.toFixed(5)}`);
    //     document.getElementById('z').innerHTML = (`Z-axis ${gyroscope.z.toFixed(5)}`);
    // });
    // gyroscope.start();
}