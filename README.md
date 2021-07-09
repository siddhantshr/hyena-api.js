# Hyena API Wrapper
Asynchronous/Synchronous API wrapper for the Hyena API.

## ❓| Hyena API

_The Hyena API is an API made by Donut#4427 for stuff like:_

- Chatbot
- NSFW

_To use the Hyena API you can visit [this page](https://www.hyenabot.xyz/api). And to get more info on it you can visit the [Docs!](https://docs.hyenabot.xyz/)_

_And to see how the hyena-bot works and test it out visit the official [Discord server](https://discord.gg/QePftyb2kN)!_

## Installing

### **Node.js 14+ version is required**

To install the library use the following commands:

```
npm i hyena-api.js
```

To install from the master branch do this:

```
To be filled
```

## Examples

_Some quick examples to show how you can use the api_

```javascript
const hyena = require('hyena-api.js')

client = hyena.Client("MY SUPER SECRET API KEY")

// Chatbot response
resp = hyena.chatbot({message : "Hello!", name : "My bot's name", owner : "My name"})
    .then(text => console.log(text))
    .catch(err => console.log(err))
```

```javascript
const hyena = require('hyena-api.js')

client = hyena.Client("MY SUPER SECRET API KEY")

// NSFW images
resp = hyena.nsfw({nsfw_type : "endpoint", format : "json"})
    .then(text => console.log(text))
    .catch(err => console.log(err))

/*
How to use the response class [Default]

resp.title : Title of response
resp.description : Description of response
resp.image_url : Image URL of response
resp.url : url of the original post
*/
```

## Links

- [Documentation](https://docs.hyenabot.xyz/)
- [Official Server](https://discord.gg/QePftyb2kN)
- [API Link](https://www.hyenabot.xyz/api)