
const delay = (dt) => { for (let start = new Date().getTime(); new Date().getTime() - start < dt;); }

const task = (callback) => {
    setTimeout(callback, 0)
}

const animationCallback = (callback) => {
    requestAnimationFrame(callback);
}

const microtask = (callback) => {
    Promise.resolve().then(callback);
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

        task(() => log('Task 1 finished'))
        task(() => delay(dt))
        task(() => log('Task 2 finished'))
        task(() => delay(dt))
        task(() => log('Task 3 finished'))
        task(() => { animationCallback(() => log('Animation callback from task')) })
        task(() => { microtask(() => log('Microtask from task')) })
        task(() => delay(dt))
        task(() => log('Task 4 finished'))
        task(() => delay(dt))
        task(() => log('Task 5 finished'))

        animationCallback(() => log('Animation Callback 1 finished'))
        animationCallback(() => delay(dt))
        animationCallback(() => log('Animation Callback 2 finished'))

        microtask(() => log('Microtask 1 finished'))
        microtask(() => delay(dt))
        microtask(() => log('Microtask 2 finished'))

        log('END')

    })

    document.querySelector('button.run-with-code').addEventListener('click', () => {
        log('Clicked RUN BUTTON RUN')
        document.querySelector('button.run').click()
    })

})