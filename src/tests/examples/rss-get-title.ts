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
