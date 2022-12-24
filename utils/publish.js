import request from '../utils/apiUtils'

export default function (slug, content, accessToken, setLoading, endPoint, callback) {
    setLoading(true)

    let jsonBody = { "slug": slug, "content": content, "accessToken": accessToken }

    request("https://foxbin.f0x1d.com/" + endPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "charset": "UTF-8" },
        body: JSON.stringify(jsonBody)
    }, (json) => {
        setLoading(false)
        callback(json)
    }, (error) => {
        setLoading(false)
        alert(error)
    })
}