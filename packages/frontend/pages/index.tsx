import type { NextPage } from "next";
import Head from "next/head";
import { useTempTestContract } from "~~/components/useTempTestContract";
import { useAppStore } from "~~/services/store/store";
import { Address, AddressInput, Balance } from "../components/scaffold-eth";
import { useEffect } from "react";
import { BigNumber } from "ethers";

const Home: NextPage = () => {
  const tempTest = useTempTestContract();

  const tempState = useAppStore(state => state.tempSlice.tempState);

  useEffect(() => {
    console.log("test state, in index.tsx:  " + tempState?.tempStuff);
  }, [tempState?.tempStuff]);
  return (
    <div className="px-8" >
      <Head>
        <title>Wagmi</title>
        <meta name="description" content="Wagmi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{
        textAlign: 'center',
        display: 'block',
      }}>
        {" "}
        <AddressInput />
        <br></br>
        {tempState?.tempStuff?.map(
          (setup, index) => (
            console.log("setup", setup),
            (
              <div key={index} style=
              {{display:'inline-block', 
                border: '1px solid limegreen', 
                padding: '2vw', 
                margin: '8px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 255, 0, 0.1)'
                }}>
                <div>setup {index}</div>
                <div>RewardsPerBlock: {setup.rewardPerBlock?.toString()}</div>
                <div>Endblock: {setup.endBlock?.toNumber()}</div>
                <div>Supply: {setup.totalSupply?.toString()}</div>
              </div>
            )
          ),
        )}
      </div>
    </div>
  );
};

export default Home;
