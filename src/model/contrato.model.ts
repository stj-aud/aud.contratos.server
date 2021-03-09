import { Model } from "../inc/model";

export class Contrato
{
	seq_contrato: number = null;
	numero_contrato?: string = null;
	num_contrato_externo?: string = null;
	desc_objeto_contrato?:string = null;
	num_edital_licitacao?:string = null;
	ind_prorrogavel_contrato?:number = null;
	dt_max_prorrogavel_contrato?:Date = null;
	vlr_contrato?:number = null;
	vlr_inicial_contrato?:number = null;
	perc_max_acres_permitido?: number = null;
	dt_max_apres_garantia?:Date = null;
	dt_vigencia_inicial_contrato?:Date = null;
	dt_vigencia_final_contrato?:Date = null;
	ind_continuidade?:number = null;
	dt_atualizacao?:Date = null;
	dt_assinatura?:Date = null;
	seq_mod_licitacao?:number = null;
	seq_id_unidade?:number = null;
	seq_tipo_instrumento?:number = null;
	seq_tipo_processo?:number = null;
	seq_tipo_contratacao?:number = null;
	cod_matricula?:string = null;
	desc_prazo_pagamento?:string = null;
	vlr_contrato_fixo?:number = null;
	vlr_contrato_estimado?:number = null;
	vlr_contrato_entrada?:number = null;
	ind_periodicidade_vlr_fixo?:number = null;
	ind_periodicidade_vlr_estimado?:number = null;
	dt_manifestacao_gestor?:Date = null;
	ind_enviado_gestor?:number = null;
	ind_reiterado_gestor?:number = null;
	dt_enviado_gestor?:Date = null;
	ind_st_siasg?:number = null;
	ind_contrato_continuado?:number = null;
	ind_previsao_reajuste?:number = null;
}

class ContratoModelClass extends Model
{
	protected tableName:string = 'contrato_cnt';
	
	public fields:string[] = Object.keys(new Contrato());
}

export const ContratoModel:ContratoModelClass = new ContratoModelClass();