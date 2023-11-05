import {
  Block,
  Inline,
  Text,
  BLOCKS,
  INLINES,
} from "@contentful/rich-text-types";
import { Divider, List, ListItem, Table, Typography } from "@mui/joy";
import BlockQuote from "../../BlockQuote";
import { ReactNode } from "react";
import PostContentTextNode from "./PostContentTextNode";
import InlineLink from "../../InlineLink";
import PostContentEmbeddedEntry from "./PostContentEmbeddedEntry";

const Tr = ({ children }: { children: ReactNode }) => <tr>{children}</tr>;
const Td = ({ children }: { children: ReactNode }) => <td>{children}</td>;
const Th = ({ children }: { children: ReactNode }) => <th>{children}</th>;

export default function PostContentNode({
  depth = 0,
  ...props
}: (Block | Text | Inline) & { depth?: number }) {
  const { nodeType } = props;
  let childProps: any = {};
  let Child: any = PostContentNode;
  let Element: any = Typography;

  switch (nodeType) {
    case BLOCKS.HEADING_1:
      childProps.level = "h1";
      break;
    case BLOCKS.HEADING_2:
      childProps.level = "h2";
      break;
    case BLOCKS.HEADING_3:
      childProps.level = "h3";
      break;
    case BLOCKS.HEADING_4:
      childProps.level = "h4";
      break;
    case BLOCKS.PARAGRAPH:
      break;
    case BLOCKS.QUOTE:
      Element = BlockQuote;
      break;
    case BLOCKS.UL_LIST:
      Element = List;
      childProps = { marker: "disc" };
      break;
    case BLOCKS.OL_LIST:
      Element = List;
      childProps = { marker: "decimal" };
      break;
    case BLOCKS.LIST_ITEM:
      Element = ListItem;
      break;
    case BLOCKS.HR:
      Element = Divider;
      childProps = { sx: { my: 4 } };
      break;
    case BLOCKS.TABLE_ROW:
      Element = Tr;
      break;
    case BLOCKS.TABLE_CELL:
      Element = Td;
      break;
    case BLOCKS.TABLE_HEADER_CELL:
      Element = Th;
      break;
    case INLINES.HYPERLINK:
      Element = InlineLink;
      childProps.href = props.data.uri;
      break;
    case "text": {
      Child = PostContentTextNode;
      break;
    }
  }

  if (nodeType === BLOCKS.EMBEDDED_ENTRY) {
    return <PostContentEmbeddedEntry {...props} />;
  } else if (nodeType === BLOCKS.TABLE) {
    const { content } = props as Block;
    const [headRow, ...rows] = content;
    return (
      <Table {...childProps}>
        <thead>
          <PostContentNode key={0} {...headRow} depth={depth + 1} />
        </thead>
        <tbody>
          {rows.map((props: any, index) => (
            <PostContentNode key={index + 1} {...props} depth={depth + 1} />
          ))}
        </tbody>
      </Table>
    );
  }

  let { content } = props as Block;
  if (!content) {
    content = [props as Block];
  }

  return (
    <Element {...childProps}>
      {content.map((props, index) => (
        <Child key={index} {...props} depth={depth + 1} />
      ))}
    </Element>
  );
}
