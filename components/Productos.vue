<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
			<div class="hero-body">
			    <p class="title has-text-black">
				    Productos registrados
				</p>
				<p class="subtitle has-text-black">
				  Si deseas visualizar un producto en especifico ingresa el id en la siguiente caja de texto.
				  <br>
				  Da click sobre el nombre del producto para conocer sus detalles o modificarlo  
				</p>
			</div>
		</section>
		<div class=" box-content">
		<div class=" columns field is-grouped box-content">
			<div class="column is-1"></div>
				<div class="column is-5 ">

					<div class="field is-horizontal">
						<div class="field-label is-normal">
						    <label class="label">Id. Producto</label>
						</div>
						<div class="field-body">
							    <div class="field">
								    <p class="control is-expanded has-icons-right">
								        <input class="input" type="text" step="any" placeholder="Id de producto" v-model="id_prod" v-on:keyup="getDataApi" v-on:change="getDataApi">
										<span class="icon is-small is-right">
									    	<i class="fas fa-search"></i>
										</span>
								    </p>
								</div>
						</div>
					</div>
				</div>
			<div class="column is-6"></div>
		</div>	
		<div class="columns">
			<div class="column"></div>
			<div class="column is-four-fifths">	
			<table class="table is-striped is-hoverable is-fullwidth">
			  <thead>
			    <tr>
			      <th><abbr title="Id">Id producto</abbr></th>
			      <th><abbr title="Nombre">Nombre</abbr></th>
			      <th><abbr title="Precio">Precio</abbr></th>
			      <th><abbr title="Stock">Stock</abbr></th>
			      <th><abbr title="Imagen">Imágen</abbr></th>
			      <th><abbr title="Categoria">Categoría</abbr></th>
			    </tr>
			  </thead>
				
				<tbody>
			    <tr v-for= "product in products">
			      <td>{{product.Id_prod}}</td>
			      <td>
			      	<router-link :to="{ name: 'DetalleProductoAdmin', params: {id_prod: product.Id_prod}}">
	                {{product.Nombre}}
	      			</router-link>
			   	</td>
			      <td>{{product.Precio}}</td>
			      <td>{{product.Stock}}</td>
			      <td>
			      	<figure class="image is-48x48">
					      <img :src="`https://e-commerce-mmr.herokuapp.com/get-image-product/${product.Str_img}`" alt="Placeholder image">
					   </figure>
					</td>
			      <td v-for="(itemInCategory, key, index ) in product.Categoria" v-if="index==1">
			      	{{itemInCategory}}
			      </td>
			    </tr>
			 </tbody>
			</table>

			</div>
			<div class="column"></div>
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
			products:[],
			id_prod:''
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
		getDataApi(){
			this.axios.get(GLOBAL.url+'producto/'+this.id_prod)
				.then((response)=>{
					this.products=''				
					this.products=response.data
				});
		}
	}
}
</script>

<style>
	.box-content{
		margin-top: 50px;
	}
</style>