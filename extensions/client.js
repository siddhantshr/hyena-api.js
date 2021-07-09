const errors = require('./exceptions')
const fetch = require('node-fetch')
const { encode } = require('querystring')

class NsfwResponse {
    /*
    Response provided when the get_nsfw method of Client is called,
    ---------------------------------------------------------------

    Parameters
    ----------
    title : Title of response
    description : Description of response
    image_url : Image URL of response
    URL : URL of the original post
    
    Version
    --------
    Added : 1.0.0
    */
    constructor (title, description, image_url, url) {
        this.title = title
        this.description = description
        this.desc = description
        this.image_url = image_url
        this.image = image_url
        this.url = url
        this.post = url
    }
}

module.exports = class {
    /*
    The client that connects to the API
    -----------------------------------

    Parameters
    ----------
    api_key : [Required] the API key that client should
              use to connect, get one here:
              https://api.hyenabot.xyz/ [String]

    version : [Optional] the version that the client 
              should use [String] [Default : Latest]

    return_json : [Optional] wether the client should
                  return raw json data. [Bool] 
                  [Default : False]

    Methods
    -------
    chatbot : Get a response from an AI Chatbot.

    get_nsfw : Get nsfw images from subreddits
               Endpoints: https://docs.hyenabot.xyz/version-1/nsfw/endpoints

    Version
    --------
    Added : 1.0.0
    */
    constructor (api_key, version, return_json) {
        if (api_key === undefined) throw new errors.NotEnoughParametersError("Must pass in the api key")
        this.api_key = String(api_key)
        if (version === undefined) this.version = "1"
        else this.version = String(version)
        if (return_json === true) this.return_json = true
        else this.return_json = false

        if (["2"].includes(this.version)) throw new errors.DepreciationError(`The version given [${this.version}] is Depreciated, latest versions are: "1"`)
        if (!(["1"].includes(this.version))) throw new errors.InvalidVersionError(`The version given [${this.version}] is invalid, latest versions are: "1"`)

        this.base_url = `https://hyenabot.xyz/api/v${this.version}/`
    }

    async chatbot(args) {
        /*
        Get a response from an AI Chatbot.
        ----------------------------------

        Parameters
        ----------

        An object containing the following:
        message : [Required] the message that the bot should respond to
                  [String]

        language : [Optional] The language that the message is in and the bot should 
                   respond in. [String] [Default : en or english]. 

        name : [Optional] Name of the bot [String] [Default : Hyena]

        owner : [Optional] Name of the bot owner [String] [Default : Donut]

        Version
        --------
        Added : 1.0.0

        Request Type
        ------------
        GET
        */
        let message = null, language = null, bot_name = null, bot_owner = null

        if (args['message'] === undefined) throw new errors.NotEnoughParametersError("The parameter 'message' was not passed in.")
        else message = String(args['message'])
        if (args['language'] === undefined) language = 'en'
        else language = String(args['language'])
        if (args['name'] === undefined) bot_name = 'Hyena'
        else bot_name = String(args['name'])
        if (args['owner'] === undefined) bot_owner = 'Donut'
        else bot_owner = String(args['owner'])

        let payload = {
            "message" : message,
            "language" : language,
            "bot_name" : bot_name,
            "bot_owner" : bot_owner
        }
        let resp = await fetch(this.base_url + "chatbot" + "?" + encode(payload), {
            headers: {'api-key' : this.api_key}
        })
        if (resp.status == 200) {
            let _json = await resp.json()
            if (this.return_json == true) {
                return _json
            }
            return _json['reply']
        } else if (resp.status == 401) {
            throw new errors.UnauthorizedError("No API key was provided") // it should never happen :?
        } else if (resp.status == 403) {
            throw new errors.InvalidApiKeyError(`The API key provided [${this.api_key}] is invalid`)
        } else if (resp.status == 422) {
            throw new errors.InvalidParametersError(resp.json()['err'])
        }
    }

    ai = this.chatbot
    ai_response = this.chatbot
    chatbot_response = this.chatbot

    async get_nsfw(args) {
        /*
        Get nsfw images from subreddits
        Endpoints: https://docs.hyenabot.xyz/version-1/nsfw/endpoints
        ----------------------------------

        Parameters
        ----------

        An object containing the following:
        nsfw_type : [Required] the endpoint that will be used for the response
                    [String]

        return_type : [Optional] The type to be returned in response Choose from
                      <class | json | image> [String] [Default : class]. 
        Version
        --------
        Added : 1.0.0

        Request Type
        ------------
        GET
        */
        let return_type = null
        if (['class', 'json', 'image'].includes(String(args['format']).toLowerCase())) return_type = String(args['format']).toLowerCase()
        else return_type = 'class'

        let nsfw_type = null
        if (args['nsfw_type'] === undefined) throw new errors.NotEnoughParametersError("The parameter 'nsfw_type' was not passed in.")
        else nsfw_type = args['nsfw_type']
        nsfw_type = nsfw_type.toLowerCase().replace(/\//g, "").trim()
        let resp = await fetch(this.base_url + "nsfw/" + nsfw_type, {
            headers: {'api-key' : this.api_key}
        })
        let _json = await resp.json()
        if (resp.status == 200){
            if (this.return_json == true || return_type == 'json') return _json
            else if (return_type == 'image') return _json['image_url']
            else if (return_type == 'class') return new NsfwResponse(_json['title'], _json['description'], _json['image_url'], _json['url'])
        }
        if (resp.status_code == 404) throw new errors.InvalidEndpointError("The endpoint given [{}] is not a valid endpoint, refer to https://docs.hyenabot.xyz/version-1/nsfw/endpoints for list of endpoints")
        else if (resp.status_code == 401) throw new errors.UnauthorizedError("No API key was provided") // it should never happen :?
        else if (resp.status_code == 403) throw new errors.InvalidApiKeyError("The API key provided [{}] is invalid".format(this.api_key))
    }

    nsfw = this.get_nsfw
    smirk = this.get_nsfw
}