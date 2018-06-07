<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
			<div class="hero-body">
			    <p class="title has-text-black">
				    Detalle de producto
				</p>
				<p class="subtitle has-text-black">
				  En esta sección podrás modificar es estatus de producto, agregar stock o modificar los datos de éste. 
				</p>
			</div>
		</section>
	
		<div class="columns box-content">
			<div class="column"></div>
			<div class="column is-three-fifths">
				<form v-on:submit.prevent="editProduct" id="registerForm">	

					<div class="field">
					  <label class="label">Id  de producto</label>
					  <div class="control">
					    <input class="input" type="text" placeholder="Id de producto" required="true" v-model="product.Id_prod" disabled="true">
					    <span v-show="this.emailUnique" class="help is-danger">El id ya está registrado</span>
					  </div>
					</div>
					<div class="field">
					  <label class="label">Nombre</label>
					  <div class="control">
					    <input class="input" type="text" placeholder="Nombre" required="true" v-model="product.Nombre">
					  </div>
					</div>
			
					<div class="field">
						<label class="label">Descripción</label>
						<div class="control">
							<textarea class="textarea" placeholder="Descripción" required="true" v-model="product.Descripcion"></textarea>
						</div>
					</div>
					
					<div class="field">
					  <label class="label">Precio</label>
					  <div class="control">
					    <input class="input" type="number" step="any" min="1" required="true" placeholder="Precio" v-model="product.Precio">
					  </div>
					</div>
					<div class="columns">
						<div class="column is-half">
							<div class="field">
							  <label class="label">Stock</label>
							  <div class="control">
							    <input class="input" type="number" min="0" placeholder="Stock" required="true" v-model="product.Stock" disabled="True">
							  </div>
							</div>
						</div>
						<div class="column is-half">
							<div class="columns">
								<div class="column is-three-fifths">
									<div class="field">
									  <label class="label">Agregar stock</label>
									  <div class="control">
									    <input class="input" id="nuevoStock" type="number" min="0" placeholder="Stock" v-model="stock.stock">
									  </div>
									</div>	
								</div>
								<div class="column">
									<br>
									<div class="control">
									    <button class="button is-info is-rounded" @click="addStock">Agregar</button>
									</div>
								</div>
							</div>
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
					<div class="columns">
						<div class="column is-three-fifths">
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
							    <button class="button is-primary is-medium" id="btn-agregar">Guardar cambios</button>
							  </div>
							</div>
						</div>
						<div class="column is-two-fifths" >
							<div class="media-left">
							      <figure class="image ">
							         <img :src="`https://e-commerce-mmr.herokuapp.com/get-image-product/${product.Str_img}`" alt="Placeholder image">
							      </figure>
							   </div>
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
import {GLOBAL} from '../services/global'
import toastr from 'toastr';
import VeeValidate from 'vee-validate';
import Vue from 'vue'
Vue.use(VeeValidate);
export default{
	formData:'',
	data(){
		return{
			emailUnique:'',
			product:{},
			stock:{}
		}
	},
	created:function(){
		this.getDataApi()
		var rol= localStorage.getItem('Rol')
		if(rol=='Client'){
			router.replace('lista-productos')
		}
	},
	methods:{
		editProduct(){
		toastr.success('Response')
        this.axios.put(GLOBAL.url+'producto', this.product, {headers:{authorization:  localStorage.getItem('token')}})
        .then((response) => {
        		if(this.formData){  
	        		this.axios.put(GLOBAL.url+'upload-image-product/'+this.product.Id_prod, this.formData, {headers:{authorization:  localStorage.getItem('token')}})
	        		.then((response) => {      		
	          		})
	        	}
	        	alert('El producto se modificó de manera correcta'); 
        })
        .catch((err)=>{
        	alert('Error'+err);
        })
		},
		onFileSelected (event) {
         const file = event.target.files[0];
         const formDataa = new FormData();
         formDataa.append("Str_img", file);
         this.formData= formDataa;
      	},
		getDataApi(){
			let uri =GLOBAL.url+'producto/'+this.$route.params.id_prod
			this.axios.get(uri)
				.then((response)=>{
					this.product=response.data[0]
				});
				
		},
		addStock(){
			this.stock.Id_prod=this.product.Id_prod

	        this.axios.put(GLOBAL.url+'producto-add-stock', this.stock,
	        	{headers: {authorization:localStorage.getItem('token')}})
	        .then((response) => {
	        	this.product.Stock+= parseInt(this.stock.stock)

	        	var input = document.getElementById("nuevoStock");
				input.value = ''
				this.stock.stock=''			
	        })
	        .catch((err)=>{
	        	alert('Error al agregar el stock ')
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