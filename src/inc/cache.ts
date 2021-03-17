const fs = require('fs');
const path = require('path');

class CacheClass
{
	private cachePath:string = path.join(__dirname,'..','..','cache');
	
	public recover(cacheName:string):Promise<any[]>
	{
		return new Promise((resolve, reject) =>
		{
			let fname: string = path.join(this.cachePath,cacheName+'.json');
			fs.readFile(fname,'utf8',(err,data) =>
			{
				if (err)
				{
					//console.log(err);
					return reject(err);
				}
				resolve(JSON.parse(data));
			});
		});
	}
	
	public save(cacheName:string, data: any):Promise<boolean>
	{
		return new Promise((resolve, reject) =>
		{
			let fname: string = path.join(this.cachePath,cacheName+'.json');
			fs.writeFile(fname,JSON.stringify(data,null,2),'utf8',()=>
			{
				resolve(true);
				console.log(fname);
			});
			//console.log(cacheName,data)
			resolve(true);
		});
	}
}

export const Cache:CacheClass = new CacheClass();