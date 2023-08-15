import { Text as BaseText } from 'slate';

import escapeHTML from 'escape-html';

type Image = {
  url: string;
  alt: string;
}

type Text = BaseText & {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

type Leaf = {
  type: string;
  url?: string;
  value?: Image;
  children?: (Leaf | Text)[];
};

type RichTextProps = JSX.IntrinsicElements['div'] & {
  content: Leaf[];
};

const handleText = (node: Text, index: number) => {
  const inner = node.text;

  if (node.bold) {
    return <strong key={index}>{inner}</strong>;
  }

  if (node.code) {
    return <code key={index}>{inner}</code>
  }

  if (node.italic) {
    return <em key={index}>{inner}</em>;
  }

  if (node.underline) {
    return (
      <span key={index} style={{ textDecoration: 'underline' }}>
        {inner}
      </span>
    )
  }

  if (node.strikethrough) {
    return (
      <span key={index} style={{ textDecoration: 'line-through' }}>
        {inner}
      </span>
    )
  }

  return <span key={index}>{inner}</span>;
}

const handleElement = (node: Leaf, index: number) => {
  if (node.type === 'h1') {
    return <h1 key={index}>{serialize(node.children)}</h1>;
  }
  if (node.type === 'h2') {
    return <h2 key={index}>{serialize(node.children)}</h2>;
  }
  if (node.type === 'h3') {
    return <h3 key={index}>{serialize(node.children)}</h3>;
  }
  if (node.type === 'h4') {
    return <h4 key={index}>{serialize(node.children)}</h4>;
  }
  if (node.type === 'h5') {
    return <h5 key={index}>{serialize(node.children)}</h5>;
  }
  if (node.type === 'h6') {
    return <h6 key={index}>{serialize(node.children)}</h6>;
  }
  if (node.type === 'quote') {
    return <blockquote key={index}>{serialize(node.children)}</blockquote>
  }
  if (node.type === 'ul') {
    return <ul key={index}>{serialize(node.children)}</ul>;
  }
  if (node.type === 'ol') {
    return <ol key={index}>{serialize(node.children)}</ol>;
  }
  if (node.type === 'li') {
    return <li key={index}>{serialize(node.children)}</li>;
  }
  if (node.type === 'link') {
    return (
      <a key={index} href={escapeHTML(node.url)}>
        {serialize(node.children)}
      </a>
    );
  }

  return <p key={index}>{serialize(node.children)}</p>;
}

const serialize = (children?: (Leaf | Text)[]) => {
  if (children === undefined) {
    return null;
  }
  
  const nodes = children
    .map((node, index) => BaseText.isText(node)
      ? handleText(node, index)
      : handleElement(node, index));

  return nodes;
}

const RichText = ({ className, content }: RichTextProps) => {
  if (!content) {
    return null;
  }

  return <div className={className}>{serialize(content)}</div>;
};

export { RichText };
