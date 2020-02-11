module.exports = class DiscussionService {

  constructor(container) {
    this.discussionModel = container.get('discussionModel');
    this.logger = container.get('logger');
  }

  async fetch(filter) {
    try {
      this.logger.silly('Fetching discussions from db');

      return await this.discussionModel.find(filter);

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async delete(filter) {
    try {
      this.logger.silly('Fetching discussions from db');

      return await this.discussionModel.deleteOne(filter)

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async create(discussionInput) {

    try {
      this.logger.silly('Saving discussion to db');
      discussionInput.posts_count = 0;
      const discussion = await this.discussionModel.create(discussionInput);
      if (!discussion) {
        this.logger.error('Failed to create discussion');
      }

      return discussion.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

};
