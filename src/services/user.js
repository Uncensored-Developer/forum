module.exports = class UserService {

  constructor(container) {

    this.userModel = container.get('userModel');
    this.logger = container.get('logger');

  }

  async create(userInput) {

    try {
      this.logger.silly('Saving user to db');
      const user = await this.userModel.create(userInput);
      if (!user) {
        this.logger.error('Failed to create user');
      }

      return user.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

};
