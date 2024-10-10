# Interface: ProcessingInstructionEvent

Stuff like `<?xml foo="blerg" ?>`.

## Properties

### event

> **event**: `"processinginstruction"`

#### Defined in

index.ts:24

***

### payload

> **payload**: `object`

object with name and body members. Attributes are not parsed, as processing instructions have implementation dependent semantics.

#### body

> **body**: `string`

#### name

> **name**: `string`

#### Defined in

index.ts:26
