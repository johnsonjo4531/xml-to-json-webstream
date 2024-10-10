import { streamXMLToJSON } from "../../index.ts";
import { getExampleData } from "../utils.ts";

async function* getItems(
    stream: ReadableStream<string | Uint8Array>,
    start: number,
    end?: number,
) {
    let count = 0;
    // In rss entries are generally small so we can
    for await (
        const entry of streamXMLToJSON(stream, {
            emit: "leafs-named",
            name: "item",
        })
    ) {
        if (count >= start && count < (end ?? Infinity)) {
            yield entry;
        } else if (count > (end ?? Infinity)) {
            break;
        }
        count++;
    }
}
const stream = await getExampleData(0);
for await (const entry of getItems(stream, 0, 10)) {
    console.log(entry);
}
