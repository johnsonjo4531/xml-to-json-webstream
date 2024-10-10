import { SAXParser } from "sax-ts";

/** Indication that something bad happened. The error will be hanging out on parser.error, and must be deleted before parsing can continue. By listening to this event, you can keep an eye on that kind of stuff. Note: this happens much more in strict mode. */
export interface ErrorEvent {
  event: "error";
  /** instance of Error. */
  payload: Error;
}

/** Text node. */
export interface TextEvent {
  event: "text";
  payload: string;
}

/** The `<!DOCTYPE` declaration. */
export interface DocTypeEvent {
  event: "doctype";
  payload: string;
}

/** Stuff like `<?xml foo="blerg" ?>`. */
export interface ProcessingInstructionEvent {
  event: "processinginstruction";
  /** object with name and body members. Attributes are not parsed, as processing instructions have implementation dependent semantics. */
  payload: { name: string; body: string };
}

export interface SGMLDeclarationEvent {
  /** Random SGML declarations. Stuff like `<!ENTITY p>` would trigger this kind of event. This is a weird thing to support, so it might go away at some point. SAX isn't intended to be used to parse SGML, after all. */
  event: "sgmldeclaration";
  payload: string;
}

export interface OpenTagStartEvent {
  /** Emitted immediately when the tag name is available, but before any attributes are encountered. */
  event: "opentagstart";
  /** object with a name field and an empty attributes set. Note that this is the same object that will later be emitted in the opentag event. */
  payload: {
    name: string;
    attributes: Record<string, string>;
    isSelfClosing: boolean;
  };
}

/**  An opening tag */
export interface OpenTagEvent {
  event: "opentag";
  /** object with name and attributes. In non-strict mode, tag names are uppercased, unless the lowercase option is set. If the xmlns option is set, then it will contain namespace binding information on the ns member, and will have a local, prefix, and uri member. */
  payload: {
    name: string;
    attributes: Record<string, string>;
    isSelfClosing: boolean;
  };
}

export interface CloseTagEvent {
  /** A closing tag. In loose mode, tags are auto-closed if their parent closes. In strict mode, well-formedness is enforced. Note that self-closing tags will have closeTag emitted immediately after openTag. */
  event: "closetag";
  /** tag name */
  payload: string;
}

/** An attribute node. */
export interface AttributeEvent {
  event: "attribute";
  /** object with name and value. In non-strict mode, attribute names are in upper-case, unless the lowercase option is set. If the xmlns option is set, it will also contains namespace information. */
  payload: { name: string; value: string };
}

/** A comment node. */
export interface CommentEvent {
  event: "comment";
  /**  the string of the comment. */
  payload: string;
}

/**  The opening tag of a `<![CDATA[` block. */
export interface OpenCDataEvent {
  event: "opencdata";
  payload: [];
}

/** The text of a `<![CDATA[` block. Since `<![CDATA[` blocks can get quite large, this event may fire multiple times for a single block, if it is broken up into multiple write()s. */
export interface CDataEvent {
  event: "cdata";
  /** the string of random character data. */
  payload: string;
}

/** The closing tag (]]>) of a `<![CDATA[` block. */
export interface CloseCDataEvent {
  event: "closecdata";
  payload: string;
}

/** If the xmlns option is set, then this event will signal the start of a new namespace binding. */
export interface OpenNamespaceEvent {
  event: "opennamespace";
  payload: { prefix: string; uri: string };
}

/** If the xmlns option is set, then this event will signal the end of a namespace binding. */
export interface CloseNamepsaceEvent {
  event: "closenamespace";
  payload: { prefix: string; uri: string };
}

/** In non-strict mode, `<script>` tags trigger a "script" event, and their contents are not checked for special xml characters. If you pass noscript: true, then this behavior is suppressed. */
export interface NoScriptEvent {
  event: "noscript";
  payload: unknown;
}

