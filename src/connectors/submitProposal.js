import { connect } from "react-redux";
import * as sel from "../selectors";
import * as act from "../actions";

const submitProposalConnector = connect(
  sel.selectorMap({
    loggedInAsEmail: sel.loggedInAsEmail,
    userCanExecuteActions: sel.userCanExecuteActions,
    policy: sel.policy,
    userid: sel.userid,
    username: sel.loggedInAsUsername,
    keyMismatch: sel.getKeyMismatch,
    proposalCredits: sel.proposalCredits
  }),
  {
    onFetchData: act.onGetPolicy,
    openModal: act.openModal,
    onResetProposal: act.onResetProposal,
    onSaveDraft: act.onSaveDraftProposal,
    onDeleteDraft: act.onDeleteDraftProposal
  }
);

export default submitProposalConnector;
