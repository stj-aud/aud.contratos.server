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
}

export const ContratoModel:ContratoModelClass = new ContratoModelClass();