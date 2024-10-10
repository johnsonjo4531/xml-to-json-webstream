# Interface: OpenTagStartEvent

## Properties

### event

> **event**: `"opentagstart"`

Emitted immediately when the tag name is available, but before any attributes are encountered.

#### Defined in

[index.ts:37](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L37)

***

### payload

> **payload**: `object`

object with a name field and an empty attributes set. Note that this is the same object that will later be emitted in the opentag event.

#### attributes

> **attributes**: `Record`\<`string`, `string`\>

#### isSelfClosing

> **isSelfClosing**: `boolean`

#### name

> **name**: `string`

#### Defined in

[index.ts:39](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L39)
