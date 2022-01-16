import { APIGatewayEvent } from 'aws-lambda';
import { dynamo } from '../common/dynamo';
import { Responses } from '../common/responses';

const tableName = process.env.tableName!;

export async function handler(event: APIGatewayEvent) {
  try {
    const todos = await dynamo.getAll(tableName);
    return Responses._200({ todos });
  } catch(error) {
    console.error(error);
    return Responses._400({ messages: 'Unable to get all todos', error })
  }
};
