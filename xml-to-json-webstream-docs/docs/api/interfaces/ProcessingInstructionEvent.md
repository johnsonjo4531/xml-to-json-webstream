# Interface: ProcessingInstructionEvent

Stuff like `<?xml foo="blerg" ?>`.

## Properties

### event

> **event**: `"processinginstruction"`

#### Defined in

[index.ts:24](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/fd588757886c9248e940517cc56136cf677a6ed7/src/index.ts#L24)

***

### payload

> **payload**: `object`

object with name and body members. Attributes are not parsed, as processing instructions have implementation dependent semantics.

#### body

> **body**: `string`

#### name

> **name**: `string`

#### Defined in

[index.ts:26](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/fd588757886c9248e940517cc56136cf677a6ed7/src/index.ts#L26)
