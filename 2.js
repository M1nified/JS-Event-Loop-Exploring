
const delay = (dt) => { for (let start = new Date().getTime(); new Date().getTime() - start < dt;); }

const task = (callback, loopUntil = 0) => {
    setTimeout(callback, 0)
    loopUntil > new Date().getTime() && task(callback, loopUntil)
}

const animationCallback = (callback, loopUntil = 0) => {
    requestAnimationFrame(callback);
    loopUntil > new Date().getTime() && animationCallback(callback, loopUntil)
}

const microtask = (callback, loopUntil = 0) => {
    Promise.resolve().then(callback);
    loopUntil > new Date().getTime() && microtask(callback, loopUntil)
}

const log = (...arr) => {
    console.log(...arr)
    document.querySelector('pre').appendChild(document.createTextNode(`${arr.toString()}\n`))
}

const dt = 1000

window.addEventListener('load', () => {

    document.querySelector('button.run').addEventListener('click', () => {

        log('Clicked RUN')

        log('BEGINNING')

        task(() => log('Task finished'), new Date().getTime() + 10)

        animationCallback(() => log('Animation Callback finished'), new Date().getTime() + 10)

        microtask(() => log('Microtask finished'), new Date().getTime() + 10)

        log('END')

    })

    document.querySelector('button.run-with-code').addEventListener('click', () => {
        log('Clicked RUN BUTTON RUN')
        document.querySelector('button.run').click()
    })

})