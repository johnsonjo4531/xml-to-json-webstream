import { streamXMLToJSON } from "../../index.ts";
import { getExampleData } from "../utils.ts";

async function getLast<T>(iterable: AsyncIterable<T>): Promise<Awaited<T> | null> {
    let result = null;
    for await (
        const item of iterable
    ) {
        result = item;
    }
    return result;
}

const stream = await getExampleData(0);
console.log(
    await getLast(streamXMLToJSON(stream, {
        emit: "updating-root",
    })),
);
