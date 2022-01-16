import { APIGatewayEvent } from 'aws-lambda';
import { dynamo } from '../common/dynamo';
import { Responses } from '../common/responses';

const tableName = process.env.tableName!;

export async function handler(event: APIGatewayEvent) {
  try {
    const body = event.body ? JSON.parse(event.body) : null;
    
    if(!body) {
        return Responses._400({ message: 'unable to parse body' })
    }

    const todo = await dynamo.addOrUpdate(body, tableName);
    return Responses._200({ todo });
  } catch(error) {
    console.error(error);
    return Responses._400({ messages: 'Failed to add todo', error })
  }
};
