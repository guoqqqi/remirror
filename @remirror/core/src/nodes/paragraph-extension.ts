import { setBlockType } from 'prosemirror-commands';

import { NodeGroup, Tag } from '@remirror/core-constants';
import { object } from '@remirror/core-helpers';
import { ProsemirrorAttributes } from '@remirror/core-types';
import { convertCommand } from '@remirror/core-utils';

import { ExtensionFactory } from '../extension';
import { ALIGN_PATTERN, INDENT_ATTRIBUTE, INDENT_LEVELS, IndentLevels } from './node-constants';
import { marginToIndent } from './node-utils';

export interface ParagraphExtensionSettings {
  /**
   * The attribute to use to store the value of the current indentation level.
   */
  indentAttribute?: string;

  /**
   * The levels of indentation supported - should be a tuple with the lowest value first and
   * the max indent last.
   *
   * @defaultValue `[0,7]`
   */
  indentLevels?: IndentLevels;
}

/**
 * The possible values for text alignment.
 */
export type TextAlignment = 'left' | 'right' | 'center' | 'justify';

export type ParagraphExtensionAttributes = ProsemirrorAttributes<{
  /**
   * The alignment of the text
   */
  align?: TextAlignment | null;

  /**
   * The indentation number.
   */
  indent?: number | null;

  /**
   * The line spacing for the paragraph.
   */
  lineSpacing?: string | null;

  /**
   * The element id (rarely used).
   */
  id?: string | null;
}>;

/**
 * Pull the paragraph attributes from the dom element.
 */
const getAttributes = (
  { indentAttribute, indentLevels }: Required<ParagraphExtensionSettings>,
  dom: HTMLElement,
) => {
  const { lineHeight, textAlign, marginLeft } = dom.style;
  let align: string | undefined = dom.getAttribute('align') ?? (textAlign || '');
  let indent = Number.parseInt(dom.getAttribute(indentAttribute) ?? '0', 10);

  align = ALIGN_PATTERN.test(align) ? align : undefined;

  if (!indent && marginLeft) {
    indent = marginToIndent(marginLeft);
  }

  indent = indent || indentLevels[0];

  const lineSpacing = lineHeight ? lineHeight : undefined;
  const id = dom.getAttribute('id') ?? undefined;

  return { align, indent, lineSpacing, id } as ParagraphExtensionAttributes;
};

/**
 * The paragraph is one of the essential building blocks for a prosemirror
 * editor and by default it is provided to all editors.
 *
 * @builtin
 */
export const ParagraphExtension = ExtensionFactory.typed<ParagraphExtensionSettings>().node({
  name: 'paragraph',
  tags: [Tag.LastNodeCompatible],
  defaultSettings: {
    indentAttribute: INDENT_ATTRIBUTE,
    indentLevels: INDENT_LEVELS,
  },
  createNodeSchema(parameter) {
    const { createExtraAttributes, getExtraAttributes, settings } = parameter;

    return {
      content: 'inline*',
      group: NodeGroup.Block,
      attrs: {
        ...createExtraAttributes({ fallback: null }),
        align: { default: null },
        id: { default: null },
        indent: { default: 0 },
        lineSpacing: { default: null },
      },
      draggable: false,
      parseDOM: [
        {
          tag: 'p',
          getAttrs: (node) => ({
            ...getExtraAttributes(node as HTMLElement),
            ...getAttributes(settings, node as HTMLElement),
          }),
        },
      ],
      toDOM: (node) => {
        const { align, indent, lineSpacing, id } = node.attrs as ParagraphExtensionAttributes;
        const attributes: Record<string, string> = object();
        let style = '';

        if (align && align !== 'left') {
          style += `text-align: ${align};`;
        }

        if (lineSpacing) {
          style += `line-height: ${lineSpacing};`;
        }

        if (style) {
          attributes.style = style;
        }

        if (indent) {
          attributes[INDENT_ATTRIBUTE] = String(indent);
        }

        if (id) {
          attributes.id = id;
        }

        return ['p', attributes, 0];
      },
    };
  },

  /**
   * Provides the commands that this extension uses.
   */
  createCommands({ type }) {
    return {
      createParagraph: (attributes: ParagraphExtensionAttributes) => {
        return convertCommand(setBlockType(type, attributes));
      },
    };
  },
});