import { DB } from "./db";

export class Model
{
	protected db = DB;
	protected tableName: string;
	
	public getAll(args?:any):Promise<any[]>
	{
		//console.log(this.tableName);
		return this.db.queryObj(this.tableName,args);
	}
}