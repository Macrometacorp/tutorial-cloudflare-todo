# A serverless todo App using CloudFlare Workers and Macrometa DB - a demonstration of low latency stateful data serving and edge functions

A stateful serverless edge function (running on CloudFlare (https://www.stackpath.com/products/serverless-scripting/)  for serving low latency data from Macrometa's global database (www.macrometa.co) showcased as a "ToDo List App"

Try the app - https://couldflare-todo.solanki.workers.dev/  (use the developer tools in chrome to measure network time for end to end latency - from click to edge function (on StackPath) to DB on Macrometa's service and back).  

Depending on where you physically are (city, state, country) you will be routed to the closest CloudFlare Edge PoP where the serverless function will run to generate the HTML and serve data from the closest Macrometa database PoP.  In contrast to current web architectures where the back end (functions/lambdas or containers and the database) run in one region, this example app exploits global distribution and exeuction of functions (CF workers) and stateful globally distributed data (macrometa database). The end to end latency should be no more than 75ms per request for serving database requests via the function to your browser. 

Prior art and motivation

This is a simple TO DO app based on a tutorial by cloudflare (CF) on using CF Workers (https://workers.cloudflare.com/) and CF KV Store (https://developers.cloudflare.com/workers/reference/storage)



# Global ToDo App (Cloudflare Workers + Macrometa GDN)

## Demo

[demo](https://couldflare-todo.solanki.workers.dev/)

## Run Project

```
npm install
```

1. Install [Wrangler](https://github.com/cloudflare/wrangler) on your machine.

2. Add API_KEY Environment variables in `.env`

   ```
   API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   ```

3. To Preview Run you project with live reload

   ```
   Wrangler preview --watch
   ```
## Install JSC8

JSC8 is added to the demo as default, you can view package.json to list all other dependencies.
To add more dependencies run
```
npm install --save <package-name>

// Example
nmp install --save jsc8
```

## Config [ref](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#config)

Configure your global Cloudflare user. This is an interactive command that will prompt you for your API token.

```
wrangler config [--api-key]
```

## Publish [ref](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish)

Publish your Worker to Cloudflare. Several keys in your wrangler.toml determine whether you are publishing to a workers.dev subdomain or your own registered domain, proxied through Cloudflare.

```
wrangler publish [--env $ENVIRONMENT_NAME]
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).
