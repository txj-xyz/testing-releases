document.querySelector('div[import]').onclick = _ => {
    request('configurationListener', true)
}

document.querySelector('div[export]').onclick = _ => {
    request('configurationListener', false)
}