import * as express from 'express';
import { Request, Response } from 'express';
import { Contrato, ContratoModel } from '../model/contrato.model';

const router = express.Router();
const viewFolder:string = 'contratos';

router.get('/', (req: Request, res: Response) =>
{
	ContratoModel.getContratos()
	.then(contratos =>
	{
		res.json(contratos);
	})
	.catch(err =>
	{
		console.log(err.originalError);
		res.status(500).json({...err,message:err.originalError.toString()});
	});
});

router.get('/detalhes/:ano/:numero',(req: Request, res: Response) =>
{
	let ano:number = Number(req.params.ano);
	let numero: number = Number(req.params.numero);
	
	if (!ano || !numero || isNaN(ano) || isNaN(numero))
	{
		return res.status(400).json({code: 400, message: "Parâmetros incorretos"});
	}
	ContratoModel.getContrato(ano,numero)
	.then(contrato =>
	{
		res.json(contrato);
	})
	.catch(err =>
	{
		console.log(err.originalError);
		res.status(500).json({...err,message:err.originalError.toString()});
	});
})

export default router;