import { NextFunction, Request, Response, Router } from 'express';

import { createGive, findCustomRegexes, findDonor, findPlatform, findRecipient } from 'src/server/models';
import { parseEmail } from 'src/server/services/EmailParserService';
import { InboundEmailResponse } from 'src/server/types/InboundEmail.type';

const router = Router();

async function receiveInboundEmailRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const response = req.body as InboundEmailResponse;
    const { results: customRegexes } = await findCustomRegexes({});

    // TODO: Make this all a service and sanitize data
    const result = parseEmail({
      haystack: response.TextBody,
      regexes: customRegexes,
    });

    const platform = await findPlatform({
      name: result.platformName,
    });

    const recipient = await findRecipient({
      name: result.recipientName,
    });

    const donor = await findDonor({
      email: result.donorName,
    });

    // TODO: To complete
    await createGive({
      amount: Number(result.amount),
      donorId: donor.id,
      donorLegacyId: donor.legacyId,
      fromEmail: response.FromFull.Email,
      fromName: response.FromFull.Name,
      giveDate: new Date(response.Date),
      headers: response.Headers,
      htmlBody: response.HtmlBody,
      isFeatured: false,
      isRecurring: false, // To be parsed from email
      platformId: platform.id,
      platformLegacyId: platform.legacyId,
      recipientId: recipient.id,
      recipientLegacyId: recipient.legacyId,
      status: 'unprocessed',
      subject: response.Subject,
      taxDeductible: result.taxDeductible as string,
    });

    return res.send(response);
  } catch (e) {
    next(e);
  }
}
router.route('/').post(receiveInboundEmailRoute);

export default router;
