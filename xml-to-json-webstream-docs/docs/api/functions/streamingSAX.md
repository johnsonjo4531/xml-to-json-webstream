# Function: streamingSAX()

> **streamingSAX**\<`EventsToListen`\>(`options`): `TransformStream`\<`string` \| `Uint8Array`, [`Event`](../type-aliases/Event.md)\<`EventsToListen`\[`number`\]\>\>

## Type Parameters

• **EventsToListen** *extends* (`"error"` \| `"text"` \| `"doctype"` \| `"processinginstruction"` \| `"sgmldeclaration"` \| `"opentagstart"` \| `"opentag"` \| `"closetag"` \| `"attribute"` \| `"comment"` \| `"opencdata"` \| `"cdata"` \| `"closecdata"` \| `"opennamespace"` \| `"closenamespace"` \| `"noscript"`)[]

## Parameters

• **options**

• **options.continueOnError?**: `boolean` = `false`

Continues on error when true. The default of the sax parser is to stop on error pass true to instead continue on error.

• **options.events**: `EventsToListen`

The Sax Events to listen to.

• **options.saxOptions?** = `{}`

Object bag of settings regarding string formatting. All default to false.

• **options.saxOptions.lowercase?**: `boolean`

If true, then lowercase tag names and attribute names in loose mode, rather than uppercasing them.

• **options.saxOptions.normalize?**: `boolean`

If true, then turn any whitespace into a single space.

• **options.saxOptions.position?**: `boolean`

If true, then track line/col/position

• **options.saxOptions.strict?**: `boolean`

When true enables "unforgiving" mode.

• **options.saxOptions.strictEntities?**: `boolean`

If true, only parse predefined XML entities (&amp;, &apos;, &gt;, &lt;, and &quot;)

• **options.saxOptions.trim?**: `boolean`

Whether or not to trim text and comment nodes.

• **options.saxOptions.xmlns?**: `boolean`

If true, then namespaces are supported.

## Returns

`TransformStream`\<`string` \| `Uint8Array`, [`Event`](../type-aliases/Event.md)\<`EventsToListen`\[`number`\]\>\>

A through stream that can be async iterated. Will emit data from any of the events that are listened to in the form `{event: "event-name", payload: "event-data" }` where "event-name" and "event-data" are the event's name and data.

## Defined in

[index.ts:157](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/fd588757886c9248e940517cc56136cf677a6ed7/src/index.ts#L157)
