import express, { NextFunction, Request, Response } from "express";
import {
  SESClient,
  CloneReceiptRuleSetCommand,
  CloneReceiptRuleSetCommandInput,
  SendEmailCommand,
  SendBounceCommandInput,
  SendEmailCommandInput,
  SESClientConfig,
} from "@aws-sdk/client-ses";
import { access_key_id, region, secret_access_key } from "./config";
const app = express();

app.get("/", (req: Request, res: Response, nect: NextFunction) => {
  res.send("hello world!");
});

app.get("/ses", async (req: Request, res: Response) => {
  const result = await ses();
  console.log(result);
  res.send(result);
});

app.listen(1234, () => {
  console.log(`
    ########################################
    #   server listening on port : 1234    #
    ########################################         
    `);
});

const ses = async () => {
  const config: SESClientConfig = {
    credentials: {
      accessKeyId: access_key_id,
      secretAccessKey: secret_access_key,
    },
    region,
  };
  const sesClient = new SESClient(config);
  const sendEmailCommandInput: SendEmailCommandInput = {
    Destination: {
      ToAddresses: ["choie0423@alphacircle.co.kr"],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "EMAIL_SUBJECT",
      },
    },
    Source: "choie0423@alphacircle.co.kr",
  };
  const sendEmailCommand = new SendEmailCommand(sendEmailCommandInput);
  const data = await sesClient.send(sendEmailCommand);
  return data;
};
