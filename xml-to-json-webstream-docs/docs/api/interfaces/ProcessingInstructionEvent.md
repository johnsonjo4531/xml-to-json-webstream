# Interface: ProcessingInstructionEvent

Stuff like `<?xml foo="blerg" ?>`.

## Properties

### event

> **event**: `"processinginstruction"`

#### Defined in

[index.ts:24](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L24)

***

### payload

> **payload**: `object`

object with name and body members. Attributes are not parsed, as processing instructions have implementation dependent semantics.

#### body

> **body**: `string`

#### name

> **name**: `string`

#### Defined in

[index.ts:26](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L26)
