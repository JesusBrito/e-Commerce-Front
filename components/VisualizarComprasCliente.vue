<template>
<div>
	<section class="box-content hero is-primary hero-titulo">
		<div class="hero-body">
		    <p class="title has-text-black">
			    Compras realizadas
			</p>
			<p class="subtitle has-text-black">
			  Si deseas visualizar una compra en especifico ingresa el id de la compra en la siguiente caja de texto.
			  <br>
			  Da click sobre el No de compra para conocer sus detalles  
			</p>
		</div>
	</section>
	<div class=" box-content container">
		<div class=" columns field is-grouped box-content">
			<div class="column is-5 ">
				<div class="field is-horizontal">
					<div class="field-label is-normal">
					    <label class="label">No. compra</label>
					</div>
					<div class="field-body">
					    <div class="field">
						    <p class="control is-expanded has-icons-right">
						        <input class="input" type="number" step="any" placeholder="No de compra" v-model='idVenta' @keyup='searchById'@change='searchById'>
								<span class="icon is-small is-right">
							    	<i class="fas fa-search"></i>
								</span>
						    </p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<table class="table is-striped is-hoverable is-fullwidth" id="tableSells">
				  	<thead>
				    	<tr>
					      	<th><abbr title="No. venta">No. compra</abbr></th>
					      	<th><abbr title="Estatus">Estatus</abbr></th>
					      	<th><abbr title="Fecha">Fecha</abbr></th>
					      	<th><abbr title="Total">Total</abbr></th>
					    	</tr>
					  	</thead>	
						<tbody>
						   <tr v-for= "sale in sales" v-bind:class="[sale, 
						   		(sale.Estatus === 'P') ? 'pendiente': 
						   		(sale.Estatus === 'E') ? 'enviado': 
						   		'finalizada' ]" >
						    <td >
						    <router-link :to="{ name: 'DetalleVentaAdmin', params: {id_venta: sale.No_Venta}}">
				            	{{sale.No_Venta}}
				      		</router-link></td>
						    <td>{{sale.Estatus}}</td>
						    <td>{{sale.Fecha}}</td>
						    <td>{{sale.Total}}</td>
						</tr>
					 	</tbody>
					</table>
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
			idVenta:'',
			sales:{}
		}
	},
	created:function(){
		this.getDataApi()
		var rol= localStorage.getItem('Rol')
		if(rol){
			if(rol=='Admin'){
				router.replace('productos')
			}
		}else{
			alert('Aún no inicias sesión')
			router.replace('login')
		}
	},
	methods:{
		getDataApi(){
			this.axios.get(GLOBAL.url+'sale-client/'+localStorage.getItem('RFC'),{headers: {authorization:localStorage.getItem('token')}})
				.then((response)=>{
					this.sales=''				
					this.sales=response.data
					console.log(this.sales)
				})
				.catch((err)=>{
					console.log(err)
				})
		},
		searchById(){
			if(this.idVenta){
				this.axios.get(GLOBAL.url+'sale-no-venta/'+this.idVenta,{headers: {authorization:localStorage.getItem('token')}})
					.then((response)=>{
						//this.sales=''			
						this.sales=response.data
						if(this.sales==''){
							alert('No hay una compra registrada con ese número')						
						}
					})
					.catch((err)=>{
						console.log(err)
					})
			}
			else{
				this.getDataApi()
			}
		}
	}
}
</script>

<style>
	.box-content{
		margin-top: 40px;
	}
	.finalizada{
		color: #00AC29
	}
	.enviado{
		color: #EB7605
	}
	.pendiente{
		color: #D40000
	}
</style>