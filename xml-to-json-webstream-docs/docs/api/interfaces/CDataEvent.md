# Interface: CDataEvent

The text of a `<![CDATA[` block. Since `<![CDATA[` blocks can get quite large, this event may fire multiple times for a single block, if it is broken up into multiple write()s.

## Properties

### event

> **event**: `"cdata"`

#### Defined in

[index.ts:86](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/fd588757886c9248e940517cc56136cf677a6ed7/src/index.ts#L86)

***

### payload

> **payload**: `string`

the string of random character data.

#### Defined in

[index.ts:88](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/fd588757886c9248e940517cc56136cf677a6ed7/src/index.ts#L88)
