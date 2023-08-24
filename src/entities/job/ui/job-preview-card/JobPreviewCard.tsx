import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Job } from '../../api/jobApi';

type JobPreviewCardProps = {
  job: Job;
  meta?: ReactNode;
};

export function JobPreviewCard(props: JobPreviewCardProps) {
  const { job } = props;
  const { title, description, slug } = job;

  return (
    <div className="job-preview">
      Meta information
      <Link to={PATH_PAGE.job.slug(slug)} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}
