import { Helmet } from 'react-helmet-async';
import { UserView } from './view/user-view';

export default function User() {
  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>

      <UserView />
    </>
  );
}
