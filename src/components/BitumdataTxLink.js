import React from "react";

const BitumdataTxLink = ({ isTestnet, txId, isTxId }) => {
  const network = isTestnet ? "testnet" : "explorer";
  return !isTxId ? (
    <span>{txId}</span>
  ) : (
    <a
      href={`https://${network}.bitum.io/tx/${txId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {txId}
    </a>
  );
};

export default BitumdataTxLink;
