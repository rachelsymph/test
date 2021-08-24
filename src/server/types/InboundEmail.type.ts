type MailerInfo = {
  Email: string;
  Name: string;
  MailboxHash: string;
};

type Header = {
  Name: string;
  Value: string;
};

type Attachment = {
  Name: string;
  Content: string;
  ContentType: string;
  ContentLength: number;
  ContentID: string;
};

// Check https://postmarkapp.com/developer/user-guide/inbound/parse-an-email for example response
export type InboundEmailResponse = {
  From: string;
  MessageStream: string;
  FromName: string;
  FromFull: MailerInfo;
  To: string;
  ToFull: MailerInfo[];
  Cc: string;
  CcFull: MailerInfo[];
  Bcc: string;
  BccFull: MailerInfo[];
  OriginalRecipient: string;
  ReplyTo: string;
  Subject: string;
  MessageID: string;
  Date: string;
  MailboxHash: string;
  TextBody: string;
  HtmlBody: string;
  StrippedTextReply: string;
  Tag: string;
  Headers: Header[];
  Attachments: Attachment[];
  RawEmail: string;
};
