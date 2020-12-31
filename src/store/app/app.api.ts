import { put } from 'redux-saga/effects';
import { failure, loadDataSuccess } from './app.actions';
import auth0 from '@/lib/auth0';

export const getUserData = async custId => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user?custId=${custId}`);
  return await res.json();
};

export default function* loadDataSaga({ payload }: any) {
  try {
    const session = yield auth0.getSession(payload);
    if (!session) return;
    const { user, user: { sub } } = session;
    const data = yield getUserData(sub);
    yield put(loadDataSuccess({ ...user, ...data }));
  } catch (err) {
    console.log(err);
    yield put(failure(err));
  }
}
