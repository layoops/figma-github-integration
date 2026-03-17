import { useParams } from '@tanstack/react-router';

import { ProjectsTable } from '@/entities/project';
import { useGitHubRepoProjects } from '@/entities/repository';
import { Loader } from '@/shared/ui';

export const RepoProjectsPage = () => {
  const { id } = useParams({ from: '/_layout/_protected/repo/$id' });

  const { data, isLoading } = useGitHubRepoProjects({ repoId: id });

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <ProjectsTable projects={data?.projectsV2.nodes} />}
    </>
  );
};
