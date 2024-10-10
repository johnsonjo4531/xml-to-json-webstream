# Interface: SGMLDeclarationEvent

## Properties

### event

> **event**: `"sgmldeclaration"`

Random SGML declarations. Stuff like `<!ENTITY p>` would trigger this kind of event. This is a weird thing to support, so it might go away at some point. SAX isn't intended to be used to parse SGML, after all.

#### Defined in

[index.ts:31](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L31)

***

### payload

> **payload**: `string`

#### Defined in

[index.ts:32](https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L32)
