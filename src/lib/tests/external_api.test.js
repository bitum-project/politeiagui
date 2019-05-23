import fetchMock from "fetch-mock";
import * as ea from "../external_api";
import {
  assertGETOnRouteIsCalled,
  assertPOSTOnRouteIsCalled
} from "./support/helpers";
describe("test external api lib (lib/api.js)", () => {
  const FAKE_TESTNET_ADDRESS = "T_fake_address";
  const FAKE_MAINNET_ADDRESS = "M_fake_address";
  const bitumdataTestnetUrl = "https://testnet.bitum.io/api";
  const bitumdataExplorerUrl = "https://explorer.bitum.io/api";
  const faucetUrl = "https://faucet.bitum.io/requestfaucet";

  test("get height from bitumd data", async () => {
    await assertGETOnRouteIsCalled(
      `${bitumdataTestnetUrl}/block/best/height`,
      ea.getHeightByBitumdata,
      [true]
    );
    // console.log(fetchMock.spy());
    await assertGETOnRouteIsCalled(
      `${bitumdataExplorerUrl}/block/best/height`,
      ea.getHeightByBitumdata,
      [false]
    );
  });

  test("get payment by address from bitum data", async () => {
    fetchMock.restore();
    await assertGETOnRouteIsCalled(
      `${bitumdataTestnetUrl}/address/${FAKE_TESTNET_ADDRESS}/raw`,
      ea.getPaymentsByAddressBitumdata,
      [FAKE_TESTNET_ADDRESS]
    );
    await assertGETOnRouteIsCalled(
      `${bitumdataExplorerUrl}/address/${FAKE_MAINNET_ADDRESS}/raw`,
      ea.getPaymentsByAddressBitumdata,
      [FAKE_MAINNET_ADDRESS]
    );
  });

  test("pay with faucet", async () => {
    await assertPOSTOnRouteIsCalled(faucetUrl, ea.payWithFaucet, [
      FAKE_TESTNET_ADDRESS,
      10
    ]);
  });
});
