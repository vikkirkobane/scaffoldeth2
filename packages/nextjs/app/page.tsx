"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import {
  useScaffoldEventHistory,
  useScaffoldWatchContractEvent,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { writeContractAsync: writeYourContracAsync } = useScaffoldWriteContract("YourContract");

  useScaffoldWatchContractEvent({
    contractName: "YourContract",
    eventName: "GreetingChange",
    onLogs(logs) {
      console.log("GreetingChange logs:", logs);
    },
  });

  const { data: eventHistoryData } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    fromBlock: 0n,
    watch: true,
  });

  console.log("eventHistoryData:", eventHistoryData);

  const handleWrite = async () => {
    try {
      await writeYourContracAsync({
        functionName: "setGreeting",
        args: ["Hello, World!"],
      });
    } catch (e) {
      console.error("Error writing to contract:", e);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <button className="btn btn-primary" onClick={handleWrite}>
            Send TX
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
