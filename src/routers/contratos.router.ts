import * as express from 'express';
import { Request, Response } from 'express';
import { Contrato, ContratoModel } from '../model/contrato.model';

const router = express.Router();
const viewFolder:string = 'contratos';

router.get('/', (req: Request, res: Response) =>
{
	let campos:string[] = ContratoModel.fields;
	
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
	
	ContratoModel.getInfoContrato(ano,numero)
	.then(contratoInfo =>
	{
		ContratoModel.getDetalhesContrato(ano,numero)
		.then(contrato =>
		{
			res.json({...contratoInfo,...contrato});
		})
		.catch(err =>
		{
			console.log(err.originalError);
			res.status(500).json({...err,message:err.originalError.toString()});
		});
	})
	.catch(err =>
	{
		console.log(err.originalError);
		res.status(500).json({...err,message:err.originalError.toString()});
	})
	
	
})

export default router;