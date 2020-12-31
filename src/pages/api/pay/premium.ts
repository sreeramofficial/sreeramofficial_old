import https from 'https';
import PaytmChecksum from 'paytmchecksum';
import auth0 from '@/lib/auth0';

const mid = process.env.PAYTM_MERCHANT_ID;
const mkey = process.env.PAYTM_MERCHANT_KEY;
const websiteName = process.env.PAYTM_WEBSITE_NAME;
const hostname = process.env.PAYTM_HOSTNAME;
const currency = process.env.PAYTM_CURRENCY;
const callbackUrl = process.env.PAYTM_CALLBACK_URL;
const requestType = process.env.PAYTM_REQUEST_TYPE;

export default async function premium(req, res) {
  try {
    const session = await auth0.getSession(req);

    if (!session) return res.redirect('/api/auth/login?redirectTo=/api/pay/premium');

    const { user: { sub: custId } } = session;
    const orderId = `${custId}||${new Date().getTime()}`;

    const value = process.env.NEXT_PUBLIC_PAYTM_VALUE;

    const body = {
      requestType,
      mid,
      websiteName,
      orderId,
      callbackUrl,
      txnAmount: {
        value,
        currency,
      },
      userInfo: {
        custId,
      },
    };

    const signature = await PaytmChecksum.generateSignature(JSON.stringify(body), mkey);

    const postData = JSON.stringify({
      head: {
        signature,
      },
      body,
    });

    const options = {
      hostname,
      port: 443,
      path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
      },
    };

    let response = "";

    const postReq = https.request(options, postRes => {
      postRes.on('data', chunk => response += chunk);
      postRes.on('end', () => {
        res.send(`
          <html>
            <form name='paytm_form' method='post' action=https://${hostname}/theia/api/v1/showPaymentPage?mid=${mid}&orderId=${orderId}>
            <input type="hidden" name="mid" value="${mid}"/>
            <input type="hidden" name="orderId" value="${orderId}"/>
            <input type="hidden" name="txnToken" value="${JSON.parse(response).body.txnToken}"/>
            </form>
            <script>document.paytm_form.submit();</script>
          </html>
        `);
      });
    });

    postReq.write(postData);
    postReq.end();

  } catch (error) {
    console.error(error);
    res.redirect('/api/auth/login?redirectTo=/?payment=failure');
  }
}

