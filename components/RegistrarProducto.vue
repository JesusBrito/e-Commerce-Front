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
					  <label class="label">Id  de producto (1 letra mayúscula seguido de 2 o más números)</label>
					  <div class="control">
					    <input class="input" type="text" v-on:keyup="validateId" placeholder="Id de producto" required="true" maxlength="6" v-model="product.Id_prod" pattern="^([A-Z\x26]{1}([0-9]{2,}))?$">
					    <span v-show="this.idNotUnique" class="help is-danger">El id ya está registrado</span>
					  </div>
					</div>

					<div class="field">
					  <label class="label">Nombre</label>
					  <div class="control">
					    <input class="input" type="text" placeholder="Nombre" pattern="[a-zA-ZÀ-ž\s]*" required="true" v-model="product.Nombre">
					  </div>
					</div>
			
					<div class="field">
						<label class="label">Descripción</label>
						<div class="control">
							<textarea class="textarea" v-validate="'alpha_spaces'" maxlength="80" name="descripcion" id="txtDescripcion" placeholder="Descripción" required="true" v-model="product.Descripcion"></textarea>
						</div>
					</div>

					<div class="help is-danger" v-show="errors.any()">
					    <div v-show="errors.has('descripcion')">
					      {{ errors.first('descripcion') }}
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
					  <label class="label">Categoría</label>
					  <div class="control">
					    <div class="select">


					      <select required="true" v-model="product.CategoriaIdCategoria">
					        <option v-for="category in categories" :value="category.Id_Categoria"> 
					        	{{category.Nombre_Categoria}}
					    	</option>
					      </select>
							{{product.CategoriaIdCategoria}}



					    </div>
					  </div>
					</div>
					<div class="field">
					  <label class="label">Alto (cm)</label>
					  <div class="control">
					    <input class="input" type="number" max="100" step="any" min="1" placeholder="Alto" required="true" v-model="product.Alto">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Largo (cm)</label>
					  <div class="control">
					    <input class="input" type="number" max="100" step="any" min="1" placeholder="Largo" required="true" v-model="product.Largo">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Ancho (cm)</label>
					  <div class="control">
					    <input class="input"  type="number" step="any" max="100" min="1" placeholder="Ancho" required="true" v-model="product.Ancho">
					  </div>
					</div>
					
							<label for="myfile" class="label"> Imagen de producto</label>
							  <div class="file is-medium has-name is-boxed is-dark">
							    <label class="file-label">
							      <input class="file-input" type="file" @change="onFileSelected" name="myfile" v-validate="'image'">
							      <span class="file-cta">
							        <span class="file-icon">
							          <i class="fas fa-cloud-upload-alt"></i>
							        </span>
							        <span class="file-label">
							          Carga imagen
							        </span>
							      </span>
							      	<span class="file-name" id="filename">
        					
      								</span>
							      <span class="help is-danger">{{ errors.first('myfile') }}</span>
							    </label>
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
		validateBeforeSubmit() {
	      this.$validator.validateAll().then((response)=>{
	          if(response){
	          	alert('Datos llenados correctamente')
	          	this.addProduct()
	          }else{
	          	alert('Verifique que los campos de hayan llenado correctamente')
	          }
	        })
	    },
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
      
			document.getElementById('filename').innerHTML = file.name
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