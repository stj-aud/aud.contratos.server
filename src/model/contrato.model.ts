import { Model } from "../inc/model";

export class Contrato
{
	seq_trpb_documento: number = null;
	desc_titulo_documento: string = null;
	ano_doc_trpb: number = null;
	num_doc_trpb: number = null;
	seq_id_unidade: number = null;
	seq_processo: number = null;
	ind_trpb_tp_documento: number = null;
	ind_trpb_st_documento: number = null;
	ind_trpb_doc_modelo: number = null;
	ind_trpb_tp_modelo: number = null;
	ind_trpb_st_edicao_doc: number = null;
	ind_trpb_area_modelo: number = null;
	ind_st_registro: number = null;
	dt_registro: Date = null;
	cod_usuario: string = null;
	dt_alteracao: Date = null;
	cod_usuario_alteracao: string = null;
	seq_pedido_material: number = null;
	ind_trpb_migrou_modelo: number = null;
	/*
	// */
}

class ContratoModelClass extends Model
{
	protected tableName:string = 'trpb_documento';
	
	public fields:string[] = Object.keys(new Contrato());
	
	public getInfoContrato(ano: number, numero: number):Promise<any>
	{
		return new Promise((resolve, reject) =>
		{
			let sql:string;
			sql = `SELECT
								c.seq_trpb_documento,
								c.desc_titulo_documento,
								c.ano_doc_trpb,
								c.num_doc_trpb,
								u.nome_unidade,
								u.sg_unidade,
								u.seq_id_unid_sup,
								u.ind_niv_hierc,
								c.seq_processo,
								c.ind_trpb_tp_documento,
								c.ind_trpb_st_documento,
								c.ind_trpb_doc_modelo,
								c.ind_trpb_tp_modelo,
								c.ind_trpb_st_edicao_doc,
								c.ind_trpb_area_modelo,
								c.ind_st_registro,
								c.dt_registro,
								c.cod_usuario,
								c.dt_alteracao,
								c.cod_usuario_alteracao,
								c.seq_pedido_material,
								c.ind_trpb_migrou_modelo
						FROM [trpb_documento] c
						INNER JOIN [unid_orgnl] u ON u.seq_id_unidade = c.seq_id_unidade
						WHERE c.num_doc_trpb = ${numero} AND c.ano_doc_trpb = ${ano}`;
			this.db.query(sql)
			.then((res:any[]) =>
			{
				if (res.length == 0) return resolve(null);
				resolve(res[0]);
			})
			.catch(err =>
			{
				reject(err);
			});
			
		});
	}
	
	public getDetalhesContrato(ano:number,numero:number):Promise<any>
	{
		return new Promise((resolve, reject) =>
		{
			let sql:string;
			sql = `--BEGIN TRAN
						DECLARE @iNumDocTrpb INT;
						DECLARE @iAnoDocTrpb INT;
						SET @iNumDocTrpb = ${numero};
						SET @iAnoDocTrpb = ${ano};
						
						DECLARE @iSeqDocTrpb INT;
						DECLARE @iSeqVersao  INT;
						SELECT  @iSeqDocTrpb = seq_trpb_documento   
							FROM dbo.trpb_documento 
							WHERE  num_doc_trpb = @iNumDocTrpb  and ano_doc_trpb = @iAnoDocTrpb;  
						SELECT  @iSeqVersao  = MAX(seq_trpb_versao) 
							FROM dbo.trpb_versao 
							WHERE  seq_trpb_documento =  @iSeqDocTrpb ;
						--print @iSeqDocTrpb ;
						--print @iSeqVersao;
						
						WITH trpb AS 
						(SELECT t.seq_trpb_conteudo_textual, 1 as Nivel, 
										dbo.f_preenche_direita(t.num_ordem_conteudo_textual,  3, '0') as Ordenador 
										--CAST(t.num_ordem_conteudo_textual as char(3)) as Ordenador 
								FROM   dbo.trpb_conteudo_textual t 
								WHERE t.seq_trpb_conteudo_textual_sup IS NULL      
									AND t.ind_trpb_st_conteudo_textual in ('1', '2')
									AND t.ind_trpb_tp_conteudo_textual in ('0')
									AND ind_st_registro in ('0')
									AND t.seq_trpb_versao = @iSeqVersao 
						UNION ALL
						SELECT t1.seq_trpb_conteudo_textual, Nivel +  1, 
										Ordenador + '.' + dbo.f_preenche_direita(t1.num_ordem_conteudo_textual,  3, '0')
										--Ordenador + '.'    + CAST(t1.num_ordem_conteudo_textual as char(3)) as Ordenador 
						FROM   trpb 
						INNER JOIN dbo.trpb_conteudo_textual t1
						ON t1.seq_trpb_conteudo_textual_sup = trpb.seq_trpb_conteudo_textual 
						WHERE ind_trpb_st_conteudo_textual in ('1', '2') 
							AND ind_st_registro in ('0') 
						)
						
						/* Recupera os dados ordenados da recursiva e junta com os dados gerais das tabelas envolvidas.*/
						--INSERT INTO #TMP_MIGRA_CONTEUDO_TEXTUAL  
						SELECT r.Ordenador, r.Nivel, tr.* 
						FROM  trpb r
						INNER JOIN dbo.trpb_conteudo_textual tr
						ON tr.seq_trpb_conteudo_textual= r.seq_trpb_conteudo_textual
						ORDER BY Ordenador
						-- COMMIT`;
						
			this.db.query(sql)
			.then((linhas:any[]) =>
			{
				//console.log(res);
				let saidaHtml:string = '';
				let saidaTxt:string = '';
				linhas.forEach(linha =>
				{
					saidaTxt += linha['desc_conteudo_textual_puro']+"\n";
					saidaHtml += linha['desc_conteudo_textual']+"\n";
				});
				resolve(
					{
						contrato: `${numero}/${ano}`,
						texto: saidaTxt,
						textoFormatado: saidaHtml
					}
				);
			})
			.catch(err =>
			{
				//console.log(err);
				reject(err);
			});
		});
	}
}

export const ContratoModel:ContratoModelClass = new ContratoModelClass();