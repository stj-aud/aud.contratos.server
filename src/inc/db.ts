const SQL = require("mssql/msnodesqlv8");

const conn = new SQL.ConnectionPool(
	{
		server: 'palmas',
		database: 'servidor_sci',
		driver: 'msnodesqlv8',
		options: {
			trustedConnection: true
		},
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000
		}
	}
);

class DBClass
{
	//private static instance:DB;
	private connection = null;
	
	constructor()
	{
		this.connect();
	}
	
	private connect()
	{
		return new Promise((resolve, reject)=>
		{
			console.log('Tentando conexão com o BD')
			conn.connect()
			.then(conn =>
			{
				console.log('Conexão bem sucedida!');
				this.connection = conn;
				resolve(true);
			})
			.catch(err =>
			{
				console.log('Erro na conexão!');
				console.log(err);
				reject(err);
			});
		});
	}
	
	public isConnected():Promise<boolean>
	{
		return new Promise((resolve, reject) =>
		{
			if (this.connection !== null) resolve(true);
			let conta:number = 0;
			
			let timeout = setTimeout(
				()=>
				{
					if (this.connection !== null) resolve(true);
					if (conta > 1000)
					{
						reject('Não foi possível conectar com o banco: timeout da aplicação');
					}
					conta++;
				},100
			);
		})
	}
	
	public queryObj(
		table: string,
		args?: {
			fields?: string[],
			where?: string,
			limit?: number,
			order?: string;
		}
	):Promise<any>
	{
		return new Promise((resolve, reject) =>
		{
			this.isConnected().then(()=>
			{
				let sql: string = `SELECT `;
				sql += (args && args.limit) ? `TOP(${args.limit}) ` : `TOP(10000) `;
				sql += (args && args.fields) ? args.fields.join(', ') : '*'
				sql += ' ';
				sql += `FROM ${table} `;
				sql += `WHERE ` + ((args && args.where) ? args.where : "1=1");
				sql += (args && args.order) ? ` ORDER BY ${args.order}` : '';
				
				this.connection.request().query(sql).then(res =>
				{
					resolve(res.recordset);
				})
				.catch(err => 
				{
					console.log(err);
					reject(err);
				});
			});
		});
	}
}

export const DB:DBClass = new DBClass();