export type Events =
  | ErrorEvent
  | TextEvent
  | DocTypeEvent
  | ProcessingInstructionEvent
  | SGMLDeclarationEvent
  | OpenTagStartEvent
  | OpenTagEvent
  | CloseTagEvent
  | AttributeEvent
  | CommentEvent
  | OpenCDataEvent
  | CDataEvent
  | CloseCDataEvent
  | OpenNamespaceEvent
  | CloseNamepsaceEvent
  | NoScriptEvent;

export type Event<Event extends Events["event"]> = Events & {
  event: Event;
};

export type EventPayload<MyEvent extends Events["event"]> = Event<
  MyEvent
>["payload"];

function possibleBytesToString<Bytes extends BytesType>(
  str: StreamTypeFromBytesType<Bytes>,
  textDecoder = new TextDecoder(),
): string {
  return typeof str === "string" ? str : textDecoder.decode(str);
}

type BytesType = false | "uint8";
type StreamTypeFromBytesType<Bytes extends BytesType> = Bytes extends "uint8"
  ? Uint8Array
  : string;

/**
 * @param options
 * @returns A through stream that can be async iterated. Will emit data from any of the events that are listened to in the form `{event: "event-name", payload: "event-data" }` where "event-name" and "event-data" are the event's name and data.
 */
export function streamingSAX<EventsToListen extends Events["event"][]>({
  saxOptions = {},
  events,
  continueOnError = false,
}: {
  /** The Sax Events to listen to. */
  events: EventsToListen;
  /** Continues on error when true. The default of the sax parser is to stop on error pass true to instead continue on error. */
  continueOnError?: boolean;
  /** Object bag of settings regarding string formatting. All default to false. */
  saxOptions?: {
    /** When true enables "unforgiving" mode. */
    strict?: boolean;
    /** Whether or not to trim text and comment nodes. */
    trim?: boolean;
    /** If true, then turn any whitespace into a single space. */
    normalize?: boolean;
    /** If true, then lowercase tag names and attribute names in loose mode, rather than uppercasing them. */
    lowercase?: boolean;
    /** If true, then namespaces are supported. */
    xmlns?: boolean;
    /** If true, then track line/col/position */
    position?: boolean;
    /**  If true, only parse predefined XML entities (&amp;, &apos;, &gt;, &lt;, and &quot;) */
    strictEntities?: boolean;
  };
}) {
  let parser: null | SAXParser = null;
  const textDecoder = new TextDecoder();
  const transform = new TransformStream<
    StreamTypeFromBytesType<BytesType>,
    Event<EventsToListen[number]>
  >({
    start(controller) {
      const { strict, ...opts } = saxOptions;
      parser = new SAXParser(strict ?? false, opts);

      const ERROR_EVENT = "error" as const;
      if (continueOnError && events.includes(ERROR_EVENT)) {
        parser.onerror = (payload: EventPayload<typeof ERROR_EVENT>) => {
          const queueableEvent = {
            event: ERROR_EVENT,
            payload,
          } as Event<typeof ERROR_EVENT>;
          controller.enqueue(queueableEvent);
          parser?.resume();
        };
        events = events.filter((x) => x === ERROR_EVENT) as EventsToListen;
      } else if (continueOnError) {
        parser.onerror = () => {
          parser?.resume();
        };
      }

      for (const event of events) {
        parser[`on${event}`] = (payload: EventPayload<typeof event>) => {
          const queueableEvent = {
            event,
            payload,
          } as Event<typeof event>;
          controller.enqueue(queueableEvent);
        };
      }

      // parser.onend = () => {
      //   controller.terminate();
      // };
    },
    transform(chunk) {
      parser?.write(possibleBytesToString(chunk, textDecoder));
    },
  });
  return transform;
}

type XMLNodeText = { type: "text"; value: string };
type XMLElement = {
  type: "element";
  name: string;
  parent: XMLElement | null;
  attributes?: Record<string, string>;
  children?: XMLNodes[];
};
type XMLNodes = XMLNodeText | XMLElement;

