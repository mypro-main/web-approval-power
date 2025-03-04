import { Helmet } from 'react-helmet-async';
import { ApprovalView } from './view/approval-view';

export default function Approval() {
  return (
    <>
      <Helmet>
        <title>Approval</title>
      </Helmet>

      <ApprovalView />
    </>
  );
}
