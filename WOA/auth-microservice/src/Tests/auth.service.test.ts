const {
  createSession,
  findSessionById,
  getValidSessions,
  findUserSessions,
} = require('../Services/auth.service'); // Replace with the correct file path

describe('Session Services', () => {
  describe('createSession', () => {
    it('should create a session', async () => {
      const session = await createSession('user123', 'Chrome');
      expect(session).toBeDefined();
      expect(session.user).toBe('user123');
      expect(session.userAgent).toBe('Chrome');
    });
  });

  describe('findSessionById', () => {
    it('should find a session by ID', async () => {
      const session = await findSessionById('session123');
      expect(session).toBeDefined();
      expect(session._id).toBe('session123');
    });
  });

  describe('getValidSessions', () => {
    it('should get valid sessions', async () => {
      const sessions = await getValidSessions();
      expect(sessions).toBeDefined();
      expect(Array.isArray(sessions)).toBe(true);
      sessions.forEach((session: { valid: boolean }) => {
        expect(session.valid).toBe(true);
      });
    });
  });

  describe('findUserSessions', () => {
    it('should find user sessions', async () => {
      const user = 'user123';
      const valid = true;
      const session = await findUserSessions(user, valid);
      expect(session).toBeDefined();
      expect(session.user).toBe(user);
      expect(session.valid).toBe(valid);
    });
  });
});
