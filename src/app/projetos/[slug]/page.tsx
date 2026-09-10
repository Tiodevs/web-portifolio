import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { CASE_REDIRECTS, cases, getCaseBySlug } from '@/data/cases';
import { CaseStudyView } from '@/components/CaseStudy/CaseStudy';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) {
    return { title: 'Projeto não encontrado' };
  }
  return {
    title: `${item.title} — ${item.company}`,
    description: item.summary,
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const redirected = CASE_REDIRECTS[slug];
  if (redirected) {
    redirect(`/projetos/${redirected}`);
  }

  const item = getCaseBySlug(slug);
  if (!item) {
    notFound();
  }

  return <CaseStudyView item={item} />;
}
