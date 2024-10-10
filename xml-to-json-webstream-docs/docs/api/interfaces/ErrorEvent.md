# Interface: ErrorEvent

Indication that something bad happened. The error will be hanging out on parser.error, and must be deleted before parsing can continue. By listening to this event, you can keep an eye on that kind of stuff. Note: this happens much more in strict mode.

## Properties

### event

> **event**: `"error"`

#### Defined in

[index.ts:5](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L5)

***

### payload

> **payload**: `Error`

instance of Error.

#### Defined in

[index.ts:7](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L7)
