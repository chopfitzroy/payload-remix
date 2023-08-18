import type { Page } from 'cms';

import { components } from '.';

type Props = {
  layout: Page['layout'];
};

export const RenderBlocks = ({ layout }: Props) => (
  <div className="block">
    {layout.map((block, i) => {
      const Block = components[block.blockType];

      if (Block) {
        return (
          <section key={i}>
            <Block {...block} />
          </section>
        );
      }

      return null;
    })}
  </div>
);
