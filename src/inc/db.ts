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

export class DB
{
	private static instance:DB;
	private connection = null;
	
	private constructor()
	{
		this.connect();
	}
	
	public static getInstance()
	{
		if (!this.instance)
		{
			this.instance = new DB();
		}
		return this.instance;
	}
	
	private connect()
	{
		return new Promise((resolve, reject)=>
		{
			console.log('Tentando conexão com o BD')
			conn.connect()
			.then(conn =>
			{
				this.connection = conn;
				resolve(true);
			})
			.catch(err =>
			{
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
					console.log(Object.keys(res));
					resolve(res.recordset);
				});
			});
		});
	}
}