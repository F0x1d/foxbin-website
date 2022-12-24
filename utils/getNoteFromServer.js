import { getCookie } from 'cookies-next'

export default async function (req, res, params) {
    const accessToken = getCookie('foxbin_token', { req, res })

    const response = await fetch("https://foxbin.f0x1d.com/get/" + params.slug + (accessToken ? "?accessToken=" + accessToken : ""))
    const data = await response.json()
    const note = data.note

    if (data.error) {
        return {
            notFound: true
        }
    }
  
    return { 
        props: { 
            note
        } 
    }
}