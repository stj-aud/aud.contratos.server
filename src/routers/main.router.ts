import * as express from 'express';
import { Request, Response } from 'express';

import { ContratoModel } from '../model/contrato.model';
import { UnidadeModel } from '../model/unidade.model';

const router = express.Router();
const viewFolder:string = 'main';

router.get('/', (req: Request, res: Response) =>
{
	res.render(`${viewFolder}/index`);
});

router.get('/contratos', (req: Request, res: Response) =>
{
	let campos:string[] = ContratoModel.fields;
	
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
		//where: `dt_vigencia_final_contrato >= getdate()`,
		//order: `dt_vigencia_inicial_contrato DESC`
	}
	
	ContratoModel.getAll(args).then(result=>
	{
		let data:any = {};
		data.dados = result;
		data.cabecalho = campos;
		
		res.json(data);
	});
});

router.get('/unidades', (req: Request, res: Response) =>
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
	
	UnidadeModel.getAll(args).then(result=>
	{
		let data:any = {};
		data.dados = result;
		data.cabecalho = campos;
		
		res.json(data);
	});
});

export default router;