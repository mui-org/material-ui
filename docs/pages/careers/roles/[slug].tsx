import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { MarkdownElement } from '@mui/internal-core-docs/MarkdownDocs';
import rolesData from 'docs/data/careers/roles.json';
import TopLayoutCareers from 'docs/src/modules/components/TopLayoutCareers';

interface CareerJob {
  id: string;
  title: string;
  description: string;
  summary: string;
  applicationUrl: string;
}

const categories: { roles: CareerJob[] }[] = [...rolesData.roles, ...rolesData.futureRoles];
const jobs = categories.flatMap((category) => category.roles);

export function getStaticPaths() {
  return {
    paths: jobs.map((job) => ({ params: { slug: job.id } })),
    fallback: false,
  };
}

export function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const job = jobs.find((posting) => posting.id === params?.slug);
  if (!job) {
    return { notFound: true as const };
  }

  return { props: { job } };
}

export default function CareerRole({ job }: InferGetStaticPropsType<typeof getStaticProps>) {
  const docs = {
    en: {
      title: job.title,
      description: job.summary || 'Explore this career opportunity and apply to join the MUI team.',
      rendered: [],
    },
  };

  return (
    <TopLayoutCareers docs={docs}>
      <MarkdownElement>
        <h1>{job.title}</h1>
        {/* eslint-disable-next-line react/no-danger -- Render the HTML description supplied by the careers API. */}
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
        <p>
          <a href={job.applicationUrl}>Apply now for this position 📮</a>
        </p>
      </MarkdownElement>
    </TopLayoutCareers>
  );
}
