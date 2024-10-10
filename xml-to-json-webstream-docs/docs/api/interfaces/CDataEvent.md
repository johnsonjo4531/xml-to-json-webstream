# Interface: CDataEvent

The text of a `<![CDATA[` block. Since `<![CDATA[` blocks can get quite large, this event may fire multiple times for a single block, if it is broken up into multiple write()s.

## Properties

### event

> **event**: `"cdata"`

#### Defined in

index.ts:86

***

### payload

> **payload**: `string`

the string of random character data.

#### Defined in

index.ts:88
