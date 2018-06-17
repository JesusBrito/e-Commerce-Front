<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
		    <div class="hero-body">
			    <p class="title has-text-black">
					Modificar Stock de almacén existente
			    </p>
		    </div>
		</section>
		<div class="box-content">
			<div class="stock-section">
				<h3>Actualizar stocks</h3>
				<div class="columns" v-for="(almacen, key, index ) in almacenes">
					<div class="column"></div>
					<div class="column is-three-fifths">
						<div class="columns">
							<div class="column">
								<div class="field">
									<label class="label">Color</label>
										<div class="control" >
									    	<input v-if="key=='Colore'" class="input" type="number" min="0" placeholder="Color" required="true"  disabled="True">{{almacen.Colore.Nombre_Color}}
										</div>
								</div>
							</div>
							
							<div class="column">
								<div class="field">
								  <label class="label">Precio</label>
								  <div class="control">
								    <input class="input" type="number" step="any" min="50" required="true" placeholder="Precio" v-model="almacen.Precio">
								  </div>
								</div>
							</div>

							<div class="column">
									<div class="field">
									<label class="label">Stock</label>
										<div class="control">
									    	<input class="input" type="number" min="0" placeholder="Stock" required="true" v-model="almacen.Stock" disabled="True">
										</div>
								</div>
							</div>
							<div class="column">
								<div class="field">
								    <label class="label">Agregar stock</label>
								    <div class="control">
										<input class="input" id="nuevoStock" type="number" min="1" placeholder="Stock" v-model="almacen.StockSum">
									</div>
								</div>	
							</div>
							<div class="column">
								<div class="control">
									<br>
								    <button @click="actualizarStock(almacen)" class="button is-info is-rounded">Actualizar</button>
								</div>
							</div>
						</div>
					</div>
					<div class="column"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import router from './../router'
	import {GLOBAL} from '../services/global'
export default{
	data(){
		return{
			almacenes:{},
			id_prod:'',
			cargado:'',
			stock:''
		}
	},
	created:function(){
		let id= this.$route.params.id_prod
		if(id){
			localStorage.setItem('producto',id)
			this.idProd=id
		}else{
			this.idProd=(localStorage.getItem('producto'))
		}
		this.getDataApi()
	},
	methods:{
		getDataApi(){
			let uri =GLOBAL.url+'almacenes-producto/'+this.$route.params.id_prod

			this.axios.get(uri, {headers: {authorization:localStorage.getItem('token')}})
				.then((response)=>{
					this.almacenes=''						
					this.almacenes=response.data

					if(this.almacenes==''){
						alert('No hay un almacenes registrados')
						router.replace('productos')
					}
				});
		},
		actualizarStock(almacen){
			var almacenRegister={}

			almacenRegister.Stock = (parseInt(almacen.StockSum)>0) ? parseInt(almacen.Stock)+parseInt(almacen.StockSum) : parseInt(almacen.Stock)

			almacenRegister.Precio = almacen.Precio
			if(almacen.Precio<50){
				alert("El precio no puede ser menor a 50")
			}else{
				this.axios.put(GLOBAL.url+'almacen/'+almacen.Id_Alm_Color, almacenRegister, {headers:{authorization:  localStorage.getItem('token')}})
	        	.then((response) => {
	        		alert('El almacén se actualizó correctamente')
	        		this.almacenes.forEach((elemento, indice, array)=>{
						if(elemento.Id_Alm_Color==almacen.Id_Alm_Color){
							elemento.Stock=almacenRegister.Stock
							almacenRegister={}
							elemento.StockSum=0
						}
					})
	        	})
	        	.catch((err)=>{
	        		alert('Error al actualizar el almacén'+ err)
	        	})
			}
		}
	}
}
</script>
<style>
	.box-content{
		margin-top: 50px;
	}
</style>