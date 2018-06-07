<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
			<div class="hero-body">
			    <p class="title has-text-black">
				    Registro de productos
				</p>
				<p class="subtitle has-text-black">
				  <span class="has-text-danger">TODOS</span> los campos son obligatorios 
				</p>
			</div>
		</section>

		<div class="columns box-content">
			<div class="column"></div>
			<div class="column is-three-fifths">
				<form v-on:submit.prevent="addProduct" id="registerForm">	

					<div class="field">
					  <label class="label">Id  de producto</label>
					  <div class="control">
					    <input class="input" type="text" v-on:keyup="validateId" placeholder="Id de producto" required="true" v-model="product.Id_prod" pattern="([A-ZÑa-zñ0-9]){3,}">
					    <span v-show="this.idNotUnique" class="help is-danger">El id ya está registrado</span>
					  </div>
					</div>

					<div class="field">
					  <label class="label">Nombre</label>
					  <div class="control">
					    <input class="input" type="text" placeholder="Nombre" pattern="[a-zA-Z0-9À-ž\s]*" required="true" v-model="product.Nombre">
					  </div>
					</div>
			
					<div class="field">
						<label class="label">Descripción</label>
						<div class="control">
							<textarea class="textarea" id="txtDescripcion" placeholder="Descripción" required="true" v-model="product.Descripcion"></textarea>
						</div>
					</div>
					
					<div class="field">
					  <label class="label">Precio</label>
					  <div class="control">
					    <input class="input" type="number" step="any" min="1" required="true" placeholder="Precio" v-model="product.Precio">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Stock</label>
					  <div class="control">
					    <input class="input" type="number" min="0" placeholder="Stock" required="true" v-model="product.Stock">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Estatus</label>
					  <div class="control">
					    <div class="select">
					      <select required="true" v-model="product.Estatus">
					        <option>A</option>
					        <option>D</option>
					      </select>
					    </div>
					  </div>
					</div>
					<div class="field">
					  <label class="label">Categoria</label>
					  <div class="control">
					    <div class="select">
					      <select required="true" v-model="product.CategoriaIdCategoria">
					        <option v-for="category in categories" >{{category.Id_Categoria}}</option>
					      </select>
					    </div>
					  </div>
					</div>
					<div class="field">
					  <label class="label">Alto</label>
					  <div class="control">
					    <input class="input" type="number" step="any" min="1" placeholder="Alto" required="true" v-model="product.Alto">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Largo</label>
					  <div class="control">
					    <input class="input" type="number" step="any" min="1" placeholder="Largo" required="true" v-model="product.Largo">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Ancho</label>
					  <div class="control">
					    <input class="input"  type="number" step="any" min="1" placeholder="Ancho" required="true" v-model="product.Ancho">
					  </div>
					</div>
					
					<div class="field">
					 <label for="myfile" class="label"> Imágen de producto</label>
					  <div class="file is-large is-boxed">
					    <label class="file-label">
					      <input class="file-input" type="file" @change="onFileSelected" name="myfile" v-validate="'image'">
					      <span class="file-cta">
					        <span class="file-icon">
					          <i class="fas fa-upload"></i>
					        </span>
					        <span class="file-label">
					          Selecciona una imágen
					        </span>
					      </span>
					      <span class="help is-danger">{{ errors.first('myfile') }}</span>
					    </label>
					  </div>
					</div>
		
					<div class="field is-grouped">
					  <div class="control" >
					    <button class="button is-primary" id="btn-agregar">Registrar</button>
					  </div>
					  <div class="control">
					    <button class="button is-danger" @click='clear'>Cancelar</button>
					  </div>
					</div>
				</form>
			</div>
			<div class="column"></div>
		</div>
	</div>
</template>

<script>
import router from './../router'
import toastr from 'toastr';
import VeeValidate from 'vee-validate';
import Vue from 'vue'
import {GLOBAL} from '../services/global'
//Vue.use(VeeValidate);
export default{
	formData:'',
	data(){
		return{
			idNotUnique:'',
			product:{},
			categories:{}
		}
	},
	created:function(){
		this.getDataApi()
		var rol= localStorage.getItem('Rol')
		if(rol){
			if(rol=='Client'){
				router.replace('lista-productos')
			}
		}else{
			alert('Aún no inicias sesión')
			router.replace('login')
		}
	},
	methods:{
		addProduct(){
	        this.axios.post(GLOBAL.url+'producto', this.product, {headers: {authorization:localStorage.getItem('token')}})
	        .then((response) => {
	        		        
	        		this.axios.put(GLOBAL.url+'upload-image-product/'+this.product.Id_prod, this.formData, {headers: {authorization:localStorage.getItem('token')}})
	        		.then((response) => {
	          		//console.log(response);
	          		//toastr.success(response.data.product, 'Response');
	          		this.clear();
	          		alert('El producto se registró de manera correcta')
	          		this.product={}
	          		
	          	});
	        })
	        .catch((err)=>{
	        	alert('Error')
	        	this.clear();
	          	alert('El producto se registró de manera correcta')
	          	this.product={}
	        })
		},
		onFileSelected (event) {
         const file = event.target.files[0];
         const formDataa = new FormData();
         formDataa.append("Str_img", file);
         this.formData= formDataa;
      },
      clear(){
      	var inputs = document.getElementsByTagName("input");
      	var txtDesc = document.getElementById("txtDescripcion");
			for(var i=0;i<inputs.length;i++){
				inputs[i].value = "";				
      	}
      	txtDesc.value="";
      	this.idNotUnique=false
		},
		validateId(){
			let id = this.product.Id_prod
			var boton = document.getElementById('btn-agregar');
			this.axios.get(GLOBAL.url+'producto-validacion/'+id)
				.then((response)=>{
					document.getElementById("btn-agregar").disabled=true
					this.idNotUnique=true
				})
				.catch((err)=>{
					document.getElementById("btn-agregar").disabled=false;
					this.idNotUnique=false
				})
		},
		getDataApi(){
			this.axios.get(GLOBAL.url+'categoria')
				.then((response)=>{
					this.categories=''				
					this.categories=response.data
					console.log(this.categories)
				})
				.catch((err)=>{
					console.log(err)
				})
		}
	}
}
</script>

<style>
	.box-content{
		margin-top: 50px;
	}
</style>