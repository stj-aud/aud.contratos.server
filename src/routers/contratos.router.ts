import * as express from 'express';
import { Request, Response } from 'express';
import { DB } from '../inc/db';
import { ContratoModel } from '../model/contrato.model';

const router = express.Router();
const viewFolder:string = 'contratos';

router.get('/', (req: Request, res: Response) =>
{
	console.log(ContratoModel.fields);
	DB.lista().then(saida =>
	{
		let data:any = {};
		data.dados = saida;
		data.cabecalho = Object.keys(saida[0]);
		
		res.render(`${viewFolder}/index`,data);
	})
	//res.render(`${viewFolder}/index`);
});

export default router;