<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
					  <div class="hero-body">
					    <p class="title has-text-black">
					      Descripción de producto
					    </p>
					  </div>
		</section>
		<div class="columns box-content">
			<div class="column"></div>
			<div class="column is-four-fifths">
				<p class="is-size-2">{{product.Nombre}}<p>

				<div class="columns">
					<div class="column  is-twoo-fifths">
						<figure class="image img-product">
						     <img :src="`https://e-commerce-mmr.herokuapp.com/get-image-product/${product.Str_img}`" alt="Placeholder image">
						</figure>
					</div>

					<div class="column is-size-6">
						<p>Descripción: {{product.Descripcion}}</p>
						<p>Alto: {{product.Alto}} cm</p>
						<p>Largo: {{product.Largo}} cm</p>
						<p>Ancho: {{product.Ancho}} cm</p>
						<p>Stock: {{almacen.Stock}} piezas</p>
					</div>

					<div class="column">
						<form @submit.prevent="addStore()">
							<div class="field">
							  <label class="label">Color</label>
							  <div class="control">
							    <div class="select" @change="almacenColor">
							      <select required="true" v-model="product.Color">
							        <option v-for='color in colors' :value="color.Id_Color">{{color.Nombre_Color}}</option>
							      </select>
							    </div>
							  </div>
							</div>
							<div>
								<label class="label has-text-danger is-size-6">Precio</label>
								<div class="field has-addons has-addons-right">
								  <p class="control">
								    <span class="select">
								      <select>
								        <option>$</option>
								      </select>
								    </span>
								  </p>
								  <p class="control">
								    <input class="input" type="text" placeholder="Amount of money" readonly="true" v-model="almacen.Precio">
								  </p>
								  <p class="control">
								    <p class="button">
								      MXN
								    </p>
								  </p>
								</div>
							</div>
							<div class="field">
								<label class="label is-size-6">Cantidad</label>
								<div class="control">
									<input class="input" type="number" min="1" max="20" title="Ingresa un valor entero" placeholder="Número" required="true" v-model="cantidad" @change="valStock" @keyup="valStock" id="btnCantidad" disabled="true">
								</div>
							</div>

							<div v-if='logued'>
								<button id="btnAgregar" disabled="true" class="button is-info">Agregar al carrito</button>
							</div>
							<div v-else>
								<p>Para agregar al carrito debes iniciar sesión</p>
							</div>
						</form>
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
			product:{},
			colors:{},
			cantidad:'',
			logued:'',
			idProd:'',
			estado:'',
			almacen:{}
		}
	},
	created:function(){
		let id= this.$route.params.id_prod
		var rol= localStorage.getItem('Rol')
		if(rol){
			this.logued=true
			if(rol=='Admin'){
				router.replace('productos')
			}
			this.estado= localStorage.getItem('Estado')
		}

		if(id){
			localStorage.setItem('producto',id)
			this.idProd=id
		}else{
			this.idProd=(localStorage.getItem('producto'))
		}
		this.getDataApi()
	},
	methods:{
		getDataApi(){
			let uri =GLOBAL.url+'producto/'+this.idProd
			this.axios.get(uri)
				.then((response)=>{
					this.product=response.data[0]
					this.getColors()
				})		
		},
		addStore(){
			var contador=0
			if(this.estado == 'CDMX'||this.estado == 'México'||this.estado == 'Puebla'||this.estado == 'Morelos'){
				var storeStored=(localStorage.getItem('carStorage'))

				var color

				this.colors.forEach((elemento, indice, array)=>{
					if(elemento.Id_Color==this.product.Color){
						color= elemento.Nombre_Color
					}
				})

				if(storeStored){
					var store= JSON.parse(storeStored)
					console.log(store)
					store.forEach((elemento, indice, array)=>{
		    			if(elemento.ProductoIdProd==this.idProd){
		    				if(elemento.ColoreIdColor==this.product.Color){
		    					contador++
		    					if((parseInt(elemento.Cantidad)+ parseInt(this.cantidad))>this.almacen.Stock){
		    						alert('El producto ya se encuentra en el carrito y supera el stock en almacén')
		    					}else if((parseInt(elemento.Cantidad)+ parseInt(this.cantidad))>20){
		    						alert('El límite de compra por producto es de 20')
		    					}else{    						
			    					elemento.Cantidad= parseInt(elemento.Cantidad)+ parseInt(this.cantidad)
			    					elemento.Subtotal=parseFloat(elemento.Precio)* parseFloat(elemento.Cantidad)
			    					localStorage.setItem('carStorage',  JSON.stringify(store))
			    					alert('El producto ya se encuentra en el carrito y se ha actualizado')
		    					}
		    				}
		    			}
					})
					if(contador<1){
		    				store.push({
		    							AlmacenColorIdAlmColor: this.almacen.Id_Alm_Color,
			    						ProductoIdProd: this.idProd, 
			    						nombre: this.product.Nombre, 
			    						Precio:this.almacen.Precio, 
			    						Cantidad:this.cantidad, 
			    						Subtotal:this.cantidad*this.almacen.Precio,
			    						ColoreIdColor:this.product.Color,
			    						color:color, 
			    						Stock:this.almacen.Stock
			    						})
								localStorage.setItem('carStorage', JSON.stringify(store))
								alert('El producto se agregó correctamente al carrito asd')
		    				}

					console.log(store)
				}else{
					var store =[]
					store.push({
								AlmacenColorIdAlmColor: this.almacen.Id_Alm_Color,
								ProductoIdProd: this.idProd, 
								nombre: this.product.Nombre, 
								Precio:this.almacen.Precio, 
								Cantidad:this.cantidad, 
								Subtotal:this.cantidad*this.almacen.Precio,
								ColoreIdColor:this.product.Color, 
								color:color, 
								Stock:this.almacen.Stock
								})
					localStorage.setItem('carStorage', JSON.stringify(store))
					alert('El producto se agregó correctamente al carrito nel prro')
					console.log(store)
				}
				this.cantidad=''
			}else{

				alert('No se puede agregar el producto al carrito ya que no te encuentras dentro del área metropolitana')
			}
		},
		valStock(){
			if(this.cantidad>this.almacen.Stock){
				alert('No puedes hacer una compra mayor a : '+this.almacen.Stock)
				document.getElementById('btnAgregar').disabled=true
			}else{
				document.getElementById('btnAgregar').disabled=false
			}

			
		},
		getColors(){
			let uri =GLOBAL.url+'color'
			this.axios.get(uri)
				.then((response)=>{
					this.colors=response.data
				});
		},
		almacenColor(){
			this.axios.get(GLOBAL.url+'almacen-color/'+this.product.Color+'/'+this.idProd+'')
				.then((response)=>{
					this.almacen={}
					this.almacen=response.data			
					if(this.almacen==''){
						alert('No hay productos disponibles con ese color')						
					}
					document.getElementById('btnCantidad').disabled=false
					document.getElementById('btnAgregar').disabled=false
				})
				.catch((err)=>{
					alert('No hay productos disponibles con ese color')
					document.getElementById('btnCantidad').disabled=true
					document.getElementById('btnAgregar').disabled=true	
				})
		}
	}
}
</script>

<style>
	.box-content{
		margin-top: 50px;
	}
	.img-product img{ 
		width: 70%;
	}
</style>