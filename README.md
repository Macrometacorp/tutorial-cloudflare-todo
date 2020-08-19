# 👷 `worker-template` Couldflare-Todo [demo](https://couldflare-todo.solanki.workers.dev/)

## Run Project

```
npm install
```

1. Install [Wrangler](https://github.com/cloudflare/wrangler) on your machine.

2. Add Environment variables in `webpack.config.js`

   ```
   ...
   plugins: [
       new EnvironmentPlugin({
       apiKey:'',
       }),
   ],
   ...

   ```

3. To Preview Run you project with live reload

   ```
   Wrangler preview --watch
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
