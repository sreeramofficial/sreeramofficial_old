import { writeUserData } from '@/pages/api/database';

export default async function callback(req, res) {
  const { RESPCODE, TXNAMOUNT, ORDERID } = req.body;
  const custId = ORDERID.split('||')[0];

  try {
    if (RESPCODE === '01') {
      writeUserData(custId, 1, TXNAMOUNT);
      res.redirect('/api/auth/login?redirectTo=/?payment=success');
    }
    else res.redirect('/api/auth/login?redirectTo=/?payment=failure');
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
