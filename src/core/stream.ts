import { Readable } from 'stream';
import { Writable } from 'stream';
import prisma_client from '../config/prisma';
import { alreadyExistsThenUpdate, findUnique, updateRow } from './PrismaFunctions';
import { createDataAndWhereFromChunk } from '../AutoTrigger/utils/petPoojaUtils/createDataAndWhere';

export class DatabaseReadableStream extends Readable {
  private fetchedData: any;
  private currentIndex: number;

  constructor(fetchedData: any) {
    super({ objectMode: true }); // Ensure objectMode is true
    this.fetchedData = fetchedData;
    this.currentIndex = 0;
  }
  _read() {
    if (this.currentIndex < this.fetchedData.length) {
      this.push(this.fetchedData[this.currentIndex]);
      this.currentIndex++;
    } else {
      this.push(null); // Signal the end of the stream
    }
  }
}

export class DatabaseWritableStream extends Writable {
  // Variables Declared
  public options: any;
  private completedCount: number = 0;
  private callback: Function;
  private tableName: any;
  private operationTableName: string;
  private secondTableName: any;
  // Constructor
  constructor(tableName: any, operationTableName: string, callback: Function, secondTableName?: any) {
    super({ objectMode: true }); // Ensure objectMode is true
    this.callback = callback;
    this.tableName = tableName;
    this.operationTableName = operationTableName;
    this.secondTableName = secondTableName;
  }

  // Write
  async _write(singleRow: any, encoding: any, callback: any) {
    try {
      const { data, where, functionName } = createDataAndWhereFromChunk(this.operationTableName, singleRow);

      if (functionName) {
        const existingRow = await functionName(this.tableName, where, data, this.secondTableName);
        callback();
      }
    } catch (error: any) {
      console.log(`Error Occured in ${this.operationTableName}`);

      this.callback(error);
      callback(error);
    }
  }
}
