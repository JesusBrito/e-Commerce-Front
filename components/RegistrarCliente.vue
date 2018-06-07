<template>
	<div>
		<section class="hero is-primary hero-titulo">
		  <div class="hero-body">
		    <p class="title has-text-black">
		      Registrate
		    </p>
		    <p class="subtitle has-text-black">
		      Los campos marcado con un <span class="has-text-danger has-text-weight-bold" >*</span> son obligatorios
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
					    <input class="input" type="text" placeholder="RFC" maxlength="14" required="true" v-model="cliente.RFC" @keyup="verificarRfc" pattern="^([A-ZÑ a-zñ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z a-z]|[0-9]){2}([A]|[0-9]){1})?$" title="El Rfc debe tener un formato valido">
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
					    <input class="input" type="text" minlength="1"  maxlength="5" pattern="[0-9]{*,5}" placeholder="Número" required="true" title="El numero es de tipo numerico" v-model="cliente.Numero">
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
							<option >Zacatecas</option>					      </select>
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
					  <label class="label">Telefono <span class="has-text-danger has-text-weight-bold">*</span></label>
					    <input class="input" type="tel" maxlength="12" placeholder="Telefono" required="true" v-model="cliente.Telefono">
					</div>

					<div class="field">
					  <label class="label">Email <span class="has-text-danger has-text-weight-bold">*</span></label>
					    <input v-validate="'email'" name="email" class="input" type="text" placeholder="Email" required="true" v-model="cliente.Email" maxlength="40" v-on:keyup="verificarEmail">
					    <span v-show="this.emailUnique" class="help is-danger">El Email ya está registrado</span>

					</div>
					<div class="help is-danger" v-show="errors.any()">
					    <div v-show="errors.has('email')">
					      {{ errors.first('email') }}
					    </div>
					</div>
					<div class="field">
					  <label class="label">Contraseña <span class="has-text-danger has-text-weight-bold">*</span> <span class="has-text-weight-normal"> Debe contener por lo menos una mayuscula, una minuscula, un numero, un cáracter especíal y de una extención de 8 digitos mínimo y 20 máximo</span></label>
					  <div class="control">
					    <input class="input" type="password" placeholder="Contraseña" name="password" required="true" pattern="(?=^.{8,20}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" title="La contraseña no tiene la estructura adecuada"  v-model="cliente.Password">
					  </div>
					</div>



					<div class="field">
					  <label class="label">Repetir contraseña <span class="has-text-danger has-text-weight-bold">*</span></label>
					  <div class="control">
					    <input v-validate="'required|confirmed:password'" name="password_confirmation"  class="input" type="password" placeholder="Repetir contraseña" required="true">
					  </div>
					</div>

					<div class="help is-danger" v-show="errors.any()">
					    <div v-show="errors.has('password')">
					      {{ errors.first('password') }}
					    </div>
					    <div class="is-danger" v-show="errors.has('password_confirmation')">
					      {{ errors.first('password_confirmation') }}
					    </div>
					</div>
				
					<div class="field is-grouped">
					  <div class="control">
					    <button id="btn-registrar" class="button is-link">Registrar</button>
					  </div>
					  <div class="control">
					  	<router-link :to="{ name:'Login'}" class="button is-danger">
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

import Vue from 'vue'
import {GLOBAL} from '../services/global'

import VeeValidate from 'vee-validate'
import es from 'vee-validate/dist/locale/es'
import VueI18n from 'vue-i18n'

Vue.use(VeeValidate)

export default{
	data(){
		return{
			cliente:{},
			rfcUnique:'',
			emailUnique:'',
			estados:''
		}
	},
	created:function(){
		var rol= localStorage.getItem('Rol')
		if(rol=='Admin'){
			router.replace('productos')
		}
	},
	methods: {
	    validateBeforeSubmit() {
	      this.$validator.validateAll().then((response)=>{
	          if(response){
	          	alert('Datos llenados correctamente')
	          	this.addClient()
	          }else{
	          	alert('Verifique que los campos de hayan llenado correctamente')
	          }
	        })
	    },
	    verificarRfc(){
	    	let rfc = this.cliente.RFC
				var boton = document.getElementById('btn-registrar');
				this.axios.get(GLOBAL.url+'client-validation/'+rfc)
					.then((response)=>{
						document.getElementById("btn-registrar").disabled=true;
						this.rfcUnique=true
					})
					.catch((err)=>{
						document.getElementById("btn-registrar").disabled=false;
						this.rfcUnique=false
					})
	    },
	    verificarEmail(){
	    	let email = this.cliente.Email
			var boton = document.getElementById('btn-registrar');
			this.axios.get(GLOBAL.url+'client-validation/'+email)
				.then((response)=>{
					document.getElementById("btn-registrar").disabled=true;
					this.emailUnique=true
				})
				.catch((err)=>{
					document.getElementById("btn-registrar").disabled=false;
					this.emailUnique=false
				})
	    },
	    addClient(){
	    	this.cliente.Role='Client'

	        this.axios.post(GLOBAL.url+'register', this.cliente)
	        .then((response) => {
	        	alert('Te haz registrado de manera satisfactoria')	        
	          	router.replace('login')	
	        })
	        .catch((err)=>{
	        	alert('Error');
	        })
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
		margin-top: 10px;
	}
	.hero-titulo{
		margin-top: 30px;
	}
</style>