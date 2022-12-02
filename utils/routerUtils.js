import is from 'is_js'

function goBackOrReplace(router, where) {
    const requiredSize = is.safari() ? 1 : 2

    if (window.history.length > requiredSize) {
        router.back()
    } else {
        router.replace(where)
    }
}

export { goBackOrReplace }