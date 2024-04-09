"use client";

import type { NextPage } from "next";
import { useScaffoldContractWrite, useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  useScaffoldEventSubscriber({
    contractName: "YourContract",
    eventName: "GreetingChange",
    listener(logs) {
      console.log("GreetingChange logs:", logs);
    },
  });

  const { data: evenHistoryData } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    fromBlock: 0n,
    watch: true,
  });

  const { writeAsync: writeSetGreetingFunc } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: ["Hello, World!"],
  });

  const handleSetGreeting = async () => {
    try {
      await writeSetGreetingFunc();
    } catch (error) {
      console.error("Error setting greeting:", error);
    }
  };

  console.log("The event history data is:", evenHistoryData);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <button className="btn btn-primary btn-md" onClick={handleSetGreeting}>
            Set Greetings
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
