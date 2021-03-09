import * as express from 'express';
import { Request, Response } from 'express';
import { DB } from '../inc/db';

const router = express.Router();
const viewFolder:string = 'contratos';

const db:DB = DB.getInstance();

router.get('/', (req: Request, res: Response) =>
{
	db.lista().then(saida =>
	{
		let data:any = {};
		data.dados = saida;
		data.cabecalho = Object.keys(saida[0]);
		
		console.log(Object.keys(saida));
		
		res.render(`${viewFolder}/index`,data);
	})
	//res.render(`${viewFolder}/index`);
});

export default router;