import * as express from 'express';
import { Request, Response } from 'express';
import { Unidade, UnidadeModel } from '../model/unidade.model';

const router = express.Router();
const viewFolder:string = 'main';

router.get('/', (req: Request, res: Response) =>
{
	res.render(`${viewFolder}/index`);
});

router.get('/unidades', (req: Request, res: Response) =>
{
	UnidadeModel.getUnidades()
	.then((unidades:Unidade[]) =>
	{
		res.json(unidades);
	})
	.catch(err =>
	{
		console.log(err.originalError);
		res.status(500).json({...err,message:err.originalError.toString()});
	});
});

export default router;