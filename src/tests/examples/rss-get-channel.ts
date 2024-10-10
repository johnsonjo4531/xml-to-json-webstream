import { streamXMLToJSON } from "../../index.ts";
import { getExampleData } from "../utils.ts";

/** Get just enough data about the channel and then output. */
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
