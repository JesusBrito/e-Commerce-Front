<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
			  <div class="hero-body">
			    <p class="title has-text-black">
			      Carrito de compras
			    </p>
			    <p class="subtitle has-text-black">
			      Cuando finalices tu compra se abrirá una nueva ventana para que realices tu pago con paypal
			    </p>
			  </div>
		</section>
		<div class="columns box-content">
			<div class="column"></div>
			<div class="column is-three-fifths">
				<table class="table is-striped is-hoverable is-fullwidth" id="tableCar">
				  <thead>
				    <tr >
				      <th><abbr title="Id">Id producto</abbr></th>
				      <th><abbr title="Nombre">Nombre</abbr></th>
				      <th><abbr title="Color">Color</abbr></th>
				      <th><abbr title="Precio">Precio</abbr></th>
				      <th><abbr title="Cantidad">Cantidad</abbr></th>
				      <th><abbr title="Subtotal">Subtotal</abbr></th>
				      <th><abbr title="Operaciones">Operaciones</abbr></th>
				    </tr>
				  </thead>
					<tbody>
				    <tr v-for='Product in Car'>
				      	<td>{{Product.ProductoIdProd}}</td>
				      	<td>{{Product.nombre}}</td>
				      	<td>{{Product.color}}</td>
					    <td>${{Product.Precio}}</td>
					    <td>{{Product.Cantidad}}</td>
					    <td>${{Product.Subtotal}}</td>
					    <td>
					    	<button @click='incrementar(Product)' class="button is-link">+</button>
							<button @click='disminuir(Product)' class="button is-grey-dark">-</button>
							<button @click='deleteProd(Product)' class="button is-danger">x</button>
						</td>
				    </tr>
				 </tbody>
				</table>
			</div>

			<div class="column ">
				<div class="card">
				  <header class="card-header">
				    <p class="card-header-title">
				      Resumen de pedido 
				    </p>
				    <p>
				    </p>
				  </header>
				  <div class="card-content">
				    <div class="content">
				      Envío: ${{costo}}
				    </div>
				  </div>
				  <div class="card-content">
				    <div class="content">
				      Subtotal: ${{subTotal}}
				    </div>
				  </div>
					
				  <div class="card-content">
				    <div class="content">
				      Iva: ${{iva}}
				    </div>
				  </div>

				  <div class="card-content">
				    <div class="content">
				      Total: ${{total}}
				    </div>
				  </div>
				  <div class="card-content">
					  <input type="checkbox" v-model="generarFactura">
		  				Marcar si desea factura
		  			</div>

				  <footer class="card-footer">
					<div class="columns">
						<div class="column"></div>
						<div class="column">
							<div v-if='valPago'> 
								<PayPal
    								:amount="Total"
    								currency="MXN"
    								:client="paypal"
    								@payment-completed="saveSale"
    								env="sandbox">
  								</PayPal>
  							</div>
						</div>
						<div class="column"></div>					
					</div>	
				  </footer>
				</div>
			</div>
			<div class="column"></div>
		</div>
	</div>
