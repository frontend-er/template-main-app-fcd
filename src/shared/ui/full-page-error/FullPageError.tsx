import { FullPageWrapper } from '../full-page-wrapper';
import { FullPageErrorStyle } from './styled';

type FullPageErrorProps = {
  error: any;
};

export function FullPageError(props: FullPageErrorProps) {
  const { error } = props;

  return (
    <FullPageWrapper>
      <FullPageErrorStyle>
        <div className="container">
          <h1 className="logo-font">Something went wrong:</h1>
          <ul className="error-messages">{error?.message}</ul>
        </div>
      </FullPageErrorStyle>
    </FullPageWrapper>
  );
}
