# Interface: AttributeEvent

An attribute node.

## Properties

### event

> **event**: `"attribute"`

#### Defined in

[index.ts:66](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L66)

***

### payload

> **payload**: `object`

object with name and value. In non-strict mode, attribute names are in upper-case, unless the lowercase option is set. If the xmlns option is set, it will also contains namespace information.

#### name

> **name**: `string`

#### value

> **value**: `string`

#### Defined in

[index.ts:68](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L68)
