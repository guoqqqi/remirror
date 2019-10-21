<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@remirror/react](./react.md) &gt; [RemirrorProviderProps](./react.remirrorproviderprops.md)

## RemirrorProviderProps interface

<b>Signature:</b>

```typescript
export interface RemirrorProviderProps<GExtension extends AnyExtension = any> extends MakeOptional<Omit<RemirrorProps<GExtension>, 'children'>, keyof typeof defaultProps>, Pick<RemirrorContextProviderProps<GExtension>, 'childAsRoot'> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [children](./react.remirrorproviderprops.children.md) | <code>ReactElement</code> | All providers must have ONE child element. |
