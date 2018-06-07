<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
				  <div class="hero-body">
				    <p class="title has-text-black" v-if="Rol=='Admin'">
				      Detalle de venta 
				    </p>
				    <p class="title has-text-black" v-else>
				    	Detalle de compra
				    </p>
				    <p v-if="Rol=='Admin'" class="subtitle has-text-black">
				      En esta sección puedes modificar el estatus de la compra o agregar el número de rastreo
				    </p>
				  </div>
		</section>
		<div class=" box-content columns">
			<div class="column"></div>
			<div class="column is-four-fifths">
			
				<div>

					<div class="field is-horizontal">
					  	<div class="field-body">
					  		<div class="field-label is-normal">
					    		<label class="label">No. venta </label>
					  		</div>
					    	<div class="field">
					      	<p class="control is-expanded">
					        		<input class="input" type="text" disabled="true" v-model="sale.No_Venta">
					      	</p>
					    	</div>
					    	<div class="field-label is-normal">
					    		<label class="label">Fecha</label>
					  		</div>
							<div class="field">
					      	<p class="control is-expanded">
					        		<input class="input" type="text" disabled="true" v-model="sale.Fecha">
					      	</p>
					    	</div>
					  	</div>
					</div>

					<div class="field is-horizontal" v-if="Rol=='Admin'">
					  	<div class="field-body">
					  		<div class="field-label is-normal">
					    		<label class="label">Estatus</label>
					  		</div>
					    	<div class="field">
					      	<div class="control">
								    <div class="select">
								        <select name="estados" id="cbEstatus" v-model="sale.Estatus">
											<option>P</option>
											<option>E</option>
											<option>F</option>
										</select>

									</div>
								</div>
					    	</div>
					    	<div class="field-label is-normal">
					    		<label class="label">No. rastreo</label>
					  		</div>
							<div class="field">
					      	<p class="control ">
					        	<input class="input" type="text" placeholder="No. rastreo" v-model="sale.No_Rastreo">
					      	</p>
					    	</div>
					  	</div>
					</div>


					<div class="field is-horizontal" v-else>
					  	<div class="field-body">
					  		<div class="field-label is-normal">
					    		<label class="label">Estatus</label>
					  		</div>
					    	<div class="field">
					      	<div class="control">
								    <div class="select">
								        <select name="estados" disabled="true" id="cbEstatus" v-model="sale.Estatus">
								        	<option selected>Opción</option>
											<option>P</option>
											<option>E</option>
											<option>En</option>
										</select>

									</div>
								</div>
					    	</div>
					    	<div class="field-label is-normal">
					    		<label class="label">No. rastreo</label>
					  		</div>
							<div class="field">
					      	<p class="control ">
					        	<input class="input" disabled="true" id="txtNoRastreo" type="text" placeholder="No. rastreo" v-model="sale.No_Rastreo">
					      	</p>
					    	</div>
					  	</div>
					</div>


					<div class="field is-horizontal">
					  	<div class="field-body">
					  		<div class="field-label is-normal">
					    		<label class="label">Costo de envío</label>
					  		</div>
					    	<div class="field">
					      	<p class="control is-expanded">
					        		<input class="input" type="text" disabled="true" v-model="sale.Costo_envio">
					      	</p>
					    	</div>
					    	<div class="field-label is-normal">
					    		<label class="label">Subtotal</label>
					  		</div>
							<div class="field">
					      	<p class="control is-expanded">
					        		<input class="input" type="text" disabled="true" v-model="sale.Subtotal">
					      	</p>
					    	</div>
					  	</div>
					</div>

					<div class="field is-horizontal">
					  	<div class="field-body">
					  		<div class="field-label is-normal">
					    		<label class="label">Iva</label>
					  		</div>
					    	<div class="field">
					      	<p class="control is-expanded">
					        		<input class="input" type="text" disabled="true" v-model="sale.Iva">
					      	</p>
					    	</div>
					    	<div class="field-label is-normal">
					    		<label class="label">Total</label>
					  		</div>
							<div class="field">
					      	<p class="control is-expanded">
					        		<input class="input" type="text" disabled="true" v-model="sale.Total">
					      	</p>
					    	</div>
					  	</div>
					</div>	
					<br>
					<table class="table is-striped is-hoverable is-fullwidth">
					  <thead>
					    <tr>
					      <th><abbr title="Id_producto">Id producto</abbr></th>
					      <th><abbr title="Nombre">Nombre</abbr></th>
					      <th><abbr title="Color">Color</abbr></th>
					      <th><abbr title="Cantidad">Cantidad</abbr></th>
					      <th><abbr title="Precio">Precio</abbr></th>
					      <th><abbr title="Subtotal">Subtotal</abbr></th>
					    </tr>
					  </thead>
						
						<tbody>
					    <tr v-for= "saleDetail in sale.Detalle_Venta">
					      <td>{{saleDetail.Id_Detalle}}</td>

					      <td v-for="(itemInSaleDetail, key, index ) in saleDetail"  
					      	v-if="key=='Producto'" >
					      	{{itemInSaleDetail.Nombre}}
					      </td>

					      <td v-for="(itemInSaleDetail, key, index ) in saleDetail" 
					      	v-if="key=='Colore'" >
					     	{{itemInSaleDetail.Nombre_Color}}
					      </td>

					      <td>
					      	{{saleDetail.Cantidad}}
					      </td>
					      <td>
					      	{{saleDetail.Precio}}
					      </td>
					      <td>
					      	{{saleDetail.Subtotal}}
					      </td>
					    </tr>
					 </tbody>
					</table>

					<div v-show="Rol=='Admin'" class="field is-grouped">
					  <div class="control" >
						    <a  class="button is-info is-medium" id="btn-agregar" @click='saveChanges'>Guardar cambios</a >
					  </div>
					</div>
				</div>
			</div>
			<div class="column"></div>				
		</div>
	</div>
</template>

<script>
import router from './../router'
import {GLOBAL} from '../services/global'
export default{
	data(){
		return{
			sale:{},
			Rol:''
		}
	},
	created:function(){
		localStorage.setItem('id_sale',this.$route.params.id_venta)
		this.getDataApi()
		this.Rol= localStorage.getItem('Rol')
		/*
		if(rol=='Client'){
			router.replace('productos')
		}
		*/
	
		var estatus=document.getElementById("cbEstatus")
		var rastreo=document.getElementById("txtNoRastreo")
		if(this.Rol){
			if(rol==='Admin'){
				estatus.disabled=true
				rastreo.disable=true
			}
		}else{
			alert('Aún no inicias sesión')
			router.replace('login')
		}
	},
	methods:{
		getDataApi(){
			this.axios.get(GLOBAL.url+'sale-no-venta/'+localStorage.getItem('id_sale'),{headers: {authorization: localStorage.getItem('token')}})
				.then((response)=>{					
					this.sale=response.data[0]
				})
				.catch((err)=>{
					console.log(err)
				})
		},
		saveChanges(){
			this.axios.put(GLOBAL.url+'update-sale',this.sale,{headers: {authorization: localStorage.getItem('token')}})
				.then((response)=>{					
					alert('Se modificaron los campos correctamente')
				})
				.catch((err)=>{
					alert('Error al realizar los cambios')
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