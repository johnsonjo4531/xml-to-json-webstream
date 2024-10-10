# Interface: CloseTagEvent

## Properties

### event

> **event**: `"closetag"`

A closing tag. In loose mode, tags are auto-closed if their parent closes. In strict mode, well-formedness is enforced. Note that self-closing tags will have closeTag emitted immediately after openTag.

#### Defined in

[index.ts:59](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L59)

***

### payload

> **payload**: `string`

tag name

#### Defined in

[index.ts:61](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L61)
