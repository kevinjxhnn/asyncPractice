# Async Exercise

You have a server which stores a large square 2d array with even number of rows and columns. The task is to replicate the 2d array on the client.

-------

## Instructions to setup the project

1. Clone the project

```sh
git clone https://github.com/pixyj/mb-async-live-review-2 async_live_review
```

2. cd to the `async_live_review` directory

```sh
cd async_live_review
```

3. Install dependencies

```sh
npm install
```

4. Start the server

```
node server.js
```

--------


## In `client.js`, Perform the below steps in the following order:

1. Initialize the server by calling the `/initialize` API using `node-fetch`. Initialize will initialize a square 2d array in the server and return the size (number of rows / number of columns) of the 2d array
2. Fetch all the values of the 2d array by calling the `/value` API by providing the rowIndex and colIndex as query parameters. Example URL: "http://localhost:3000/value?rowIndex=0&colIndex=0". When fetching the values, you need to fetch 2 values concurrently, before moving on to fetching the next 2 values and so on.
3. Once all the values are fetched, print the 2d array on the client side. Ensure it matches the 2d array printed on the server.

---

## Docs:

- node-fetch - https://www.npmjs.com/package/node-fetch
