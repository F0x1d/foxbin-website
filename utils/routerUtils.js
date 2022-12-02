function goBackOrReplace(router, where) {
    if (window.history.state && window.history.state.idx > 0) {
        router.back()
    } else {
        router.replace(where)
    }
}

export { goBackOrReplace }