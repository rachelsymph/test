import { logger } from './Logger';

let isReady = false;

function getReadiness() {
  return isReady;
}

function setReadiness(_isReady: boolean) {
  logger.info('Setting ReadinessState to:', _isReady);

  isReady = _isReady;
}

export default {
  getReadiness,
  setReadiness,
};
