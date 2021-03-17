import { Model } from "../inc/model";
import { Cache } from "../inc/cache";

export class Unidade
{
	seq_id_unidade: number = null;
	nome_unidade: string = null;
	sg_unidade: string = null;
	ind_uf: string = null;
	//ind_predio: number = null;
	//desc_andar: string = null;
	//desc_salas: string = null;
	//desc_ramais: string = null;
	//cod_sigesp: string = null;
	//desc_missao: string = null;
	//desc_atrib_unidade: any = null;
	ind_st_unidade: string = null;
	seq_id_unid_sup: number = null;
	ind_niv_hierc: number = null;
	//ind_peric_insal: number = null;
	num_hierc_horiz: number = null;
	//desc_obs_tlp: string = null;
	dt_inicio_unid: Date = null;
	//dt_fim_unid: Date = null;
	dt_lancamento: Date = null;
	//senha_ferias: string = null;
	//ind_unid_central_he: any = null;
	//ind_unid_central_bf: any = null;
	ind_tipo_atividade_unid: string = null;
	//ind_recebe_gas: number = null;
	//ind_recebe_gae: number = null;
	seq_gcp_area_atuacao: number = null;
	nome_unidade_simplificado: string = null;
}

class UnidadeModelClass extends Model
{
	protected tableName: string = 'unid_orgnl';
	
	public fields:string[] = Object.keys(new Unidade());
	
	private getUnidadesBD():Promise<Unidade[]>
	{
		return new Promise((resolve, reject) =>
		{
			let campos:string[] = UnidadeModel.fields;
			
			campos = campos.filter(campo =>
			{
				/*
				if (campo == 'cod_matricula') return false;
				// */
				return true;
			})
			
			let args = {
				fields: campos,
				limit: 1000,
				where: `dt_fim_unid IS NULL`,
				//AND ind_tipo_atividade_unid = 'M' 
				//order: `dt_vigencia_inicial_contrato DESC`
			}
			
			UnidadeModel.getAll(args)
			.then(result=>
			{
				let data:any = {};
				data.dados = result;
				data.cabecalho = campos;
				
				resolve(data);
			})
			.catch(err =>
			{
				reject(err);
			});
		});
	}
	
	public getUnidades():Promise<Unidade[]>
	{
		return new Promise((resolve, reject) =>
		{
			let cacheName:string = 'unidades';
			console.log('Recuperando cache');
			Cache.recover(cacheName)
			.then(data =>
			{
				resolve(data);
			})
			.catch(err =>
			{
				console.log('Encontrando no DB');
				this.getUnidadesBD()
				.then(data =>
				{
					Cache.save(cacheName,data);
					resolve(data);
				})
				.catch(err =>
				{
					reject(err);
				})
			});
		});
	}
}

export const UnidadeModel: UnidadeModelClass = new UnidadeModelClass();