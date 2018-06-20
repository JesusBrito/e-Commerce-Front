<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
			<div class="hero-body">
			    <p class="title has-text-black">
				    Datos personales
				</p>
				<p class="subtitle has-text-black">
				    
				</p>
			</div>
		</section>
		<div class="columns box-content">
			<div class="column"></div>
			<div class="column is-twoo-fifths">
				<form @submit.prevent="validateBeforeSubmit()">
					<div class="field">
					  <label class="label">RFC <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" disabled="true" type="text" placeholder="RFC" maxlength="14" required="true" v-model="cliente.RFC"  pattern="^([A-ZÑ a-zñ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z a-z]|[0-9]){2}([A]|[0-9]){1})?$" title="El Rfc debe tener un formato valido">
					    <span v-show="this.rfcUnique" class="help is-danger">El RFC ya está registrado</span>
					  </div>
					</div>

					<div class="field">
					  <label class="label">Nombre <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" maxlength="30" type="text" placeholder="Nombre" pattern="[a-zñA-ZÑ À-ž\s]*" title="El nombre debe ser de tipo texto sin caracteres especiales" required="true" v-model="cliente.Nombre">
					  </div>
					</div>
					
					<div class="field">
					  <label class="label">Apellido paterno <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" maxlength="20" type="text" placeholder="Apellido paterno" pattern="[a-zñA-ZÑ À-ž\s]*" title="El apellido debe ser de tipo texto sin caracteres especiales" required="true" v-model="cliente.Ap_Pat">
					  </div>
					</div>
			
					<div class="field">
					  <label class="label">Apellido materno <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" maxlength="20" type="text" placeholder="Apellido materno" pattern="[a-zñA-ZÑ À-ž\s]*" title="El apellido debe ser de tipo texto sin caracteres especiales" required="true" v-model="cliente.Ap_Mat">
					  </div>
					</div>
					
					<div class="field">
					  <label class="label">Calle <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" type="text" maxlength="30" placeholder="Calle" required="true" pattern="[a-zñA-ZÑ À-ž\s]*" title="La calle debe ser de tipo texto sin caracteres especiales" v-model="cliente.Calle">
					  </div>
					</div>			
					
					<div class="field">
					  <label class="label">Colonia <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" type="text" maxlength="35" placeholder="Colonia" required="true" pattern="[a-zñA-ZÑ À-ž\s]*" title="La colonia debe ser de tipo texto sin caracteres especiales" v-model="cliente.Colonia">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Número <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" type="text" minlength="1" maxlength="5" 
					    pattern="/[0-9]{*,5}/" placeholder="Número" required="true" title="El numero es de tipo numerico" v-model="cliente.Numero">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Código postal <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" type="text" minlength="5"  maxlength="5" placeholder="Código postal" required="true" title="El código postal es de tipo numerico y de 5 carácteres" pattern="[0-9]{5}" v-model="cliente.Cp">
					  </div>
					</div>
					
					<div class="field">
					  <label class="label">Estado <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <div class="select ">
					        <select name="estados" required="true" v-model="cliente.Estado" v-on:change="validaEstado">
							<option >Aguascalientes</option>
							<option >Baja California</option>
							<option >Baja California Sur</option>
							<option >Campeche</option>
							<option >Coahuila de Zaragoza</option>
							<option >Colima</option>
							<option >Chiapas</option>
							<option >Chihuahua</option>
							<option >CDMX</option>
							<option >Durango</option>
							<option >Guanajuato</option>
							<option >Guerrero</option>
							<option >Hidalgo</option>
							<option >Jalisco</option>
							<option >México</option>
							<option >Michoacán de Ocampo</option>
							<option >Morelos</option>
							<option >Nayarit</option>
							<option >Nuevo León</option>
							<option >Oaxaca</option>
							<option >Puebla</option>
							<option >Querétaro</option>
							<option >Quintana Roo</option>
							<option >San Luis Potosí</option>
							<option >Sinaloa</option>
							<option >Sonora</option>
							<option >Tabasco</option>
							<option >Tamaulipas</option>
							<option >Tlaxcala</option>
							<option >Veracruz</option>
							<option >Yucatán</option>
							<option >Zacatecas</option>
					      </select>
					      </div>
					      	<div class="help is-danger">
					      		<span v-show="this.estados" class="help is-danger">Actualmente nuestros servicio de entrega solo está disponible en la CDMX, Estado de México, Puebla y Morelos. Puede crear su cuenta pero no podrá realizar compras.</span>
					    	</div>
					  </div>
					</div>

					<div class="field">
					  <label class="label">Ciudad <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input class="input" maxlength="20" pattern="[a-zñA-ZÑ À-ž\s]*" title="La ciudad es de tipo texto, sin números ni caracteres especiales" type="text" placeholder="Ciudad" required="true" v-model="cliente.Ciudad">
					  </div>
					</div>
					
					<div class="field">
					  <label class="label">Teléfono <span class="has-text-danger has-text-weight-bold">*</span></label>
					    <input class="input" type="num" minlength="8" maxlength="10" placeholder="Telefono" required="true" v-model="cliente.Telefono">
					</div>

					<div class="field">
					  <label class="label">Email <span class="has-text-danger has-text-weight-bold">*</span></label>
					    <input v-validate="'email'" name="email" disabled="true" class="input" type="text" placeholder="Email" required="true" v-model="cliente.Email" maxlength="40" >
					    <span v-show="this.emailUnique" class="help is-danger">El Email ya está registrado</span>

					</div>
					<div class="help is-danger" v-show="errors.any()">
					    <div v-show="errors.has('email')">
					      {{ errors.first('email') }}
					    </div>
					</div>
				
					<div class="field is-grouped">
					  <div class="control">
					    <button id="btn-registrar" class="button is-link">Guardar cambios</button>
					  </div>
					  <div class="control">
					  	<router-link :to="{ name:'ListaProductos'}" class="button is-danger">
					              Cancelar
					    </router-link>
					  </div>
					</div>
				</form>
			</div>
			<div class="column"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
