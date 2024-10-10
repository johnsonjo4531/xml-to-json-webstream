# Interface: OpenTagEvent

An opening tag

## Properties

### event

> **event**: `"opentag"`

#### Defined in

index.ts:48

***

### payload

> **payload**: `object`

object with name and attributes. In non-strict mode, tag names are uppercased, unless the lowercase option is set. If the xmlns option is set, then it will contain namespace binding information on the ns member, and will have a local, prefix, and uri member.

#### attributes

> **attributes**: `Record`\<`string`, `string`\>

#### isSelfClosing

> **isSelfClosing**: `boolean`

#### name

> **name**: `string`

#### Defined in

index.ts:50
