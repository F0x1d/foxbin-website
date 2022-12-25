import is from 'is_js'

function goBackOrReplace(router, where) {
    if (hasBackStack()) {
        router.back()
    } else {
        router.replace(where)
    }
}

function hasBackStack() {
    return window.history.length > (is.safari() ? 1 : 2)
}

export { goBackOrReplace, hasBackStack }