<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
			<div class="hero-body">
			    <p class="title has-text-black">
				    Clientes
				</p>
				<p class="subtitle has-text-black">
				  Si deseas visualizar un cliente en específico ingresa su RFC en la siguiente caja de texto. 
				</p>
			</div>
		</section>
		<div class=" box-content">
		<div class=" columns field is-grouped box-content">
			<div class="column is-1"></div>
				<div class="column is-5">


					<div class="field is-horizontal">
						<div class="field-label is-normal">
						    <label class="label">RFC</label>
						</div>
						<div class="field-body">
							    <div class="field">
								    <p class="control is-expanded has-icons-right">
								        <input class="input" type="text" placeholder="RFC de cliente" v-model="rfcCliente" v-on:keyup="getDataApi">
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
			      <th><abbr title="RFC">RFC</abbr></th>
			      <th><abbr title="Nombre">Nombre</abbr></th>
			      <th><abbr title="Direccion">Dirección</abbr></th>
			      <th><abbr title="Telefono">Teléfono</abbr></th>
			    </tr>
			  </thead>
				
				<tbody>
			    <tr v-for= "client in clients">
			      <td>{{client.RFC}}</td>
			      <td>{{client.Nombre}} {{client.Ap_Mat}} {{client.Ap_Pat}}</td>
			      <td>{{client.Calle}} {{client.Colonia}} {{client.Numero}} {{client.Ciudad}} {{client.Estado}} {{client.Cp}}</td>
			      <td>{{client.Telefono}}</td>
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
			clients:[],
			rfcCliente:''
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
			let uri =GLOBAL.url+'client/'+this.rfcCliente
			this.axios.get(uri,{headers: {authorization:localStorage.getItem('token')}})
				.then((response)=>{
					this.clients=''						
					this.clients=response.data

					if(this.clients==''){
						alert('No hay un cliente con ese RFC')						
					}
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