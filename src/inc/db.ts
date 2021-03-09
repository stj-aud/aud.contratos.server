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
	
	public lista():Promise<any>
	{
		return new Promise((resolve, reject) =>
		{
			this.isConnected().then(()=>
			{
				let sql: string = `
				SELECT TOP(10) 
					c.seq_contrato,
					c.numero_contrato, 
					c.desc_objeto_contrato,
					c.ind_prorrogavel_contrato,
					c.dt_max_prorrogavel_contrato,
					c.vlr_contrato,
					c.vlr_inicial_contrato,
					c.dt_vigencia_inicial_contrato,
					c.dt_vigencia_final_contrato,
					c.ind_continuidade,
					c.dt_atualizacao,
					c.dt_assinatura,
					c.seq_mod_licitacao,
					c.seq_id_unidade,
					c.seq_tipo_instrumento,
					c.seq_tipo_processo,
					c.seq_tipo_contratacao,
					c.ind_contrato_continuado,
					c.ind_previsao_reajuste
				FROM contrato_cnt c
				WHERE 1=1
				`;
				this.connection.request().query(sql).then(res =>
				{
					resolve(res.recordset);
				});
			});
		});
	}
	
	public queryObj(
		table: string,
		args?: {
			fields?: string[]
			where?: string;
		}
	)
	{
		return new Promise((resolve, reject) =>
		{
			this.isConnected().then(()=>
			{
				let sql: string = `SELECT TOP(10000) `;
				sql += (args && args.fields) ? args.fields.join(', ') : '* '
				sql += `FROM ${table} `;
				sql += `WHERE ` + ((args && args.where) ? args.where : "1=1");
				
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