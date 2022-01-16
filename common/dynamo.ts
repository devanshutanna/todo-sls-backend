import { DynamoDB } from 'aws-sdk';
const dynamoClient = new DynamoDB.DocumentClient();

export const dynamo = {

  async getAll(tableName: string) {
    var params: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
    };

    const res = await dynamoClient.scan(params).promise().catch(error => {
      console.error(error);
      return null;
    });

    const items = res?.Items;
    
    if(!items) {
      throw Error(`There was an error fetching while all items from ${tableName}`);
    }
  
    return items;
  },

  async get(id: string, tableName: string) {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: { id },
    }
    
    const res = await dynamoClient.get(params).promise().catch(error => {
      console.error(error);
      return null;
    });

    const data = res?.Item;

    if(!data) {
      throw Error(`There was an error fetching the data for ID of ${id} from ${tableName}`);
    }

    console.log(data);

    return data;
  },

  async addOrUpdate(item: object, tableName: string) {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    }

    const res = await dynamoClient.put(params).promise().catch(error => {
      console.error(error);
      return null;
    });

    if(!res) {
      throw Error(`There was an error while putting item: ${JSON.stringify(item)}, in ${tableName}`);
    }

    return item;
  },

  remove(id: string, tableName: string) {
    return dynamoClient.delete({
      Key: { id },
      TableName: tableName
    }).promise();
  },
};
