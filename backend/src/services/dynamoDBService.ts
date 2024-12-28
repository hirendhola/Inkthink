import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ReturnValue } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../config/aws";
import { Room } from "../models/Room";

const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

export const updateRoom = async (room: Room) => {
  try {
    // Build update expression dynamically based on available fields
    let updateExpression = "SET players = :players, currentRound = :round, gameState = :state";
    let expressionAttributeValues: any = {
      ":players": room.players,
      ":round": room.currentRound,
      ":state": room.gameState
    };

    // Add optional fields only if they exist
    if (room.currentWord !== undefined) {
      updateExpression += ", currentWord = :word";
      expressionAttributeValues[":word"] = room.currentWord;
    }

    if (room.currentDrawer !== undefined) {
      updateExpression += ", currentDrawer = :drawer";
      expressionAttributeValues[":drawer"] = room.currentDrawer;
    }

    const params = {
      TableName: "Rooms",
      Key: { roomId: room.roomId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: ReturnValue.ALL_NEW
    };

    const result = await docClient.send(new UpdateCommand(params));
    return result.Attributes as Room;
  } catch (error) {
    console.error("DynamoDB Update Error:", {
      error,
      roomId: room.roomId,
      players: room.players.length
    });
    throw new Error(`Failed to update room: ${(error as Error).message}`);
  }
};

export const createRoom = async (room: Room): Promise<void> => {
  try {
    const params = {
      TableName: "Rooms",
      Item: {
        ...room,
        createdAt: Date.now(),
        players: room.players || [],
        currentRound: room.currentRound || 0,
        gameState: room.gameState || 'waiting'
      },
      ConditionExpression: "attribute_not_exists(roomId)"
    };

    await docClient.send(new PutCommand(params));
  } catch (error) {
    console.error("DynamoDB Create Error:", {
      error,
      roomId: room.roomId
    });
    throw new Error(`Failed to create room: ${(error as Error).message}`);
  }
};

export const getRoom = async (roomId: string): Promise<Room | null> => {
  try {
    const params = {
      TableName: "Rooms",
      Key: { roomId }
    };

    const result = await docClient.send(new GetCommand(params));
    return result.Item as Room || null;
  } catch (error) {
    console.error("DynamoDB Get Error:", {
      error,
      roomId
    });
    throw new Error(`Failed to get room: ${(error as Error).message}`);
  }
};