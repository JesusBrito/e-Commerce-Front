<template>
	<div v-if='cargado'>
		<section class="box-content hero is-primary hero-titulo">
		  <div class="hero-body">
		    <p class="title has-text-black">
		      Productos
		    </p>
		    <p class="subtitle has-text-black">
		      Busca en la caja de texto el nombre de algún producto
		    </p>
		  </div>
		</section>
		<div class="box-content container">

			<div class=" columns field is-grouped ">
				<div class="column is-5 ">
					<div class="field is-horizontal">
						<div class="field-label is-normal">
						    <label class="label">Nombre</label>
						</div>
						  <div class="field-body">
						    <div class="field">
						      <p class="control is-expanded has-icons-right">
						        <input class="input" type="text" placeholder="Nombre del producto" 
						        v-model="nombre" v-on:keyup="getDataApi">
								<span class="icon is-small is-right">
							    	<i class="fas fa-search"></i>
								</span>
						      </p>
						    </div>
						</div>
					</div>
				</div>
			</div>	


			<div class="columns is-multiline">
				<div class="column is-one-fifth" v-for= "product in products">
					<div class="card" >
						<div class="card-image">
							<figure class=" image is-4by5">
						      <img :src="`https://e-commerce-mmr.herokuapp.com/get-image-product/${product.Str_img}`" alt="Placeholder image">
						   </figure>
						</div>
						<div class="card-content">
						   <div class="media">
						      <div class="media-left">
							      <figure class="image is-48x48">
							         <img :src="`https://e-commerce-mmr.herokuapp.com/get-image-product/${product.Str_img}`" alt="Placeholder image">
							      </figure>
							   </div>
							      <div class="media-content">
							        <p class="title is-4">{{product.Nombre}}</p>
							   </div>
							</div>
							<div class="content">
							   <p>{{product.Descripcion}}</p>
							   <p>$ {{product.Precio}}</p>
							   <router-link :to="{ name: 'DetalleProducto', params: {id_prod: product.Id_prod}}" class="button is-info is-rounded">
					              Ver detalles
					            </router-link>
						   </div>
						</div>
					</div>	
				</div>	
			</div>				
		</div>
	</div>
	<div v-else>
		<div class="spinner">
		    <img src="../assets/loading.svg" alt="loading"/>
		</div>
	</div>
</template>

<script>
import router from './../router'
import {GLOBAL} from '../services/global'
export default{
	data(){
		return{
			products:{},
			nombre:'',
			cargado:''
		}
	},
	created:function(){
		this.nombre=''
		this.getDataApi()
		var rol= localStorage.getItem('Rol')
		if(rol=='Admin'){
			router.replace('productos')
		}
	},
	methods:{
		getDataApi(){
			this.axios.get(GLOBAL.url+'producto-client/'+this.nombre)
				.then((response)=>{
					this.products=response.data
					this.cargado=false
					if(this.products==''){
						alert('No existen productos con un nombre similar')

					}
					this.cargado=true
				})
		}
	}
}
</script>

<style>
	.box-content{
		margin-top: 50px;
	}
	.spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>