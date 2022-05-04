const setValue = (selector, value) => {
    document.querySelector(selector).textContent = value
}

const weatherForm = document.querySelector('form')
const address = document.querySelector('input')

document.getElementById('input-form').reset();
setValue('#error', '')
setValue('#location', '')
setValue('#forecast', '')
setValue('#message', '')
setValue('#localtime', '')
setValue('#humidity', '')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    setValue('#error', 'Loading...')
    setValue('#location', '')
    setValue('#forecast', '')
    setValue('#message', '')
    setValue('#localtime', '')
    setValue('#humidity', '')

    fetch('/weather?address=' + encodeURIComponent(address.value)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                setValue('#error', data.error)
                setValue('#location', '')
                setValue('#forecast', '')
                setValue('#localtime', '')
                setValue('#humidity', '')
                return setValue('#message', '')
            }
            setValue('#error', '')
            setValue('#location', data.location)
            setValue('#forecast', data.forecast)
            setValue('#message', data.message)
            setValue('#localtime', 'Local Time: ' + data.localtime)
            setValue('#humidity', 'Humidity: ' + data.humidity + '%')
        })
    })
})