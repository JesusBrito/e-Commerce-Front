<template>
	<div>
		<section class="box-content hero is-primary hero-titulo">
		  <div class="hero-body">
		    <p class="title has-text-black">
		      Actualiza tu contraseña
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
					  <label class="label">Ingresar contraseña <span class="has-text-danger has-text-weight-bold" >*</span></label>
					  <div class="control">
					    <input class="input" type="password" placeholder="Contraseña actual" required="true"  v-model="validacion.Password">
					  </div>
					</div>
					<div class="field">
					  <label class="label">Contraseña nueva <span class="has-text-danger has-text-weight-bold" >*</span><span class="has-text-weight-normal"> Debe contener por lo menos una mayúscula, una minúscula, un número, un cáracter especial y de una extensión de 8 dígitos mínimo y 20 máximo</span></label>
					  <div class="control">
					    <input class="input" type="password" placeholder="Contraseña nueva" name="password" required="true" pattern="(?=^.{8,20}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" title="La contraseña no tiene la estructura adecuada"  v-model="cliente.Password">
					  </div>
					</div>

					<div class="field">
					  <label class="label">Repetir contraseña nueva <span class="has-text-danger has-text-weight-bold" >*</span></label>
					  <div class="control">
					    <input v-validate="'required|confirmed:password'" name="password_confirmation"  class="input" type="password" placeholder="Repetir contraseña actual" required="true">
					  </div>
					</div>

					<div class="help is-danger" v-show="errors.any()">
					    <div class="is-danger" v-if="errors.has('password')">
					      {{ errors.first('password') }}
					    </div>
					    <div class="is-danger" v-if="errors.has('password_confirmation')">
					      {{ errors.first('password_confirmation') }}
					    </div>
					</div>
				
					<div class="field is-grouped">
					  <div class="control">
					    <button id="btn-registrar" class="button is-link">Actualizar contraseña</button>
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
			validacion:{},
			cliente:{}
		}
	},
	created:function(){
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
	methods: {
	    validateBeforeSubmit() {
	      this.$validator.validateAll().then((response)=>{
	          if(response){
	          	this.updatePasswordClient()
	          }else{
	          	alert('Verifique que los campos de hayan llenado correctamente')
	          }
	        })
	    },
	    updatePasswordClient(){
	    	this.validacion.Rfc=localStorage.getItem('RFC')
	    	this.axios.post(GLOBAL.url+'login', this.validacion)
			    .then((response) => {
			    	this.axios.put(GLOBAL.url+'update-client/'+this.validacion.Rfc,
			    		this.cliente,{headers: {authorization:localStorage.getItem('token')}})
				        .then((response) => {
				        	alert('La contraseña se ha modificado satisfactoriamente')	        
				          	router.replace('lista-productos')	
				        })      	
			    })
			    .catch((err)=>{
			       	alert('Contraseña incorrecta, no se puede modificar la contraseña')
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