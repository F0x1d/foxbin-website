import { useState, useEffect } from "react"
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next'

function getStoredValue(key, defaultValue) {
    const saved = getCookie(key)

    if (saved) {
        return saved
    } else {
        return defaultValue
    }
}

export default function(key, defaultValue, doOnDataGot, doIfDefault) {
    const [value, setValue] = useState()

    useEffect(() => {
        const storedValue = getStoredValue(key, defaultValue)
        setValue(storedValue)

        if (storedValue === defaultValue) {
            if (doIfDefault) doIfDefault()
        } else {
            if (doOnDataGot) doOnDataGot(storedValue)
        }
    }, [])

    useEffect(() => {
        if (value === getStoredValue(key, defaultValue)) {
            return
        }

        if (value) {
            setCookie(key, value, {
                maxAge: 10 * 365 * 24 * 3600,
                sameSite: true,
            })
        } else {
            deleteCookie(key)
        }
    }, [key, value])
        
    return [value, setValue]
}