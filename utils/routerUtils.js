function goBackOrReplace(router, where) {
    if (window.history.state && window.history.length > 1) {
        router.back()
    } else {
        router.replace(where)
    }
}

export { goBackOrReplace }