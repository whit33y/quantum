import { min, minLength, required, schema, validate } from '@angular/forms/signals';

export interface AddCoinData {
  symbol: string;
  amount: number;
}

export const AddCoinInitialData: AddCoinData = {
  symbol: '',
  amount: 0,
};

export const AddCoinFormSchema = schema<AddCoinData>((rootPath) => {
  required(rootPath.amount, { message: 'You have to pass amount' });
  required(rootPath.symbol, { message: 'You have to select coin' });
  minLength(rootPath.symbol, 1, { message: 'You must select coin' });
  min(rootPath.amount, 0.0000000000000001, { message: 'Value must be greater than 0' });
});
