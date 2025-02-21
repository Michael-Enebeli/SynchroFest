import React from "react";
import { GuaranteeContainer, GuaranteeHeading, GuaranteeText, RewardText } from "../styles/TicketGuaranteeStyles";

const TicketGuarantee = () => {
  return (
    <GuaranteeContainer>
      <GuaranteeHeading>Reliable & Rewarding Tickets</GuaranteeHeading>
      <GuaranteeText>
        We have a 100% Buyer Guarantee + the only ticket rewards program around.So, grab your seats, they're guaranteed - just like your 11th ticket on us*.
    </GuaranteeText>
      <RewardText>
        *Earn a Reward Credit equal to the average price of the 10 tickets, excluding taxes, fees, and processing costs.
      </RewardText>
    </GuaranteeContainer>
  );
};

export default TicketGuarantee;
