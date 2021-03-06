import React, { Component } from "react";
import { autobind } from "core-decorators";
import UserDetailPage from "./Page";
import userConnector from "../../connectors/user";
import {
  USER_DETAIL_TAB_GENERAL,
  USER_DETAIL_TAB_PREFERENCES,
  USER_DETAIL_TAB_PROPOSALS
} from "../../constants";
import {
  setQueryStringValue,
  getQueryStringValue
} from "../../lib/queryString";

const userDetailOptions = [
  {
    label: "general",
    value: USER_DETAIL_TAB_GENERAL
  },
  {
    label: "preferences",
    value: USER_DETAIL_TAB_PREFERENCES
  },
  {
    label: "proposals",
    value: USER_DETAIL_TAB_PROPOSALS
  }
];

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: this.handleUpdateFilterValueForQueryValue(props)
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.handleUpdateQueryForFilterValueChange(prevState);
    this.handleFetchingOfProposalData(prevProps);
  }

  handleFetchingOfProposalData = prevProps => {
    const emailFetched =
      !prevProps.loggedInAsEmail && this.props.loggedInAsEmail;
    const userFetched = !prevProps.user && this.props.user;

    if ((emailFetched || userFetched) && !this.props.isCMS) {
      this.props.onFetchUserProposals(this.props.userId);
      this.props.onFetchProposalsVoteStatus();
    }
  };

  handleUpdateFilterValueForQueryValue = () => {
    const tab = getQueryStringValue("tab");
    const validTabOption = userDetailOptions.find(op => op.label === tab);
    return validTabOption ? validTabOption.value : USER_DETAIL_TAB_GENERAL;
  };
  handleUpdateQueryForFilterValueChange = prevState => {
    const filterValueTabHasChanged = prevState.tabId !== this.state.tabId;
    const selectedOption = userDetailOptions.find(
      op => op.value === this.state.tabId
    );
    filterValueTabHasChanged &&
      setQueryStringValue("tab", selectedOption.label);
  };

  componentDidMount() {
    this.props.onFetchData(this.props.userId);
    !this.props.isCMS && this.props.onFetchUserProposals(this.props.userId);
    !this.props.isCMS && this.props.onFetchProposalsVoteStatus();
  }

  onTabChange(tabId) {
    this.setState({ tabId: tabId });
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  render() {
    const { isTestnet } = this.props;
    const bitumdataTxUrl = isTestnet
      ? "https://testnet.bitum.io/tx/"
      : "https://explorer.bitum.io/tx/";

    return (
      <UserDetailPage
        {...{
          ...this.props,
          bitumdataTxUrl,
          tabId: this.state.tabId,
          onTabChange: this.onTabChange
        }}
      />
    );
  }
}

autobind(UserDetail);

export default userConnector(UserDetail);
