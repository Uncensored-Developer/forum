module.exports = class PostService {

  constructor(container) {
    this.postModel = container.get('postModel');
    this.logger = container.get('logger');
  }

  async fetch(filter) {
    try {
      this.logger.silly('Fetching posts from db');

      return await this.postModel.find(filter);

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async create(postInput) {

    try {
      this.logger.silly('Saving discussion to db');
      const post = await this.postModel.create(postInput);
      if (!post) {
        this.logger.error('Failed to create discussion');
      }

      return post.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

};
