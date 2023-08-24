import { ReactNode } from 'react';
import { FullPageWrapperStyle } from './styled';

type FullPageWrapperProps = {
  children: ReactNode;
};

export function FullPageWrapper(props: FullPageWrapperProps) {
  const { children } = props;

  return <FullPageWrapperStyle>{children}</FullPageWrapperStyle>;
}

