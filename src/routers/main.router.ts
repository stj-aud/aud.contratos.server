import * as express from 'express';
import { Request, Response } from 'express';
import { Unidade, UnidadeModel } from '../model/unidade.model';

const router = express.Router();
const viewFolder:string = 'main';

router.get('/', (req: Request, res: Response) =>
{
	console.log('GET:/');
	//res.render(`${viewFolder}/index`);
	res.json({msg:'API Contratos STJ by AUD'});
});

router.get('/unidades', (req: Request, res: Response) =>
{
	console.log('GET:/unidades');
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