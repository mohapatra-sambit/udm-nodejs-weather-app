const setValue = (selector, value) => {
    document.querySelector(selector).textContent = value
}

const weatherForm = document.querySelector('form')
const address = document.querySelector('input')

setValue('#error', '')
setValue('#location', '')
setValue('#forecast', '')
setValue('#message', '')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    setValue('#error', 'Loading...')
    setValue('#location', '')
    setValue('#forecast', '')
    setValue('#message', '')

    fetch('/weather?address=' + encodeURIComponent(address.value)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                setValue('#error', data.error)
                setValue('#location', '')
                setValue('#forecast', '')
                return setValue('#message', '')
            }
            setValue('#error', '')
            setValue('#location', data.location)
            setValue('#forecast', data.forecast)
            setValue('#message', data.message)
        })
    })
})