import { APIGatewayEvent } from 'aws-lambda';
import { dynamo } from '../common/dynamo';
import { Responses } from '../common/responses';

const tableName = process.env.tableName!;

export async function handler(event: APIGatewayEvent) {
  const id = event.pathParameters?.['id'];
  
  if(!id) {
      return Responses._400({ message: 'id is required' })
  }

  try {
    const todo = await dynamo.get(id, tableName);
    return Responses._200({ todo });
  } catch(error) {
    console.error(error);
    return Responses._400({ messages: 'Unable to get the todo', error })
  }
};
