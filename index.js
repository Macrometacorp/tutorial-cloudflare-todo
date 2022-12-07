import template from "./template.js";
const jsc8 = require("jsc8")

const defaultData = { todos: [] }

const client = new jsc8({
    url: "https://play.macrometa.io",
    apiKey: API_KEY,
    agent: fetch,
})

const insertKVPairs = (key, data) => {
    const raw = { _key: key, value: data }
    return client.insertKVPairs(COLLECTION_NAME, raw)
}

const getValue = (key) => {
    return client.getValueForKey(COLLECTION_NAME, key)
}

const getTodos = async (request) => {
    let data
    let myKey

    try {
        const ip = request.headers.get("CF-Connecting-IP")
        myKey = `data-${ip}`
        const parsed = await getValue(myKey)
        data = parsed.value
    } catch (e) {
        await insertKVPairs(myKey, defaultData)
        data = defaultData
    }

    const body = template(JSON.stringify(data.todos || []))
    return new Response(body, {
        headers: { "Content-Type": "text/html" },
    })
}

const updateTodos = async (request) => {
    const body = await request.text()
    const ip = request.headers.get("CF-Connecting-IP")
    const myKey = `data-${ip}`
    try {
        await insertKVPairs(myKey, JSON.parse(body))
        return new Response(body, { status: 200 })
    } catch (err) {
        return new Response(err, { status: 500 })
    }
}

const handleRequest = async (request) => {
    if (request.method === "PUT") {
        return updateTodos(request)
    }
    
    return getTodos(request)
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request))
})
