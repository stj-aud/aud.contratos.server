import { Model } from "../inc/model";
import { Cache } from "../inc/cache";
import { Unidade } from "./unidade";

class UnidadeModelClass extends Model
{
	protected tableName: string = 'unid_orgnl';
	
	public fields:string[] = Object.keys(new Unidade());
	
	private getUnidadesBD():Promise<Unidade[]>
	{
		return new Promise((resolve, reject) =>
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
			
			UnidadeModel.getAll(args)
			.then(result=>
			{
				let data:any = {};
				data.dados = result;
				data.cabecalho = campos;
				
				resolve(data);
			})
			.catch(err =>
			{
				reject(err);
			});
		});
	}
	
	public getUnidades():Promise<Unidade[]>
	{
		return new Promise((resolve, reject) =>
		{
			let cacheName:string = 'unidades';
			console.log('Recuperando cache');
			Cache.recover(cacheName)
			.then(data =>
			{
				resolve(data);
			})
			.catch(err =>
			{
				console.log('Encontrando no DB');
				this.getUnidadesBD()
				.then(data =>
				{
					Cache.save(cacheName,data);
					resolve(data);
				})
				.catch(err =>
				{
					reject(err);
				})
			});
		});
	}
}

export const UnidadeModel: UnidadeModelClass = new UnidadeModelClass();