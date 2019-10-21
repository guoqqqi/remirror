<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [multishift](./multishift.md) &gt; [MultishiftState](./multishift.multishiftstate.md)

## MultishiftState interface

<b>Signature:</b>

```typescript
export interface MultishiftState<GItem = any> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [highlightedGroupEndIndex](./multishift.multishiftstate.highlightedgroupendindex.md) | <code>number &#124; undefined</code> | Marks the position as the end point for a new highlighted group. |
|  [highlightedGroupStartIndex](./multishift.multishiftstate.highlightedgroupstartindex.md) | <code>number</code> | Marks the position as the starting point for a new highlighted group. |
|  [highlightedIndexes](./multishift.multishiftstate.highlightedindexes.md) | <code>number[]</code> | Each index represents a position that is highlighted. This is to allow the selection of multiple items in one sweep.<!-- -->Examples are - Ctrl / Cmd click - toggle one position / or start a new highlight group - Shift click - add start or complete a new highlighted group - Click and drag - drag over multiple items to select each one - ArrowKey shift - Select multiple highlighted items |
|  [hoveredIndex](./multishift.multishiftstate.hoveredindex.md) | <code>number</code> | Marks the index of the currently hovered item. |
|  [inputValue](./multishift.multishiftstate.inputvalue.md) | <code>string</code> | This tracks the input value when filtering the items to insert. |
|  [isOpen](./multishift.multishiftstate.isopen.md) | <code>boolean</code> | Determines whether or not the menu items should be displayed. |
|  [jumpText](./multishift.multishiftstate.jumptext.md) | <code>string</code> | This tracks the text typed when no input is available for filtering.<!-- -->It allows the implementation of quick jump to item functionality. |
|  [selectedItems](./multishift.multishiftstate.selecteditems.md) | <code>GItem[]</code> | Contains all the selected items.<!-- -->When <code>multiple</code> selection is enabled this can contain more than one item. |
