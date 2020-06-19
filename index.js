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
addEventListener('fetch', event => {
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
    // Replace with the approriate paths and handlers
    // r.get('.*/bar', () => new Response('responding for /bar'))
    // r.get('.*/foo.*', request => handler(request))
    // r.post('.*/foo.*', request => handler(request))
    // r.get('/demos/router/foo', request => fetch(request)) // return the response from the origin

    r.get('/.*', request => handler(request)) // return a default message for the root route

    const resp = await r.route(request)
    return resp
}

async function getImage(url) {
    let imageReq = await fetch(url, {
        method: 'GET',
        headers: DEFAULT_HEADERS
    })
    let image = await imageReq.body
    return image
}