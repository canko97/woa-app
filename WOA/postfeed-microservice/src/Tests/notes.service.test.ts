import {
  createPost,
  getUserPosts,
  getAllPosts,
  updatePost,
  findPost,
  deletePost,
} from '../Services/post.service';

import PostModel from '../Models/post.model';

jest.mock('../Models/post.model');

describe('Your Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const post = {
        user: 'user123',
        username: 'testuser',
        content: 'Test content',
      };

      (PostModel.create as jest.Mock).mockResolvedValue(post);

      const result = await createPost(post.user, post.username, post.content);

      expect(PostModel.create).toHaveBeenCalledWith(post);
      expect(result).toEqual(post);
    });
  });

  describe('getUserPosts', () => {
    it('should retrieve user posts', async () => {
      const userId = 'user123';
      const posts = [
        { user: userId, content: 'Post 1' },
        { user: userId, content: 'Post 2' },
      ];

      (PostModel.find as jest.Mock).mockResolvedValue(posts);

      const result = await getUserPosts(userId);

      expect(PostModel.find).toHaveBeenCalledWith({ user: userId });
      expect(result).toEqual(posts);
    });
  });

  describe('getAllPosts', () => {
    it('should retrieve all posts', async () => {
      const posts = [{ content: 'Post 1' }, { content: 'Post 2' }];

      (PostModel.find as jest.Mock).mockResolvedValue(posts);

      const result = await getAllPosts();

      expect(PostModel.find).toHaveBeenCalledWith({});
      expect(result).toEqual(posts);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const query = { _id: 'post123' };
      const update = { content: 'Updated content' };
      const options = { new: true };

      const updatedPost = {
        _id: 'post123',
        user: 'user123',
        username: 'testuser',
        content: 'Updated content',
      };

      (PostModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedPost);

      const result = await updatePost(query, update, options);

      expect(PostModel.findOneAndUpdate).toHaveBeenCalledWith(
        query,
        update,
        options
      );
      expect(result).toEqual(updatedPost);
    });
  });

  describe('findPost', () => {
    it('should find a post', async () => {
      const query = { _id: 'post123' };
      const post = { _id: 'post123', content: 'Test post' };

      (PostModel.findOne as jest.Mock).mockResolvedValue(post);

      const result = await findPost(query);

      expect(PostModel.findOne).toHaveBeenCalledWith(query);
      expect(result).toEqual(post);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const query = { _id: 'post123' };

      const deleteResult = { deletedCount: 1 };

      (PostModel.deleteOne as jest.Mock).mockResolvedValue(deleteResult);

      const result = await deletePost(query);

      expect(PostModel.deleteOne).toHaveBeenCalledWith(query);
      expect(result).toEqual(deleteResult);
    });
  });
});
