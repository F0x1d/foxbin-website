import { useState, useEffect } from "react"

function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key)

    if (saved) {
        return JSON.parse(saved)
    } else {
        return defaultValue
    }
}

export const useLocalStorage = (key, defaultValue, doOnDataGot, doIfDefault) => {
    const [value, setValue] = useState()

    useEffect(() => {
        const storedValue = getStorageValue(key, defaultValue)
        setValue(storedValue)

        if (storedValue === defaultValue) {
            if (doIfDefault) doIfDefault()
        } else {
            if (doOnDataGot) doOnDataGot(storedValue)
        }
    }, [])

    useEffect(() => {
        if (value === getStorageValue(key, defaultValue)) {
            return
        }

        if (value) {
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            localStorage.removeItem(key)
        }
    }, [key, value])
        
    return [value, setValue]
}