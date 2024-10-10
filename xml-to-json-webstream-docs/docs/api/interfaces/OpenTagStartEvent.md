# Interface: OpenTagStartEvent

## Properties

### event

> **event**: `"opentagstart"`

Emitted immediately when the tag name is available, but before any attributes are encountered.

#### Defined in

index.ts:37

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

index.ts:39