/** An empty element */
type JSONValueEmpty = null;
/** An element with pure text content */
type JSONValueText = string;
/** an empty element with attributes */
type JSONValueAttributeElement = { [attributes: `@${string}`]: string };
/** an element with pure text content and attributes */
type JSONValueTextAttributeElement = {
  "#text": string;
  [attributes: `@${string}`]: string;
};
/** an element containing elements with different or same names */
type JSONValueElementSubElements = {
  [subElements in SubElementKey<string>]: JSONValues | JSONValues[];
};
/** an element containing elements with different or same names */
type JSONValueElementTextSubElements =
  & { "#text": string }
  & { [subElements in SubElementKey<string>]: JSONValues | JSONValues[] };
/** an element containing elements with different or same names */
type JSONValueElementTextAttributesSubElements = {
  "#text": string;
  [attributes: `@${string}`]: string;
} & { [subElements in SubElementKey<string>]: JSONValues | JSONValues[] };
type SubElementKey<T extends string> = T extends `@${string}` ? never : T;

type JSONPrimitives = JSONValueEmpty | JSONValueText;

type JSONValues =
  | JSONPrimitives
  | JSONValueAttributeElement
  | JSONValueTextAttributeElement
  | JSONValueElementSubElements
  | JSONValueElementTextSubElements
  | JSONValueElementTextAttributesSubElements;

export type JSONStates = Record<string, JSONValues>;

/** */
function xmlStateToJSON(data: XMLElement): JSONStates {
  return {
    [data.name]: data.children?.length === 0 && !data.attributes
      ? null
      : data.children?.length === 1 && data.children?.[0]?.type === "text"
      ? data.children?.[0]?.value ?? null
      : {
        ...Object.fromEntries(
          Object.entries(data.attributes ?? {}).map(([key, value]) =>
            [`@${key}`, value] as const
          ),
        ),
        ...("children" in data
          ? data.children?.reduce<Exclude<JSONValues, JSONPrimitives>>(
            (acc, el) =>
              el.type === "text"
                ? { ...acc, "#text": el.value ?? "" }
                : el.type === "element"
                ? el.name in acc
                  ? {
                    ...acc,
                    [el.name]: [
                      ...(Array.isArray(
                          (acc as Record<
                            string,
                            Exclude<JSONValues, JSONPrimitives> | Exclude<
                              JSONValues,
                              JSONPrimitives
                            >[]
                          >)[el.name],
                        )
                        ? (acc as Record<
                          string,
                          Exclude<JSONValues, JSONPrimitives>[]
                        >)[el.name]
                        : [
                          (acc as Record<
                            string,
                            Exclude<JSONValues, JSONPrimitives>
                          >)[el.name],
                        ]),
                      (xmlStateToJSON(el) as Record<
                        string,
                        Exclude<JSONValues, JSONPrimitives>
                      >)[el.name],
                    ],
                  } as Exclude<JSONValues, JSONPrimitives>
                  : { ...acc, ...xmlStateToJSON(el) } as Exclude<
                    JSONValues,
                    JSONPrimitives
                  >
                : acc,
            {},
          )
          : {}),
      },
  };
}

function* pathsToString(el: XMLElement) {
  let path: string[] = [];
  let ancestor: XMLElement | null = el;
  while (ancestor) {
    path = [ancestor.name, ...path];
    yield [path, ancestor] as const;
    ancestor = ancestor.parent;
  }
}

function* first<T>(iter: Iterable<T>): Generator<T> {
  for (const item of iter) {
    yield item;
    // This is intentional to get only one item.
    break;
  }
}

function checkNamePath(
  name: Set<string>,
  el: XMLElement,
  getAncestors = false,
) {
  for (
    const [path, ancestor] of getAncestors
      ? pathsToString(el)
      : first(pathsToString(el))
  ) {
    if (name.has(path.join("."))) {
      return true;
    }
  }
  return false;
}

