import SessionModel from '../Models/session.model';

jest.mock('../Models/session.model');
jest.mock('../Services/user.service');
jest.mock('../Utils/jwt');

import {
  createSession,
  findSessionById,
  getValidSessions,
  findUserSessions,
} from '../Services/auth.service';

describe('Session Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSession', () => {
    it('should create a new session', async () => {
      const userId = 'user123';
      const userAgent = 'Test User Agent';

      const session = {
        user: userId,
        userAgent: userAgent,
      };

      (SessionModel.create as jest.Mock).mockResolvedValue(session);

      const result = await createSession(userId, userAgent);

      expect(SessionModel.create).toHaveBeenCalledWith(session);
      expect(result).toEqual(session);
    });
  });

  describe('findSessionById', () => {
    it('should find a session by ID', async () => {
      const sessionId = 'session123';
      const session = {
        _id: sessionId,
        user: 'user123',
        userAgent: 'Test User Agent',
      };

      (SessionModel.findById as jest.Mock).mockResolvedValue(session);

      const result = await findSessionById(sessionId);

      expect(SessionModel.findById).toHaveBeenCalledWith(sessionId);
      expect(result).toEqual(session);
    });
  });

  describe('getValidSessions', () => {
    it('should retrieve all valid sessions', async () => {
      const sessions = [
        { _id: 'session123', user: 'user123', valid: true },
        { _id: 'session456', user: 'user456', valid: true },
      ];

      (SessionModel.find as jest.Mock).mockResolvedValue(sessions);

      const result = await getValidSessions();

      expect(SessionModel.find).toHaveBeenCalledWith({ valid: true });
      expect(result).toEqual(sessions);
    });
  });

  describe('findUserSessions', () => {
    it('should find user sessions by user and valid flag', async () => {
      const user = 'user123';
      const valid = true;
      const session = {
        _id: 'session123',
        user: user,
        valid: valid,
      };

      (SessionModel.findOne as jest.Mock).mockResolvedValue(session);

      const result = await findUserSessions(user, valid);

      expect(SessionModel.findOne).toHaveBeenCalledWith({ user, valid });
      expect(result).toEqual(session);
    });
  });
});
