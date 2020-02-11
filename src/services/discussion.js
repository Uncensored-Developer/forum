module.exports = class DiscussionService {

  constructor(container) {
    this.discussionModel = container.get('discussionModel');
    this.logger = container.get('logger');
  }

  async fetch(filter) {
    try {
      this.logger.silly('Fetching discussions from db');

      return this.discussionModel.find(filter);

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async create(discussionInput) {

    try {
      this.logger.silly('Saving discussion to db');
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
