import { useParams } from 'react-router-dom';
import { jobApi } from '~entities/job';
import { Job } from '~entities/job/api/jobApi';
import { FullPageWrapper } from '~shared/ui/full-page-wrapper';

export function JobPage() {
  const { slug } = useParams();

  const {
    data: job,
    isLoading,
    isError,
  } = jobApi.useJob(slug!);

  if (isLoading)
    return (
      <FullPageWrapper>
        Loading
      </FullPageWrapper>
    );

  if (isError)
    return (
      <FullPageWrapper>
        Error
      </FullPageWrapper>
    );

  // @ts-ignore
  const { body, tagList }: Job = job;

  return (
    <div className="job-page">
      <div className="container page">
        <div className="row job-content">
          <div className="col-md-12">
            <div>
              <p>{body}</p>
            </div>
            <ul className="tag-list">
              {tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
