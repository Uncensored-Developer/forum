const typedi = require('typedi');
const logger = require('./logger');
const agendaLoader = require('./agenda');


module.exports = ({mongoConnection, models}) => {

  try {
    models.forEach(m => {
      typedi.Container.set(m.name, m.model);
    });
    const agendaInstance = agendaLoader({ mongoConnection });
    typedi.Container.set('agendaInstance', agendaInstance);
    typedi.Container.set('logger', logger);
    logger.info('✌️ Agenda injected into container');
    return { agenda: agendaInstance };
  } catch(e) {
    logger.error('Error on dependency injector loader: %o', e);
    throw e;
  }

};
