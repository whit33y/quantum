import { Client, Account, TablesDB } from 'appwrite';
import { environment } from '../../../environments/environment';

export const client = new Client();
export const tablesDb = new TablesDB(client);

client.setEndpoint(environment.appwriteEndpoint).setProject(environment.appwriteProjectId);

export const account = new Account(client);
export { ID } from 'appwrite';
