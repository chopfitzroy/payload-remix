import type { V2_MetaFunction } from '@remix-run/node';
import { useMatches, useParams } from '@remix-run/react';
import { RenderBlocks } from '~/components/Blocks';
import type { RootLoaderData } from '~/root';
import { findPageBySlug } from '~/utils';

export const meta: V2_MetaFunction = ({ params, matches }) => {
  const { page: pageSlug = 'home' } = params;

  const page = findPageBySlug(pageSlug, matches);

  if (page === undefined) {
    return [];
  }

  const { title, keywords, description } = page.meta;

  return [
    {
      title,
    },
    {
      description,
    },
    {
      keywords,
    }
  ];
};

export default function Page() {
  const { page: pageSlug = 'home' } = useParams();

  const [{ data }] = useMatches();
  const { pages } = data as RootLoaderData;

  const page = findPageBySlug(pageSlug, pages);

  return (
    <main className="page-content container">
      {page?.layout ? (
        <RenderBlocks layout={page.layout} />
      ) : (
        'This page seem to be empty'
      )}
    </main>
  );
}
