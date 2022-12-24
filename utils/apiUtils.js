export default function (url, options, callback, error) {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                error(json.error)
            } else {
                callback(json)
            }
        })
        .catch(e => error(e)) 
}