import ReactDOM from 'react-dom/client';
import { Provider } from '~app/providers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider />,
);
