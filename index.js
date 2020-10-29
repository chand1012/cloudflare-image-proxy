const Router = require('./router')
const url = require('url')
const fetch = require('node-fetch')
const DEFAULT_HEADERS = {
    'Accept-Encoding': 'gzip, deflate',
    Accept: '*/*',
    Connection: 'keep-alive',
    'User-Agent': 'node-fetch',
}
/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})

async function handler(request) {
    const parts = url.parse(request.url)
    const imageHref = parts.path.substr(1)
    const body = await getImage(imageHref)

    const init = {
        headers: { 'content-type': 'application/image' },
    }
    return new Response(body, init)
}

async function handleRequest(request) {
    const r = new Router()

    r.get('/.*', (request) => handler(request))

    const resp = await r.route(request)
    return resp
}

async function getImage(url) {
    let imageReq = await fetch(url, {
        method: 'GET',
        headers: DEFAULT_HEADERS,
    })
    let image = await imageReq.body
    return image
}
