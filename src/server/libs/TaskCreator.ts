/* global Buffer */
/* eslint-disable no-console */
import { CloudTasksClient } from '@google-cloud/tasks';

import { Indexable } from 'src/commons/types/Indexable.type';

import config from 'src/server/config/config';

type Params = {
  delayInSeconds: number;
  location?: string;
  path: string;
  payload: object;
  project?: string;
  queueName?: string;
};

const client = new CloudTasksClient();

const DEFAULT_QUEUE_NAME = 'default-queue';

export default async function createTask(params: Params) {
  const {
    delayInSeconds,
    location = config.DEFAULT_LOCATION,
    path,
    payload,
    project = config.PROJECT_ID,
    queueName = DEFAULT_QUEUE_NAME,
  } = params;

  const task: Indexable = {
    appEngineHttpRequest: {
      httpMethod: 'POST',
      relativeUri: path,
    },
  };

  const parent = client.queuePath(project, location, queueName);

  if (payload) {
    task.appEngineHttpRequest.body = Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  if (delayInSeconds) {
    // The time when the task is scheduled to be attempted.
    task.scheduleTime = {
      seconds: delayInSeconds + Date.now() / 1000,
    };
  }

  console.log('Sending task:');
  console.log(task);

  // Send create task request.
  const request = {
    parent,
    task,
  };

  const [response] = await client.createTask(request);
  const name = response.name;

  console.log(`Created task ${name}`);
}
