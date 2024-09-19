import { readFileSync } from 'fs';
import { read, utils } from 'xlsx';
import { BadRequestError } from '../../core/ApiError';

export const checkColumns = async (uploadedFile: any) => {
  try {
    const buf = readFileSync(uploadedFile.path);
    const workbook = read(buf);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    if (!worksheet['!ref']) {
      throw new BadRequestError('Error reading file. Worksheet not found.');
    }

    const range = utils.decode_range(worksheet['!ref']);
    const expectedColumns = [
        'Sr no',
        'Emp Code',
        'Emp Name',
        'Department',
        'Bank A/c No',
        'Bank IFSC NO',
        'UAN',
        'ESI No',
        'Designation',
        'Bank Name',
        'Date of Joining',
        'PDays',
        'Basic Salary',
        'House Rent Allowance',
        'Other Allowances',
        'Salary Package',
        'Variable Target Incentive',
        'Arrear',
        'Gross Salary',
        'TDS',
        'Loan Installment',
        'Food',
        'Advance',
        'Voluntary PF',
        'Uniform Deduction',
        'Total Deduction',
        'Net Salary Payable',
        'Employer PF',
        'Employer ESI',
        'Employer ARRPF',
        'employer  CTC',
      ]

    const getColumnRange = (colIdx: number) => {
      let column = "";
      while (colIdx >= 0) {
        column = String.fromCharCode(65 + (colIdx % 26)) + column;
        colIdx = Math.floor(colIdx / 26) - 1;
      }
      return column;
    };

    let foundColumns: string[] = [];
    let rowWithAllColumns: number | undefined = undefined;
    let mostMatchedColumns: string[]=[];
    let rowWithMostMatchedColumns:number|undefined= undefined;
    let missingColumns;

    interface ExpectedColumnsMap {
      [key: string]: string;
  }
  
  const expectedColumnsMap: ExpectedColumnsMap = {};

    for (let row = range.s.r; row <= range.e.r; row++) {
      foundColumns = [];
      
      for (let colIdx = range.s.c; colIdx <= range.e.c; colIdx++) {
        const col = getColumnRange(colIdx);
        const cell = worksheet[col + row];
        if (cell && cell.v) {
          const column = cell.v.toString().trim();
          if (expectedColumns.includes(column)) {
            foundColumns.push(column);
            expectedColumnsMap[column] = col;
          }
        }
      }


      if(foundColumns.length>mostMatchedColumns.length){
        mostMatchedColumns = foundColumns;
        rowWithMostMatchedColumns= row
      }
    
      console.log("🚀 ~ checkColumns ~ foundColumns:", foundColumns.length, expectedColumns.length, foundColumns)
      // if (foundColumns.length === expectedColumns.length) {
      //   rowWithAllColumns = row;
      //   mostMatchedColumns= foundColumns
      //   rowWithMostMatchedColumns=row
      //   break;
      // }
      if (expectedColumns.every(col => foundColumns.includes(col))) {
        rowWithAllColumns = row;
        mostMatchedColumns = foundColumns;
        rowWithMostMatchedColumns = row;
        break;
    }
    }

    if (rowWithAllColumns === undefined) {
     missingColumns = expectedColumns.filter(col => !mostMatchedColumns.includes(col));
      throw new Error(`Missing one or more columns: ${missingColumns.join(', ')} in row ${rowWithMostMatchedColumns}`);
    }


    const expectedColumnsArray = expectedColumns.map((column) => {
      const excelColumn = expectedColumnsMap[column] || 'Not found';
      return `${column}: ${excelColumn}`;
  });

    console.log(`Row ${rowWithAllColumns} contains all expected columns`);

    const result = {
      rowWithAllColumns,
      missingColumns,
      rowWithMostMatchedColumns,
      expectedColumnsArray
    }

    // return rowWithAllColumns;
    return result;

  } catch (error: any) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};
