import mongoose from "mongoose";

interface ConnectionStatus {
  isConnected?: number;
}

const connection: ConnectionStatus = {};

export const connectToDB = async (): Promise<void> => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('mongo===>disconnect--------',error);
    throw new Error(error as string); 
  }
};
