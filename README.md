# xml-to-json-webstream

<p align="center">
    <img width="280" src="https://raw.githubusercontent.com/johnsonjo4531/xml-to-json-webstream/refs/heads/main/assets/logo.svg"/>
</p>

A modern frontend and xml parser library that uses browser's webstreams and the browser compatible sax-ts under the hood, and adds better typings to it and uses an alternative async iteration API instead of an event API.

## Installation

Pick your method of installation

### npm

```bash
npm i xml-to-json-webstream
```

### yarn

```bash
yarn add xml-to-json-webstream
```

> ℹ️ This library is React Native compatible, but until fetch in React Native supports streaming content and web streams [you must setup fetch here to stream content](https://github.com/facebook/react-native/issues/27741#issuecomment-2362901032V) that link also sets up webstreaming library polyfills which is necessary for this library to work in React Native.)

## Why?

Because I had some massive RSS feeds to parse and I needed a way to parse only parts of the RSS data as json that I needed at the time. I also wanted a way to query only part of an RSS feed I would need efficiently. I couldn't find a good library that should work for my use case of React-native (my actual use case and what has been tested), Node (this hasn't been tested but should either just work depending on Node versions or need polyfills), and Web (which should just work since we are using webstreams) so I thought I'd create one.


## Documentation

See the [docs](https://johnsonjo4531.github.io/xml-to-json-webstream)

## streamXMLToJSON

This function streams XML in various ways into JSON

One thing to note before looking at the example is that there are multiple options for emitting data to json from xml in this library.

Here's their explanation:


### Examples defined by Emit Modes:

The various emit modes defined. Note that each example is different in that
it showcases a specific emit option or mode that is sent into the options object
in the second argument to the streamXMLToJSON function. Each emit option only happens when a closing or selfclosing xml tag is hit but depending on the emit mode it may be the closing tag of a subelement.

#### "updating-root"

Emits the root xml element as json over and over slowly adding new items and ubitems to it as they are parsed.

```ts
import { streamXMLToJSON } from "../../index.ts";
import { getExampleData } from "../utils.ts";

async function getTitle(stream: ReadableStream<Uint8Array | string>) {
    for await (
        const item of streamXMLToJSON(stream, {
            emit: "updating-root",
        })
    ) {
        if (item?.rss?.channel?.title) {
            return item?.rss?.channel?.title;
        }
    }
    return "";
}
const stream = await getExampleData(0);

console.log(await getTitle(stream));
```

#### "updating-named"

Alot like "updating-root" except you give it a specific name or path of the only items you want emitted.
Note that the path syntax does not care where the first element of the path exists in the xml
it will also treat all arrays as if their items were just objects and emit only those that match.

```ts
import { streamXMLToJSON } from "../../index.ts";
import { getExampleData } from "../utils.ts";
// Get just enough data about the channel and then output.
async function getChannel(
    stream: ReadableStream<string | Uint8Array>,
) {
    // In rss entries are generally small so we can
    for await (
        const { channel } of streamXMLToJSON(stream, {
            emit: "updating-named",
            name: "channel",
        })
    ) {
        console.log(channel, channel.image);
        if (
            channel.title &&
            channel.image
        ) {
            return channel;
        }
    }
}
const stream = await getExampleData(0);
console.log(await getChannel(stream));
```

#### "leafs-named"

Alot like "leafs", but uses the name option to emit only leaf nodes that either match an exact name or a path that will lead to that name.
Note that the path syntax does not care where the first element of the path exists in the xml
it will also treat all arrays as if their items were just objects and emit only those that match.

```ts
import { streamXMLToJSON } from "../../index.ts";
import { getExampleData } from "../utils.ts";

async function* getChannelImage(
    stream: ReadableStream<string | Uint8Array>,
) {
    for await (
        const { image, ["itunes:image"]: itunesImage } of streamXMLToJSON<
            {
                image?: {
                    link?: string;
                    url?: string;
                    title?: string;
                    description?: string;
                };
                ["itunes:image"]?: { "@href"?: string };
            }
        >(
            stream,
            {
                emit: "leafs-named",
                // Get the channel's image or itunes:image
                name: ["channel.image", "channel.itunes:image"],
            },
        )
    ) {
        yield { image, itunesImage } as const;
    }
}
const stream = await getExampleData(0);
for await (const item of getChannelImage(stream)) {
    console.log(item.image ?? item.itunesImage);
}
```


#### "leafs"

The most verbose of all options and probably not what you want, but get's any and all combinations of parts and pieces of json possible using breadth first search.
Basically walks the whole XML tree and emits JSON as it goes.


## streamingSAX

This is a streaming xml parser that uses a port of the sax parser from isaacs it is what streamXMLToJSON uses under the hood to write it's streaming xml parser. Here's a simple example that only gets the text events of the sax parser. There are many more event types that can be seen in the documentation.

```ts
const stream = await getExampleData(3);
let text = "";
for await (
    const item of stream.pipeThrough(streamingSAX({
    saxOptions: {
        strict: true,
    },
    events: ["text"],
}))
) {
    text += item.payload;
}
```
