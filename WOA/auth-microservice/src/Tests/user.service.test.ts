import UserModel from '../Models/user.model';

jest.mock('../Models/user.model');
jest.mock('axios');
jest.mock('../Utils/logger');

import {
  createUser,
  findUserById,
  findAndUpdateUser,
  findUserByEmail,
  findAllUsers,
} from '../Services/user.service';

describe('User Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userInput = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const user = {
        _id: 'user123',
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
      };

      (UserModel.create as jest.Mock).mockResolvedValue(user);

      const result = await createUser(userInput);

      expect(UserModel.create).toHaveBeenCalledWith(userInput);
      expect(result).toEqual(user);
    });
  });

  describe('findUserById', () => {
    it('should find a user by ID', async () => {
      const userId = 'user123';
      const user = {
        _id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      (UserModel.findById as jest.Mock).mockResolvedValue(user);

      const result = await findUserById(userId);

      expect(UserModel.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  describe('findAndUpdateUser', () => {
    it('should find and update a user', async () => {
      const query = { _id: 'user123' };
      const update = { name: 'John Smith' };
      const options = { new: true };

      const updatedUser = {
        _id: 'user123',
        name: 'John Smith',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

      const result = await findAndUpdateUser(query, update, options);

      expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith(
        query,
        update,
        options
      );
      expect(result).toEqual(updatedUser);
    });
  });

  describe('findUserByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'johndoe@example.com';
      const user = {
        _id: 'user123',
        name: 'John Doe',
        email: email,
        password: 'password123',
      };

      (UserModel.findOne as jest.Mock).mockResolvedValue(user);

      const result = await findUserByEmail(email);

      expect(UserModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
    });
  });

  describe('findAllUsers', () => {
    it('should retrieve all users', async () => {
      const users = [
        {
          _id: 'user123',
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123',
        },
        {
          _id: 'user456',
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          password: 'password456',
        },
      ];

      (UserModel.find as jest.Mock).mockResolvedValue(users);

      const result = await findAllUsers();

      expect(UserModel.find).toHaveBeenCalledWith({});
      expect(result).toEqual(users);
    });
  });
});
