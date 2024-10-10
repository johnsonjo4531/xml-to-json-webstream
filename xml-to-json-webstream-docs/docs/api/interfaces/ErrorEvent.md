# Interface: ErrorEvent

Indication that something bad happened. The error will be hanging out on parser.error, and must be deleted before parsing can continue. By listening to this event, you can keep an eye on that kind of stuff. Note: this happens much more in strict mode.

## Properties

### event

> **event**: `"error"`

#### Defined in

index.ts:5

***

### payload

> **payload**: `Error`

instance of Error.

#### Defined in

index.ts:7
