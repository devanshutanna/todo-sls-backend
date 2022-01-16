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
    await dynamo.remove(id, tableName);
    return Responses._200({ id, message: 'todo removed successfully' });
  } catch(error) {
    console.error(error);
    return Responses._400({ messages: 'Failed to remove the todo', error })
  }
};
