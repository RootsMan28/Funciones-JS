const app = new Vue({
	el: '#app',
	data: {
		title: 'LocalStorage',
		nota: '',
		resultados: [],
		numeroFirst: '',
		numeroSecond: '',
		nuevoResultado: ''
	},

	methods:{
			agregarResultado: function(operacion){
			// console.log("diste click", this.nuevaTarea);
			
			var firstN = this.numeroFirst;
			var secondN = this.numeroSecond;
			var resultado;
			resultado = parseFloat(resultado);

			firstN = parseFloat(firstN);
			secondN = parseFloat(secondN);

			// resultado = firstN+secondN;

			if(operacion == 'suma')
			{
				resultado = firstN+secondN;
			}

			if(operacion == 'resta')
			{
				resultado = firstN-secondN;
			}

			if(operacion == 'multiplicacion')
			{
				resultado = firstN*secondN;
			}

			if(operacion == 'division')
			{
				resultado = firstN/secondN;
			}


			 this.resultados.push({
			 	resultado: resultado,
			 	operacionTipo: operacion
				
			 });
			 console.log(this.resultados);
			 this.numeroFirst = '';
			 this.numeroSecond = '';
			 

			 localStorage.setItem('almacenamiento', JSON.stringify(this.resultados));

			 var jsonobj = localStorage.getItem('almacenamiento',1);
	    	var obj = JSON.parse(jsonobj);
	    	var x,tamano;
	    	tamano = obj.length;
	    	tamano = tamano-1;
	    	 x = obj[tamano].resultado;

	    	 this.nuevoResultado = x;
	    	 this.nota = 'Tu última operación fue una '+operacion;
		}
	},

	created: function(){

	var datosDB = JSON.parse(localStorage.getItem('almacenamiento'));

	console.log(datosDB);


	if(datosDB === null){
		this.nuevoResultado = '';
	}else{
		var obj = datosDB;
		var x,tamano,operationLast;
		tamano = obj.length;
		tamano = tamano-1;
		 x = obj[tamano].resultado;
		 operationLast = obj[tamano].operacionTipo;
		this.nuevoResultado = x;
		this.nota = 'Tu última operación fue una '+operationLast;
	}
}


});