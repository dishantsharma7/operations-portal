import { readFileSync } from 'fs';
import { read, utils } from 'xlsx'; // Import necessary functions

export const checkColumns = async (uploadedFile: any, staticDataOfUploadedFile: any) => {
  try {
    const buf = readFileSync(uploadedFile.path);
    const workbook = read(buf);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const expectedRow = staticDataOfUploadedFile.rowIndex;
    const expectedColumns: string[] = staticDataOfUploadedFile.column;
    //Check if any column is missing in the excel file
    let columnsMatched: string[] = [];

    expectedColumns.filter((col: string, index: number) => {
      const cellAddress = utils.encode_cell({ c: index, r: expectedRow });
      const cellValue = worksheet[cellAddress].v;
      //Cell Value = value inside the cell
      if (cellValue !== col) {
        throw new Error(`Cell Name: ${col} Cell not found at ${cellAddress}, file name ${uploadedFile.filename},whats present in that cell is ${cellValue}`);
      }
      if (col == expectedColumns[index]) {
        columnsMatched.push(cellValue);
      }
    });
    return true;
  } catch (error: any) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};
//('cell', 'col:', col, ' cellAddress:', cellAddress, ' cellValue:', cellValue);