/**
 * @param stream A ReadableStream of xml in string or Uint8Array format.
 * @param opts The following are the properties of opts.
 *
 * **emit** - decides which emit strategy to take. a string of value "leafs", "updating-root", "leafs-named", or "updating-named"..
 *
 * **name** - names to filter our XML by. only matters if emit is either "named-leaf" or "updated-named". It's value is either a string or string[].
 *
 * @tutorial
 * ## Emit Modes:
 *
 * The various emit modes defined. Each emit only happens when a closing xml tag is hit but
 * depending on the emit mode it may be the closing tag of a subelement.
 *
 * ### "updating-root"
 *
 * Emits the root xml element as json over and over slowly adding new items and subitems to it as they are parsed.
 *
 * @example
 *
 * import { streamXMLToJSON } from "../../index.ts";
 * import { getExampleData } from "../utils.ts";
 *
 * async function getTitle(stream: ReadableStream<Uint8Array | string>) {
 *     for await (
 *         const item of streamXMLToJSON(stream, {
 *             emit: "updating-root",
 *         })
 *     ) {
 *         if (item?.rss?.channel?.title) {
 *             return item?.rss?.channel?.title;
 *         }
 *     }
 *     return "";
 * }
 * const stream = await getExampleData(0);
 *
 * console.log(await getTitle(stream));
 *
 * @tutorial
 *
 * ### "updating-named"
 *
 * Alot like "updating-root" except you give it a specific name or path of the only items you want emitted.
 * Note that the path syntax does not care where the first element of the path exists in the xml
 * it will also treat all arrays as if their items were just objects and emit only those that match.
 *
 * @example
 * import { streamXMLToJSON } from "../../index.ts";
 * import { getExampleData } from "../utils.ts";
 * // Get just enough data about the channel and then output.
 * async function getChannel(
 *     stream: ReadableStream<string | Uint8Array>,
 * ) {
 *     // In rss entries are generally small so we can
 *     for await (
 *         const { channel } of streamXMLToJSON(stream, {
 *             emit: "updating-named",
 *             name: "channel",
 *         })
 *     ) {
 *         console.log(channel, channel.image);
 *         if (
 *             channel.title &&
 *             channel.image
 *         ) {
 *             return channel;
 *         }
 *     }
 * }
 * const stream = await getExampleData(0);
 * console.log(await getChannel(stream));
 *
 * @tutorial
 *
 * ### "leafs-named"
 *
 * Alot like "leafs", but uses the name option to emit only leaf nodes that either match an exact name or a path that will lead to that name.
 * Note that the path syntax does not care where the first element of the path exists in the xml
 * it will also treat all arrays as if their items were just objects and emit only those that match.
 *
 * @example
 *
 * import { streamXMLToJSON } from "../../index.ts";
 * import { getExampleData } from "../utils.ts";
 *
 * async function* getChannelImage(
 *     stream: ReadableStream<string | Uint8Array>,
 * ) {
 *     for await (
 *         const { image, ["itunes:image"]: itunesImage } of streamXMLToJSON<
 *             {
 *                 image?: {
 *                     link?: string;
 *                     url?: string;
 *                     title?: string;
 *                     description?: string;
 *                 };
 *                 ["itunes:image"]?: { "@href"?: string };
 *             }
 *         >(
 *             stream,
 *             {
 *                 emit: "leafs-named",
 *                 // Get the channel's image or itunes:image
 *                 name: ["channel.image", "channel.itunes:image"],
 *             },
 *         )
 *     ) {
 *         yield { image, itunesImage } as const;
 *     }
 * }
 * const stream = await getExampleData(0);
 * for await (const item of getChannelImage(stream)) {
 *     console.log(item.image ?? item.itunesImage);
 * }
 *
 * @tutorial
 * ### "leafs"
 *
 * The most verbose of all options and probably not what you want, but get's any and all combinations of parts and pieces of json possible using breadth first search.
 * Basically walks the whole XML tree and emits JSON as it goes.
 *
 * @example
 * import { streamXMLToJSON } from "../../index.ts";
 * import { getExampleData } from "../utils.ts";
 *
 * async function getRSSTitle(stream: ReadableStream<Uint8Array | string>) {
 *    for await (
 *        const item of streamXMLToJSON(stream, {
 *            emit: "updating-root",
 *        })
 *    ) {
 *        if (item?.rss?.channel?.title) {
 *            return item?.rss?.channel?.title;
 *        }
 *    }
 *    return "";
 * }
 * const stream = await getExampleData(0);
 * console.log(await getTitle(stream));
 */
