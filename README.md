# ToDo App using CF Workers & Macrometa GDN

## Overview

This tutorial demonstrates low latency stateful data serving and edge functions utilizing Cloudflare Workers and Macrometa Global Data Network (GDN).

The serverless edge function runs on CloudFlare as [Worker](https://workers.cloudflare.com/) serving data with low latency from Macrometa's GDN (www.macrometa.co)

You can try the `ToDo List App` here - **[Demo](http://todo.macrometa.io/)**

Depending on where you are (i.e., city, state, country), your request will be routed to the closest CloudFlare Edge PoP where the serverless function will run to generate the HTML and serve data (`puts`, `gets`) from the closest Macrometa GDN PoP.

In contrast to current web architectures which are centralized in nature (i.e., backend lambdas, functions and database run in one single region), this example app exploits global distribution and exeuction of functions (CF workers) and stateful globally distributed data (Macrometa GDN). The end to end latency should be no more than `75ms` per request for serving database requests via the function to your browser.

> To measure data serving time (i.e., end-to-end latency), you can use the developer tools in chrome browser. It will show the time taken from a `Click in Gui` --> `Edge function (on CloudFlare)` --> `KV store on Macrometa's Global Data Network (GDN) service` --> `Edge function (on CloudFlare)` --> `Gui`.

Macrometa's global data service (GDN) offers `Key Value`, `Dynamo Mode`, `DocumentDB`, `Graphs`, `Search`, `Streams` and `Stream Processing` as API services that can be incorporated into CloudFlare workers to enable sophisticated, data intensive apps that require low latency, high levels of scalability and most importantly _consistent, stateful data_.

**Difference between CloudFlare K/V and Macrometa:**

-   CloudFlare K/V is designed for use cases that frequently read and write very infrequently (only 1 write per second per key https://developers.cloudflare.com/workers/platform/limits ).

-   Macrometa offers an adaptive consistency model ranging from `strong consistency to causal consistency`. Macrometa offers a multi-model interface i.e., it supports `KV`, `DynamoDB compatible API`, `Docs`, `Graphs`, `Search`, `Streams` and `Stream Processing`. This examples uses the KV APi.

> Macrometa does not run on CloudFlare PoPs - it runs in datacenters and PoPs with close adjacency to CloudFlare PoPs - there is some additional network latency between a where a worker executes and the calls it makes to the Macrometa (a few single digit milliseconds) but overall Workers and Macrometa are 3x faster than Worker and Worker K/V.

## Steps

1. Clone the [github repository](https://github.com/Macrometacorp/tutorial-cloudflare-todo) and run `npm install`

    ```bash
    git clone https://github.com/Macrometacorp/tutorial-cloudflare-todo.git
    npm install
    ```

2. Install [Wrangler](https://github.com/cloudflare/wrangler) on your machine.

3. Add API_KEY Environment variables in `.env`

    ```bash
    API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

4. To `Preview Run` the project with live reload

    ```bash
    wrangler preview --watch
    ```

> Macrometa Javascript Driver (jsC8) is already added to this demo. You can view `package.json` to list all other dependencies. If you want to install jsC8 manually then run `npm install --save jsc8`.

5. [Configure](<(https://developers.cloudflare.com/workers/tooling/wrangler/commands/#config)>) your global Cloudflare user. This is an interactive command that will prompt you for your API token.

    ```bash
    wrangler config [--api-key]
    ```

6. [Publish](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish) your Worker to Cloudflare. Several keys in your `wrangler.toml` determine whether you are publishing to a `workers.dev` subdomain or your own registered domain, proxied through Cloudflare.

    ```bash
    wrangler publish [--env $ENVIRONMENT_NAME]
    ```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

## Prior art

This simple TO DO app is based on a tutorial by cloudflare (CF) on using [CF Workers](https://workers.cloudflare.com/) and [CF KV Store](https://developers.cloudflare.com/workers/reference/storage)
