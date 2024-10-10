# Function: streamXMLToJSON()

> **streamXMLToJSON**\<`T`\>(`stream`, `opts`): `AsyncGenerator`\<`T`\>

## Type Parameters

• **T** *extends* [`JSONStates`](../type-aliases/JSONStates.md) = `Record`\<`string`, `any`\>

## Parameters

• **stream**: `ReadableStream`\<`string` \| `Uint8Array`\>

A ReadableStream of xml in string or Uint8Array format.

• **opts**: `object` \| `object` = `{}`

The following are the properties of opts.

**emit** - decides which emit strategy to take. a string of value "leafs", "updating-root", "leafs-named", or "updating-named"..

**name** - names to filter our XML by. only matters if emit is either "named-leaf" or "updated-named". It's value is either a string or string[].

## Returns

`AsyncGenerator`\<`T`\>

## Tutorial

## Emit Modes:

The various emit modes defined. Each emit only happens when a closing xml tag is hit but
depending on the emit mode it may be the closing tag of a subelement.

### "updating-root"

Emits the root xml element as json over and over slowly adding new items and subitems to it as they are parsed.

## Examples

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

```ts
import { streamXMLToJSON } from "../../index.ts";
import { getExampleData } from "../utils.ts";

async function getRSSTitle(stream: ReadableStream<Uint8Array | string>) {
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

## Tutorial

### "updating-named"

Alot like "updating-root" except you give it a specific name or path of the only items you want emitted.
Note that the path syntax does not care where the first element of the path exists in the xml
it will also treat all arrays as if their items were just objects and emit only those that match.

## Tutorial

### "leafs-named"

Alot like "leafs", but uses the name option to emit only leaf nodes that either match an exact name or a path that will lead to that name.
Note that the path syntax does not care where the first element of the path exists in the xml
it will also treat all arrays as if their items were just objects and emit only those that match.

## Tutorial

### "leafs"

The most verbose of all options and probably not what you want, but get's any and all combinations of parts and pieces of json possible using breadth first search.
Basically walks the whole XML tree and emits JSON as it goes.

## Defined in

index.ts:517
