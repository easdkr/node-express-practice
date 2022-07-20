import express, { NextFunction, Request, Response } from "express";
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
  SESClientConfig,
  Message,
} from "@aws-sdk/client-ses";
import { access_key_id, region, secret_access_key } from "./config";

const app = express();
const message : Message = {
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
} 
const sourceEmail = "choie0423@naver.com"
const destinationEmails = ["choie0423@alphacircle.co.kr",]
app.get("/", (req: Request, res: Response, nect: NextFunction) => {
  res.send("hello world!");
});

app.get("/email", async (req: Request, res: Response) => {
  const result = await sendEmail();
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

const sendEmail = async () => {
  const sesClient = createSesClient()
  const sendEmailCommand = createSendEmailCommand()
  return await sesClient.send(sendEmailCommand);
};

const createSesClient = () => {
  const config: SESClientConfig = {
    credentials: {
      accessKeyId: access_key_id,
      secretAccessKey: secret_access_key,
    },
    region : region,
  };

  return new SESClient(config);
}

const createSendEmailCommand = () => {
  const sendEmailCommandInput: SendEmailCommandInput = {
    Destination: {
      ToAddresses: destinationEmails,
    },
    Message: message,
    Source: sourceEmail
  };

  return new SendEmailCommand(sendEmailCommandInput);
}