<template>
<div>
	<section class="box-content hero is-primary hero-titulo">
		<div class="hero-body">
		    <p class="title has-text-black">
			    Categorías
			</p>
			<p class="subtitle has-text-black">
			    Selecciona una de las categorías
			</p>
		</div>
	</section>
	<div class="container" >
		<div class="box-content columns is-multiline">
			<div class="column is-one-fifths" v-for= "category in categories">
				<div class="card product">
					<div class="card-image">
						<figure class="image ">
					      <img :src="`https://e-commerce-mmr.herokuapp.com/get-image-category/${category.Str_img}`" alt="Placeholder image">
					   </figure>
					</div>
					<div class="card-content">
					   <div class="media">
						   	<div class="media-content">
						        <p class="title is-4">{{category.Nombre_Categoria}}</p>
						   	</div>
						</div>
						<div class="content">
							<router-link :to="{ name: 'ProductosCategoria', params: {id_cat: category.Id_Categoria}}" class="button is-primary is-rounded">
								Ver productos
							</router-link>
					   </div>
					</div>
				</div>
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
			categories:[]
		}
	},
	created:function(){
		this.getDataApi()
		var rol= localStorage.getItem('Rol')
		if(rol=='Admin'){
			router.replace('productos')
		}
		localStorage.removeItem('idCategory')
	},
	methods:{
		getDataApi(){
			let uri = GLOBAL.url+'categoria'
			this.axios.get(uri)
				.then((response)=>{
					this.categories=response.data
				});
		}
	}
}
</script>

<style>
	.product{
		margin:0px;
	}
	.box-content{
		margin-top: 40px;
	}
</style>