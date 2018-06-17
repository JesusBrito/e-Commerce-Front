<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
		    <div class="hero-body">
			    <p class="title has-text-black">
					 Agregar nuevo almacén al producto
			    </p>
		    </div>
		</section>
		<div class="box-content">
			<div class="stock-section">
				<div class="columns">
					<div class="column"></div>
						<div class="column is-two-fifths">
							<form  @submit.prevent="agregarAlmacen()">
								<div class="field">
									<label class="label">Id Producto</label>
									<div class="control">
										<input class="input" type="text" step="any" min="1" required="true" placeholder="Precio" disabled="true" v-model="almacen.ProductoIdProd">
									</div>
								</div>
								
								<div class="field">
									<label class="label">Nombre Producto</label>
									<div class="control">
										<input class="input" type="text" step="any" min="1" required="true" placeholder="Precio" disabled="true" v-model="nombreProducto">
									</div>
								</div>

								<div class="field">
									<label class="label">Color</label>
									<div class="control">
									   	<div class="select">
									   		<select required="true" v-model="almacen.ColoreIdColor" @change="validarColor">
									       		<option v-for='color in colores'  :value="color.Id_Color">{{color.Nombre_Color}}</option>
									    	</select>
									    </div>
									</div>
								</div>
								

								<div class="field">
									<label class="label">Precio</label>
									<div class="control">
										<input class="input" type="number" step="any" min="1" required="true" placeholder="Precio" v-model="almacen.Precio">
									</div>
								</div>

								<div class="field">
								    <label class="label">Agregar stock</label>
								    <div class="control">
										<input class="input" id="nuevoStock" type="number" min="1" step="1" placeholder="Stock" v-model="almacen.Stock">
									</div>
								</div>

								<div class="control">
									<br>
								   	<button class="button is-info is-rounded" id="btnAgregar">Agregar almacén</button>
								</div>
							</form>
						</div>
						<div class="column"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {GLOBAL} from '../services/global'
export default{
	data(){
		return{
			almacen:{},
			colores:{},
			id_prod:'',
			cargado:'',
			nombreProducto:''
		}
	},
	created:function(){
		this.almacen.ProductoIdProd = this.$route.params.id_prod
		this.nombreProducto = this.$route.params.nombre
		this.getColors()
	},
	methods:{
		getColors(){
			let uri = GLOBAL.url+'color'
			this.axios.get(uri)
				.then((response)=>{
					this.colores=response.data
				});
		},
		validarColor(){
			this.axios.get(GLOBAL.url+'Validar-almacen/'+this.almacen.ProductoIdProd+'/'+this.almacen.ColoreIdColor+'', 
				{headers: {authorization:localStorage.getItem('token')}})
		        .then((response) => {
		        	alert('Ya hay un almacén con éste color')
		        	document.getElementById('btnAgregar').disabled=true
		        })
		        .catch((err)=>{
		        	document.getElementById('btnAgregar').disabled=false
		        })
		},
		agregarAlmacen(){
			this.axios.post(GLOBAL.url+'almacen', this.almacen, 
				{headers: {authorization:localStorage.getItem('token')}})
		        .then((response) => {
		          	this.clear()
		          	alert('El almacén se registró de manera correcta')
		          	this.almacen.ColoreIdColor=""
		          	this.almacen.Precio=""
		          	this.almacen.Stock=""
		        })
		        .catch((err)=>{
		        	alert('Error al registrar')
		          	this.almacen={}
		        })
		},
	    clear(){
	      	var inputs = document.getElementsByTagName("input");
				for(var i=0;i<inputs.length;i++){
					inputs[i].value = "";				
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