const main = document.querySelector('#main')

function loadFromRout() {
    const url = new URL(window.location)
    if (url.search)
        loadScreen(`./${url.searchParams.get('page')}.html`, 0, 0)
    else
        loadScreen('./home.html', 0, 0)
}
loadFromRout()




function loadScreen(src, dir = 0, animDur = 200) {
    main.style.transitionDuration = `${animDur}ms`
    // main.style.opacity = '0'
    if (dir == 0)
        main.style.marginLeft = '-100%'
    else
        main.style.marginLeft = '100%'

    const fetchedData = fetch(`./screen/page/${src}`)
        .then(data => data.text())
        .then(html => {
            setTimeout(() => {
                // main.style.opacity = '1'
                // main.style.transitionDuration = `${animDur / 10}ms`
                // main.style.transitionDuration = `0ms`
                main.style.marginLeft = '0%'
                main.innerHTML = html
                document.title = document.querySelector('#main title').textContent
                loadScripts()
                changeRout(src)
            }, animDur);
        })
}


async function loadScripts() {
    let scripts = document.querySelectorAll('#main script[src]')
    scripts.forEach(async script => {
        const imported = await import(script.src)
        imported.default()
        // script.remove()
    })
}



function changeRout(src = '') {
    let startIndex = src.indexOf('screen/page/')
    let endIndex = src.lastIndexOf('.')
    let rout = src.substring(startIndex + 3, endIndex)
    const url = new URL(window.location)
    // if(hash) url.hash = hash
    url.search = `?page=${rout}`
    window.history.pushState('', '', url)
    // window.history.pushState('link','Sample Title', rout)
    // console.log(rout)
}




// On clicking Back
window.onpopstate = (e) => {
    e.preventDefault()
    const url = new URL(window.location)
    loadScreen(`./${url.searchParams.get('page')}.html`, 1)
}

// loadScreen('./home.html')