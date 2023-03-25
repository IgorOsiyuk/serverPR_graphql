import Twilio from "twilio";

const twilioClient = Twilio(
  "AC858c383121140bf76b6f71a7a1539dbe",
  "45421185b55193aa8cb2611180bf21c1"
);
export const sendSMS = (to: string, body: string) => {
  return twilioClient.messages.create({
    body,
    to,
    from: "+19106598008",
  });
};
export const sendVerificationSms = (to: string, key: string) => {
  sendSMS(to, `Your verification key is: ${key}`);
};
