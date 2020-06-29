const app = new Vue({
el: '#app',
data: {
     titulo: 'LocalStorage con Vue',
     tareas: [],
     nuevaTarea: ''
},

methods:{
	agregarTarea: function(){
		// console.log("diste click", this.nuevaTarea);
		this.tareas.push({
			nombre: this.nuevaTarea
			// estado: false
		});
		// console.log(this.tareas);
		this.nuevaTarea = '';
		localStorage.setItem('gym-vue', JSON.stringify(this.tareas));
	},

	editarTarea: function(index){
		// console.log("editar", index);
		this.tareas[index].estado = true;
		localStorage.setItem('gym-vue', JSON.stringify(this.tareas));
    },

    eliminar: function(index){
    	// console.log('eliminar', index);
    	this.tareas.splice(index, 1);
    	localStorage.setItem('gym-vue', JSON.stringify(this.tareas));
    },

    limpiarLS: function(){
    	localStorage.removeItem('gym-vue');
    },

    verLS: function(){
    	let datosDB = JSON.parse(localStorage.getItem('gym-vue'));
    	var jsonobj = localStorage.getItem('gym-vue',1);
    	var obj = JSON.parse(jsonobj);
    	var x;
    	x = obj[0].nombre;
    	console.log(x);
    }
},

created: function(){

	let datosDB = JSON.parse(localStorage.getItem('gym-vue'));

	console.log(datosDB);


	if(datosDB === null){
		this.tareas = [];
	}else{
		this.tareas = datosDB;
	}
}
});