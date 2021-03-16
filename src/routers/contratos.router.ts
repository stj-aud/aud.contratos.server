import * as express from 'express';
import { Request, Response } from 'express';
import { ContratoModel } from '../model/contrato.model';

const router = express.Router();
const viewFolder:string = 'contratos';

router.get('/', (req: Request, res: Response) =>
{
	let campos:string[] = ContratoModel.fields;
	
	campos = campos.filter(campo =>
	{
		/*
		if (campo == 'cod_matricula') return false;
		if (campo == 'desc_prazo_pagamento') return false;
		if (campo == 'vlr_contrato_entrada') return false;
		if (campo == 'vlr_contrato_entrada') return false;
		if (campo == 'ind_periodicidade_vlr_fixo') return false;
		if (campo == 'ind_periodicidade_vlr_estimado') return false;
		if (campo == 'dt_manifestacao_gestor') return false;
		if (campo == 'ind_enviado_gestor') return false;
		if (campo == 'ind_reiterado_gestor') return false;
		if (campo == 'dt_enviado_gestor') return false;
		// */
		return true;
	})
	
	let args = {
		fields: campos,
		limit: 1000,
		//where: `dt_vigencia_final_contrato >= getdate()`,
		//order: `dt_vigencia_inicial_contrato DESC`
	}
	
	ContratoModel.getAll(args).then(result=>
	{
		let data:any = {};
		data.dados = result;
		data.cabecalho = campos;
		
		//res.render(`${viewFolder}/index`,data);
		res.json(data);
	});
});

export default router;