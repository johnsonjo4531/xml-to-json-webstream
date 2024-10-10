import { streamXMLToJSON } from "../../index.ts";
import { getExampleData } from "../utils.ts";

/** Get just enough data about the channel and then output. */
async function* getChannelImage(
    stream: ReadableStream<string | Uint8Array>,
) {
    // In rss entries are generally small so we can
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
