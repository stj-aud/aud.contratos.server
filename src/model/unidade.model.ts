import { Model } from "../inc/model";

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
}

export const UnidadeModel: UnidadeModelClass = new UnidadeModelClass();