export async function* streamXMLToJSON<
  T extends JSONStates = Record<string, any>,
>(
  stream: ReadableStream<StreamTypeFromBytesType<BytesType>>,
  { ...opts }: {
    emit?: "leafs" | "updating-root";
    name?: never;
  } | {
    emit: "leafs-named" | "updating-named";
    name: string | string[];
  } = {},
): AsyncGenerator<T> {
  const { emit = "updating-root" } = opts;
  console.assert(
    ([
      "leafs",
      "updating-root",
      "leafs-named",
      "updating-named",
    ] as const satisfies NonNullable<(typeof opts)["emit"]>[]).includes(emit),
    "You provided an incorrect emit method please choose either 'leafs', 'root', or 'named'.",
  );
  const stack: XMLElement[] = [];
  let getAncestors = false;
  const names: string[] =
    typeof opts.name === "string" || Array.isArray(opts.name)
      ? [opts.name].flat(1)
      : [];
  if (names.some((x) => x.includes("."))) {
    getAncestors = true;
  }
  // Treat this as a read only set...
  const name_set = new Set(names);

  for await (
    const item of stream.pipeThrough(
      streamingSAX({
        saxOptions: {
          lowercase: true,
          trim: true,
        },
        events: ["opentag", "text", "cdata", "error", "closetag"],
      }),
    )
  ) {
    if (item.event === "error") {
      throw item.payload;
    }
    switch (item.event) {
      case "opentag": {
        const state: XMLElement = {
          type: "element",
          name: item.payload.name,
          parent: stack[stack.length - 1] ?? null,
          ...(Object.keys(item.payload.attributes).length > 0
            ? { attributes: item.payload.attributes }
            : {}),
        };
        if (state.parent) {
          const parentState = state.parent;
          if (parentState && !Array.isArray(parentState.children)) {
            parentState.children = [];
          }
          parentState?.children?.push(state);
        }
        stack.push(state);
        break;
      }
      case "text": {
        const parentState = stack[stack.length - 1];
        if (parentState && !Array.isArray(parentState.children)) {
          parentState.children = [];
        }
        parentState?.children?.push({
          type: "text",
          value: item.payload,
        });
        break;
      }
      case "cdata": {
        const parentState = stack[stack.length - 1];
        if (parentState && !Array.isArray(parentState.children)) {
          parentState.children = [];
        }
        parentState?.children?.push({
          type: "text",
          value: item.payload,
        });
        break;
      }
      case "closetag": {
        const state = stack.pop();
        if (state) {
          if (
            emit === "leafs" ||
            opts.emit === "leafs-named" &&
              checkNamePath(name_set, state, getAncestors)
          ) {
            yield xmlStateToJSON(state) as T;
          } else if (emit === "updating-root") {
            yield xmlStateToJSON(stack[0]) as T;
          }
          if (opts.emit === "updating-named") {
            // lookup all parents with names and emit them.
            let ancestor: XMLElement | null = state;
            while (ancestor) {
              if (checkNamePath(name_set, ancestor, getAncestors)) {
                yield xmlStateToJSON(ancestor) as T;
              }
              ancestor = ancestor.parent;
            }
          }
        }
        break;
      }
    }
  }
}
