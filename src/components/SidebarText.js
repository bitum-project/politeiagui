import React from "react";
import Markdown from "./snew/Markdown";
import modalConnector from "../connectors/modal";
import PaywallAlert from "./Paywall/PaywallAlert";
import UserBadge from "./UserBadge";

const aboutText = `
# About Politeia

Bitum is an autonomous digital currency. With a hybrid consensus system,
it is built to be a decentralized, sustainable, and self-ruling currency
where stakeholders make the rules.

Politeia (Pi) is a censorship-resistant blockchain-anchored public proposal
system, which empowers users to submit their own projects for self-funding
from BITUM's block subsidy. Pi ensures the ecosystem remains sustainable and
thrives.

[Learn More about Politeia](https://docs.bitum.io/governance/politeia/politeia/)
`;

const resourcesText = `
## Resources

 * [Website](https://bitum.io/) & [Blog](https://blog.bitum.io/)
 * [Politeia blog post](https://blog.bitum.io/2017/10/25/Politeia/)
 * [Bitum Constitution](https://docs.bitum.io/getting-started/constitution/)
 * [Whitepaper/Technical Brief (pdf)](https://bitum.io/dtb001.pdf)
 * [Documentation](https://docs.bitum.io/)
 * [Getting Started](https://bitum.io/#guide)
 * [Source Code on Github](https://github.com/bitum-project/)
 * [Network Status](https://stats.bitum.io/) & [Block Explorer](https://mainnet.bitum.io/)
 * [Voting Status](https://voting.bitum.io/)
 * [Downloads Overview](https://bitum.io/downloads/)
`;

const SidebarText = props => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <UserBadge />
    <PaywallAlert />
    <Markdown
      body={aboutText}
      filterXss={false}
      confirmWithModal={null}
      displayExternalLikWarning={false}
      {...props}
    />
    <Markdown
      body={resourcesText}
      filterXss={false}
      displayExternalLikWarning={false}
      {...props}
    />
  </div>
);
export default modalConnector(SidebarText);
