# Interface: CloseTagEvent

## Properties

### event

> **event**: `"closetag"`

A closing tag. In loose mode, tags are auto-closed if their parent closes. In strict mode, well-formedness is enforced. Note that self-closing tags will have closeTag emitted immediately after openTag.

#### Defined in

index.ts:59

***

### payload

> **payload**: `string`

tag name

#### Defined in

index.ts:61