</template>
<script>
import {GLOBAL} from '../services/global'
import router from './../router'
import Datepicker from 'vue-bulma-datepicker'
import jsPDF from 'jspdf'
import jsPDFa from 'jspdf-autotable'
import toastr from 'toastr';
import PayPal from 'vue-paypal-checkout'
import Vue from 'vue'
import Countdown from './Countdown.vue';
Vue.use(PayPal)
export default{
	components:{PayPal,Countdown},
	props:['amount'],
	data(){
		return{
			Car:'',
			generarFactura:false,
			Subtotal:'',
			Iva:'',
			Total:'',
			Costo:'',
			saleToSend:{},
			noVenta:'',
			paypal: {
      		sandbox: 'ATk7GR9gFJL5TgPQgUBPgtgsH8wg3XBXw_Fhivnzk1ShN-coPqt5x_Yyo3zuXGok5rbHgl0ECx0x1Bix',
    		},
    		valPago:false,
    		date:'August 22'
		}
	},
	created: function(){
		var rol= localStorage.getItem('Rol')
		if(rol){
			if(rol=='Admin'){
				router.replace('productos')
			}	
			var storeLocal=localStorage.getItem('carStorage')
			if(storeLocal){
				var store= JSON.parse(storeLocal) || [];	
				this.Car=store
			}else{
				this.Car=[]
			}
		}else{
			alert('Aún no inicias sesión')
			router.replace('login')
		}
		this.validaCarrito()
		console.log(this.Car)
	},
    computed : {
	    subTotal: function() {
	      	let sum = 0
	      	var subtotal= this.Car.reduce((sum, item) => sum + parseFloat(item.Subtotal), 0)
	      	this.Subtotal= subtotal.toFixed(2)
	      	return subtotal
	    },
	  	iva: function() {
	  		var iva=0
	  		iva = this.Subtotal*.16
	  		this.Iva= iva.toFixed(2)
	      	return this.Iva	
	    },
	  	costo: function() {
	  		var costo=0
	  		costo= this.Subtotal*.20
	  		this.Costo=costo.toFixed(2)
	      	return this.Costo
	    },
	  	total: function() {
	  		var total=0
	  		total= (this.Subtotal*1.16)+ parseFloat(this.Costo)
	  		this.Total=total.toFixed(2)
	      	return this.Total
	    }
  	},
	methods:{
		generatePdf(){
			var doc = new jsPDF({
				orientation: 'p',
				unit: 'pt',
				format: 'a4'});
				var fecha_actual = new Date()
				var costo =this.Costo
				var subtotal = this.Subtotal
				var iva = this.Iva
				var total = this.Total
				var noventa = this.noVenta

				var nombreNota="Nota de compra "+noventa+".pdf"
				
				var elem = document.getElementById("tableCar");
				var res = doc.autoTableHtmlToJson(elem);
							
				var titulo
				if(this.generarFactura){
					titulo='Factura'
				}else{
					titulo='Nota de compra'
				}

				doc.autoTable(res.columns.splice(0,6), res.data.splice(0, 6),{

				
				theme: 'striped',
				startY: 150,
				styles: {fillColor: [26, 163, 255]},

				margin: {top: 150},
				addPageContent: function(data) {
				   	doc.setFontSize(20);
				   	doc.text(titulo,40, 30);
				   	//doc.text('Venta',40, 40);
				   	doc.setFontSize(11);
				   	doc.text('Muebles Metálicos Reforma',40, 50)
				   	doc.text('Venta realizada el día: '+fecha_actual ,40, 60)
				   	doc.text('Costo envío: $'+costo,40, 80)
				   	doc.text('Subtotal: $'+subtotal,40, 90)
				   	doc.text('Iva: $'+ iva,40, 100)
				   	doc.text('Total: $'+ total,40, 110)
			    }
			});
			doc.save()
		},
		deleteProd(Product, valid){
			if(!valid){
				if(confirm('¿Estás seguro de eliminar del carrito?')) {
			        alert('Eliminado')
			        this.Car.forEach((elemento, indice, array)=>{

	    				if((elemento.ProductoIdProd==Product.ProductoIdProd)&&(elemento.ColoreIdColor==Product.ColoreIdColor)){
	    					this.Car.splice(indice, indice+1)
	    					if(this.Car.length<1){
	    						localStorage.removeItem('carStorage')
	    					}else{
	    						localStorage.setItem('carStorage',  JSON.stringify(this.Car))
	    					}
	    				}
					})
			     }	
			}else{
				this.Car.forEach((elemento, indice, array)=>{
	    				if((elemento.ProductoIdProd==Product.ProductoIdProd)&&(elemento.ColoreIdColor==Product.ColoreIdColor)){
	    					this.Car.splice(indice, indice+1)
	    					if(this.Car.length<1){
	    						localStorage.removeItem('carStorage')
	    					}else{
	    						localStorage.setItem('carStorage',  JSON.stringify(this.Car))
	    					}
	    				}
				})
			}
			this.validaCarrito()
		},	
		incrementar(Product) {
		   	this.Car.forEach((elemento, indice, array)=>{
    			if((elemento.ProductoIdProd==Product.ProductoIdProd)&&(elemento.ColoreIdColor==Product.ColoreIdColor)){
    				this.Car[indice].Cantidad++
    				this.Car[indice].Subtotal= this.Car[indice].Cantidad* this.Car[indice].Precio
    				if(this.Car[indice].Cantidad>this.Car[indice].Stock){
    					alert('No puedes hacer una compra mayor al stock actual')
						this.validaStock()
					}else if(this.Car[indice].Cantidad>20){
						alert('No puedes hacer una compra mayor a 20 artículos por producto')
						this.validaCantidades()
					}
    				if(this.Car.length<1){
    					localStorage.removeItem('carStorage')
    				}else{
    					localStorage.setItem('carStorage',  JSON.stringify(this.Car))
    				}
    			}
			})
		},
		disminuir(Product) {
		   	this.Car.forEach((elemento, indice, array)=>{
    			if((elemento.ProductoIdProd==Product.ProductoIdProd)&&(elemento.ColoreIdColor==Product.ColoreIdColor)){
    				this.Car[indice].Cantidad--
    				this.Car[indice].Subtotal= this.Car[indice].Cantidad* this.Car[indice].Precio
    				if(this.Car[indice].Cantidad<=this.Car[indice].Stock){
						this.validaCantidades();
					}
    				if(this.Car[indice].Cantidad<1){
    					this.deleteProd(this.Car[indice], true)
    				}else{
    					localStorage.setItem('carStorage',  JSON.stringify(this.Car))
    				}
    			}
			})
		},
		saveSale(){
			var fecha_actual = new Date()
			this.saleToSend.Fecha= fecha_actual
			this.saleToSend.Estatus= 'P'
			this.saleToSend.Costo_envio= parseFloat(this.Costo)
			this.saleToSend.Subtotal= parseFloat(this.Subtotal)
			this.saleToSend.Iva= parseFloat(this.Iva)
			this.saleToSend.Total= parseFloat(this.Total)
			this.saleToSend.ClienteRFC = localStorage.getItem('RFC')

			if(this.Car.length>0){
				this.axios.post(GLOBAL.url+'sale', this.saleToSend, {headers: {authorization:localStorage.getItem('token')}})
		        .then((response) => {

		        	for(var item of this.Car){
		        		item.VentaNoVenta=response.data.No_Venta
		        		this.axios.post(GLOBAL.url+'sale-detail', item, {headers: {authorization:localStorage.getItem('token')}})
			        		.then((response) => {
			        			console.log('ok')
			        		})
			        		.catch((err)=>{
			        			alert(err)
			        		})
		        	}
		        	alert('La venta se registró de manera adecuada')
		        	this.generatePdf()
		        	localStorage.removeItem('carStorage')
		        	this.Car=[]   
		        })
		        .catch((err)=>{
		        	alert('Error'+err);
		        })
			}else{
				alert('No hay productos en el carrito')
			}
		},
		validaCantidades(){
			let contador=0
			this.Car.forEach((elemento, indice, array)=>{
				if(elemento.Cantidad>20){
					contador++
				}
			})
			if(contador>0){
				this.valPago=false
			}else{
				this.valPago=true
			}
		},
		validaStock(){
			let contador=0
			this.Car.forEach((elemento, indice, array)=>{
				if(elemento.Cantidad>elemento.Stock){
					contador++
				}
			})
			if(contador>0){
				this.valPago=false
			}else{
				this.valPago=true
			}	
		},
		validaCarrito(){
			let tam= this.Car.length
			console.log("tamaño:"+tam)
			if(tam>0){
				this.valPago=true
			}else{
				this.valPago=false
			}	
		}
	}
}
</script>
<style type="text/css">
	.box-content{
		margin-top: 50px;
	}
	.finish{
		margin: 10px;
		background-color:#F0C14C;
	}
</style>