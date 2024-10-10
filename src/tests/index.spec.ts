import {
  assert,
  assertEquals,
  assertInstanceOf,
  assertNotEquals,
  assertStringIncludes,
} from "jsr:@std/assert";
import { streamingSAX, streamXMLToJSON } from "../index.ts";
import { getExampleData } from "./utils.ts";
const { test } = Deno;

test("streamXMLToJSON should do something useful like parse RSS", async () => {
  const stream = await getExampleData(1);
  let rss = {};
  for await (
    const item of streamXMLToJSON(stream, {
      emit: "updating-root",
    })
  ) {
    if (item?.feed && item.feed instanceof Object && "title" in item.feed) {
      rss = item;
      break;
    }
    console.log(item);
  }
  console.log(rss);
});

test("it should work with example1", async () => {
  const stream = await getExampleData(1);
  const items = [];
  for await (
    const item of stream.pipeThrough(
      streamingSAX({
        saxOptions: {},
        events: ["opentag"],
      }),
    )
  ) {
    items.push(item);
    assertEquals(item.event, "opentag");
    assertEquals(typeof item.payload.name, "string");
    assertInstanceOf(item.payload.attributes, Object);
    assertEquals(typeof item.payload.isSelfClosing, "boolean");
  }
  assert(items.length >= 1);
});

test("it should work with example2", async () => {
  const stream = await getExampleData(2);
  const items = [];
  for await (
    const item of stream.pipeThrough(
      streamingSAX({
        saxOptions: {},
        events: ["cdata"],
      }),
    )
  ) {
    items.push(item);
    assertEquals(item.event, "cdata");
    assertEquals(typeof item.payload, "string");
  }
  assert(items.length >= 1);
});

test("it should error with example3", async () => {
  const stream = await getExampleData(3);
  const items = [];
  for await (
    const item of stream.pipeThrough(
      streamingSAX({
        saxOptions: {
          strict: true,
        },
        events: ["error"],
      }),
    )
  ) {
    items.push(item);
    assertEquals(item.event, "error");
    assertInstanceOf(item.payload, Error);
  }
  assert(items.length >= 1);
});

test("parses comments", async () => {
  const stream = await getExampleData(2);
  const items = [];
  for await (
    const item of stream.pipeThrough(
      streamingSAX({
        saxOptions: {
          strict: true,
        },
        events: ["comment"],
      }),
    )
  ) {
    items.push(item);
    assertEquals(item.event, "comment");
    assertEquals(typeof item.payload, "string");
  }
  assert(items.length >= 1);
});

test("parses xmnls opennamespace", async () => {
  const stream = await getExampleData(1);
  const items = [];
  for await (
    const item of stream.pipeThrough(
      streamingSAX({
        saxOptions: {
          strict: true,
          xmlns: true,
        },
        events: ["opennamespace"],
      }),
    )
  ) {
    items.push(item);
    assertEquals(item.event, "opennamespace");
    assertEquals(typeof item.payload.prefix, "string");
    assertEquals(typeof item.payload.uri, "string");
  }
  assert(items.length >= 1);
});

test("parses xmnls closenamespace", async () => {
  const stream = await getExampleData(1);
  const items = [];
  for await (
    const item of stream.pipeThrough(
      streamingSAX({
        saxOptions: {
          strict: true,
          xmlns: true,
        },
        events: ["closenamespace"],
      }),
    )
  ) {
    items.push(item);
    assertEquals(item.event, "closenamespace");
    assertEquals(typeof item.payload.prefix, "string");
    assertEquals(typeof item.payload.uri, "string");
  }
  assert(items.length >= 1);
});

test("Gets some text on error but not all", async () => {
  const stream = await getExampleData(3);
  let text = "";
  const saxStream = streamingSAX({
    saxOptions: {
      strict: true,
    },
    events: ["text"],
  });
  for await (
    const item of stream.pipeThrough(
      saxStream,
    )
  ) {
    text += item.payload;
  }
  assertStringIncludes("foo2<fpoo><fo!><!~)_+>?", text);
  assertNotEquals(text, "foo2<fpoo><fo!><!~)_+>?");
});

test("Gets all text on error when continueOnError is true", async () => {
  const stream = await getExampleData(3);
  let text = "";
  const saxStream = streamingSAX({
    continueOnError: true,
    saxOptions: {
      strict: true,
    },
    events: ["text", "error"],
  });
  for await (
    const item of stream.pipeThrough(
      saxStream,
    )
  ) {
    if (item.event === "error") {
      continue;
    }
    text += item.payload;
  }
  assertEquals(text, "");
});
