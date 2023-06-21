import UserModel, { User } from '../Models/user.model';
import config from 'config';
import axios from 'axios';
import log from '../Utils/logger';
import qs from 'qs';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export async function findUserById(id: string) {
  const _id = id;
  return UserModel.findById(_id);
}

export async function deleteUserAccount(id: string) {
  const _id = id;
  return UserModel.deleteOne({ _id });
}

export async function findAndUpdateUser(
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions = {}
) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export async function findAllUsers() {
  return UserModel.find({});
}

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: config.get('googleClientId'),
    client_secret: config.get('googleClientSecret'),
    redirect_uri: config.get('googleOauthRedirectUrl'),
    grant_type: 'authorization_code',
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return res.data;
  } catch (error: any) {
    log.error(error, 'Failed to fetch Google Oauth Tokens');
    throw new Error(error.message);
  }
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: any;
  access_token: any;
}): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    log.error(error, 'Error fetching Google User');
    throw new Error(error.message);
  }
}
