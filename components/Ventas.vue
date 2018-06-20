<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
			<div class="hero-body">
			    <p class="title has-text-black">
				    Ventas realizadas
				</p>
				<p class="subtitle has-text-black">
				  Si deseas visualizar una venta en específico ingresa el id de la venta en la siguiente caja de texto.
				  <br>
				  Da click sobre el No. de venta para conocer sus detalles  
				</p>
			</div>
		</section>
		<div class="container">
		<div class=" box-content columns" >
			<div class="column"></div>
			<div class="column is-four-fifths">
				<h1>Buscar ventas</h1>
				<label class="checkbox">
	  				<input type="checkbox" v-model="bucarFecha"  @change="getDataApi">
	  				Buscar compra por fecha
				</label>
				<label class="checkbox">
	  				<input type="checkbox" v-model="bucarId"  @change="getDataApi">
	  				Buscar compra por id de venta
				</label>
				<div class=" columns field is-grouped" v-if="bucarFecha">
					<div class="column is-half">
						<div>
							<datepicker placeholder="Fecha de inicio" :config="{ dateFormat: 'Y-m-d', static: true }" v-model="dates.fechaini"></datepicker>
					   </div>
					</div>
					<div class="column is-half">
						<div class="field has-addons">
						  <div class="control">
						   	<datepicker placeholder="Fecha fin" :config="{ dateFormat: 'Y-m-d', static: true }" v-model="dates.fechafin"></datepicker>
						  </div>
						  <div class="control">
						    <a class="button is-info" @click='valDates'>Buscar por fecha</a>
						  </div>
						</div>	
					</div>	
				</div>
				<div class=" columns field is-grouped" v-if="bucarId">
					<div class="column"></div>
					<div class="column is-half">
						<div class="field has-addons">
						  <div class="control">
						    <input class="input" type="number" step="any" placeholder="Id de venta" v-model='idVenta' @keyup='searchById'  @change='searchById'>
						  </div>
						</div>
					</div>	
				</div>
				<table class="table is-striped is-hoverable is-fullwidth" id="tableSells">
				  	<thead>
				    	<tr>
				      	<th><abbr title="No. venta">No. venta</abbr></th>
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
					      <td>
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
			<div class="column"></div>
			<a class="button is-warning" @click='generatePdf'>Imprimir reporte</a>			
		</div>
	</div>
</div>
</template>

<script>
import router from './../router'
import Datepicker from 'vue-bulma-datepicker'
import jsPDF from 'jspdf'
import jsPDFa from 'jspdf-autotable'
import {GLOBAL} from '../services/global'
export default{
	components:{
		Datepicker
	},
	data(){
		return{
			idVenta:'',
			bucarFecha:false,
			bucarId:false,
			dates:{},
			sales:{},
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
			this.axios.post(GLOBAL.url+'sale-admin','',{headers: {authorization:localStorage.getItem('token')}})
				.then((response)=>{
					this.sales=''				
					this.sales=response.data
					console.log(this.sales)
				})
				.catch((err)=>{
					alert('Error:'+ err)
				})
		},
		searchByDate(){
			this.axios.post(GLOBAL.url+'sale-admin',this.dates,{headers: {authorization:localStorage.getItem('token')}})
				.then((response)=>{
					this.sales=''
					this.sales=response.data			
					if(this.sales==''){
						alert('No hay ventas registradas en este rango de fechas')						
					}
				})
				.catch((err)=>{
					alert('Error:'+ err)
				})
		},
		searchById(){

			if(this.idVenta){
				this.axios.get(GLOBAL.url+'sale-no-venta/'+this.idVenta,{headers: {authorization:localStorage.getItem('token')}})
				.then((response)=>{
					this.sales=''
					this.sales=response.data			
					if(this.sales==''){
						alert('No hay una venta registrada con ese Id')						
					}
				})
				.catch((err)=>{
					alert('Error:'+ err)
				})
			}else{
				this.getDataApi()
			}
		},
		generatePdf(){
			var doc = new jsPDF({
  				orientation: 'p',
  				unit: 'pt',
  				format: 'a4'});
			var fecha_actual = new Date()
			var fechaIni= this.dates.fechaini;
			var fechaFin= this.dates.fechafin ;

			var elem = document.getElementById("tableSells");
			var res = doc.autoTableHtmlToJson(elem);
			
			doc.autoTable(res.columns, res.data,{
				theme: 'striped',
			    styles: {fillColor: [26, 163, 255]},

			    margin: {top: 100},
			    addPageContent: function(data) {
			    	doc.setFontSize(16);
			    	doc.text('Reporte de ventas',40, 30);
			    	doc.setFontSize(11);
			    	doc.text('Reporte generado el día: '+fecha_actual ,40, 50)

					if(fechaIni&&fechaFin){
						doc.text('Fecha inicial: '+fechaIni, 40, 70)

						doc.text('Fecha final: '+fechaFin, 40, 90)
					}

			    }
			});
			doc.save("table.pdf");
		},
		valDates(){
			var fecha_actual = new Date()
			var fecha_fin = new Date(this.dates.fechafin)
			var fecha_ini = new Date(this.dates.fechaini)

			if(fecha_actual.getTime()<fecha_fin.getTime()){
				alert('Fecha incorrecta. La fecha de fin no puede ser posterior a la fecha actual')
			}else if(fecha_fin.getTime()<fecha_ini.getTime()){
				alert('Fechas incorrectas. La fecha fin debe ser anterior a la fecha inicial')
				
			}else{
				this.searchByDate()
			}
		}
	}
}
</script>

<style>
	.box-content{
		margin-top: 50px;
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