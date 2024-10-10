# Interface: SGMLDeclarationEvent

## Properties

### event

> **event**: `"sgmldeclaration"`

Random SGML declarations. Stuff like `<!ENTITY p>` would trigger this kind of event. This is a weird thing to support, so it might go away at some point. SAX isn't intended to be used to parse SGML, after all.

#### Defined in

index.ts:31

***

### payload

> **payload**: `string`

#### Defined in

index.ts:32
