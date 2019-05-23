import { TESTNET, EXPLORER } from "../constants";

const getSubdomainForBitumdata = isTestnet => (isTestnet ? TESTNET : EXPLORER);

const bitumdataURL = isTestnet =>
  `https://${getSubdomainForBitumdata(isTestnet)}.bitum.io/api`;

export const bitumddataBlockHeightURL = isTestnet =>
  `${bitumdataURL(isTestnet)}/block/best/height`;

const bitumdataAddressURL = (isTestnet, address) =>
  `${bitumdataURL(isTestnet)}/address/${address}/raw`;
const FAUCET_URL = "https://faucet.bitum.io/requestfaucet";

const POST = (path, params, method = "POST") => {
  let formBody = [];
  for (const key in params) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(params[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(path, {
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    method,
    body: formBody
  }).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  });
};

const getRawTransactions = url => {
  return fetch(url).then(r => {
    // work around when transactions are not paid and bitumdata api returns Unprocessable Entity
    if (r.statusText === "Unprocessable Entity") {
      return null;
    }
    return r.json();
  });
};

const addressFromTestnet = addr => addr[0] === "T";

export const getHeightByBitumdata = isTestnet =>
  getRawTransactions(bitumddataBlockHeightURL(isTestnet));

export const getPaymentsByAddressBitumdata = address => {
  const isTestnet = addressFromTestnet(address);
  return getRawTransactions(bitumdataAddressURL(isTestnet, address));
};

export const payWithFaucet = (address, amount) => {
  const data = {
    address,
    amount,
    json: true
  };

  return POST(FAUCET_URL, data);
};