import router from './../router'
import VeeValidate from 'vee-validate';
import Vue from 'vue'
import {GLOBAL} from '../services/global'
Vue.use(VeeValidate);
export default{
	data(){
		return{
			cliente:{},
			rfcUnique:'',
			emailUnique:'',
			rfcClient:'',
			estados:''
		}
	},
	created:function(){
		this.rfcClient=localStorage.getItem('RFC')
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
	    validateBeforeSubmit() {
	      this.$validator.validateAll().then((response)=>{
	          if(response){
	          	console.log('Resp'+response)
	          	alert('Datos llenados correctamente')
	          	this.updateClient()
	          }else{
	          	alert('Verifique que los campos de hayan llenado correctamente')
	          }
	        })
	    },
	    updateClient(){
	    		console.log(this.cliente)
		        this.axios.put(GLOBAL.url+'update-client/'+this.rfcClient, this.cliente,
		        	{headers: {authorization:localStorage.getItem('token')}})
		        .then((response) => {
		        	alert('Los datos se han modificado de manera satisfactoria')
		        	localStorage.setItem('Estado', this.cliente.Estado)      
		        })
		        .catch((err)=>{
		        	alert('Error al actualizar los datos');
		        })
		},
		getDataApi(){
			this.axios.get(GLOBAL.url+'client/'+this.rfcClient, {headers: {authorization:localStorage.getItem('token')}})
				.then((response)=>{
					
					console.log(response.data[0])

					var data ={
							Ap_Mat : response.data[0].Ap_Mat,
							Ap_Pat : response.data[0].Ap_Pat,
							Calle : response.data[0].Calle,
							Ciudad : response.data[0].Ciudad,
							Colonia : response.data[0].Colonia, 
							Cp : response.data[0].Cp,
							Email : response.data[0].Email,
							Estado : response.data[0].Estado,
							Nombre : response.data[0].Nombre,
							Numero : response.data[0].Numero,
							RFC : response.data[0].RFC,
							Role : response.data[0].Role,
							Telefono : response.data[0].Telefono,
					}
					this.cliente= data
					console.log(this.cliente)
				});
					
		},
		validaEstado(){
			if(this.cliente.Estado=='CDMX'||this.cliente.Estado=='México'||this.cliente.Estado=='Puebla'||this.cliente.Estado=='Morelos'){
				this.estados=false
			}else{
				this.estados=true
			}
		}
	}
}
</script>
<style>
	.box-content{
		margin-top: 50px;
	}
</style>