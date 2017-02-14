# Library

Name suggestions are more than welcome.

## Development server

In order to run a development server, execute these instructions:

1. Run `npm install dpd-cli -g` in your console and ensure mongodb is installed.
2. Do this: [Create a Stormpath API Key Pair](https://docs.stormpath.com/rest/product-guide/latest/quickstart.html#create-an-api-key-pair)
3. Enter into the git pull'd directory and run `node server/auth_server.js` and then `cd src/d-server && dpd`
4. Visit the URL and port 3000 to visit it.
5. Each time you make a change, run `ng build` and refresh.

## Deploying

In order to deploy, execute these instructions:

1. Run `npm install dpd-cli -g` in your console and ensure mongodb is installed.
2. Do this: [Create a Stormpath API Key Pair](https://docs.stormpath.com/rest/product-guide/latest/quickstart.html#create-an-api-key-pair)
3. Enter into the git pull'd directory and run `npm start`, which will launch the backend as well as the frontend with the API layer.
4. Visit the URL and port 3000 to visit it. You're good to go.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
