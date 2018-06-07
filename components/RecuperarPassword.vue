<template>
	<div>
		<section class="hero is-primary hero-titulo">
			<div class="hero-body">
			    <p class="title has-text-black">
			      Recuperación de contraseña
			    </p>
			    <p class="subtitle has-text-black">
			      Sigue los pasos para poder recuperar tu cuenta
			    </p>
			</div>
		</section>
		<div class="columns box-content">
			<div class="column"></div>
			<div class="column is-twoo-fifths">
				<form @submit.prevent="changePasswordClient">
					<div class="field">
					  <label class="label">Ingresar RFC</label>
					  <div class="control">
					    <input class="input" type="text" placeholder="RFC" required="true"  v-model="dataToSend.Rfc">
					  </div>
					</div>
					<div class="field is-grouped">
					    <div class="control">
					    	<button id="btn-registrar" class="button is-link">Envíar</button>
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
import {GLOBAL} from '../services/global'
export default{
	data(){
		return{
			dataToSend:{}
		}
	},
	created:function(){
		var rol= localStorage.getItem('Rol')
		
		if(rol=='Admin'){
			router.replace('productos')
		}
	},
	methods: {
	    changePasswordClient(){
	    	console.log(this.dataToSend)
			this.axios.post(GLOBAL.url+'reset-password',this.dataToSend)
			    .then((response) =>{
			       		alert('Revisa tu email para seguir con el proceso de recuperación')
			       		router.replace('login')
			        })
			    .catch((err)=>{
			        alert('Error al envíar el correo'+err);
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