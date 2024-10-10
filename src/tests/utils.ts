export function getExampleData(
    number: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
) {
    const url = new URL(
        `../../src/tests/example-data/example${number.toString()}.xml`,
        import.meta.url,
    );
    return fetch(url).then((x) => {
        if (!x.ok || !x.body) throw new Error("Request was not ok...");
        return x.body;
    });
}
