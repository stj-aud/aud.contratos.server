import * as express from 'express';
import { Request, Response } from 'express';
import { DB } from '../inc/db';
import { ContratoModel } from '../model/contrato.model';

const router = express.Router();
const viewFolder:string = 'contratos';

router.get('/', (req: Request, res: Response) =>
{
	let campos:string[] = ContratoModel.fields;
	
	ContratoModel.getAll({fields: campos}).then(result=>
	{
		let data:any = {};
		data.dados = result;
		data.cabecalho = campos;
		
		res.render(`${viewFolder}/index`,data);
	});
});

export default router;