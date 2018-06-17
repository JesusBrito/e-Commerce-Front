<template>
	<div class="columns box-content">
		<div class="column"></div>
		<div class="column is-twoo-fifths">
			<div class="card login">
			  	<header class="card-header header-titulo" >
				    <p class="card-header-title titulo">
				      Bienvenido
				    </p>
				    <a href="#" class="card-header-icon"></a>
				</header>
			  	<div class="card-content">
					<form v-on:submit.prevent="loginUser">
						<div class="correo">
						  <p class="control has-icons-left has-icons-right">
						    <input class="input" type="text" placeholder="RFC" required pattern="^([A-ZÑ a-zñ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z a-z]|[0-9]){2}([A]|[0-9]){1})?$" title="El Rfc no tiene el formato correcto" v-model="userToLogued.Rfc">
						    <span class="icon is-small is-left">
						      <i class="fas fa-user"></i>
						    </span>
						  </p>
						</div>
						<div class="pass" >
						  	<p class="control has-icons-left">
						    	<input class="input" type="password" placeholder="Password" required v-model="userToLogued.Password">
						    	<span class="icon is-small is-left">
						      		<i class="fas fa-lock"></i>
						    	</span>
						  	</p>
						</div>
						<p class="card-footer-item">
					      <span>
						    <button type="submit" class="button is-info large is-rounded is-outlined">Iniciar sesión</button>
					      </span>
					    </p>
					</form>
				</div>

					  <div class="card-footer">
					    <p class="card-footer-item">
					      <span>
					      	Si no tienes cuenta puedes registrarte 
					      	<router-link :to="{ name: 'RegistrarCliente'}">
					                Aqui
					        </router-link>
					      </span>
					    </p>
					    <p class="card-footer-item">
					      <span>
					      	¿Olvidaste tu contraseña?
					        <router-link :to="{ name: 'RecuperarPassword'}">
					                -Da click aquí
					        </router-link>
					      </span>
					    </p>
					</div> 
				</div>		
		</div>
		<div class="column"></div>
	</div>	
</template>
<script>
	import router from './../router'
	import {GLOBAL} from '../services/global'
	export default{
		data(){
			return{
				userToLogued:{}
			}
		},
		created:function(){
			var authenticated=localStorage.getItem("token")
			if(authenticated){
				router.replace('lista-productos')
			}
		},
		methods:{
			loginUser(){
		        this.axios.post(GLOBAL.url+'login', this.userToLogued)
			        .then((response) => {
			        		let userResponse= response.data
			        		let token
					        let isLogued 
					        let role 
			        		localStorage.setItem('RFC', userResponse.client.RFC)
			        		localStorage.setItem('Email',userResponse.client.Email)
			        		localStorage.setItem('Rol', userResponse.client.Role)
			        		localStorage.setItem('Estado', userResponse.client.Estado)
				       		role= userResponse.client.Role
			        		this.userToLogued.gethash='True'
			        		this.axios.post(GLOBAL.url+'login', this.userToLogued)
			        			.then((response) => {
			        				this.userToLogued={}
					        		token= response.data.token;
					        		localStorage.setItem('token', token)
					        		
					        		this.$emit('authenticated', true)
					        		//this.$emit('role', role)
					        		router.replace('lista-productos')
			          			})
			        })
			        .catch((err)=>{
			        	alert('Usuario o contraseña incorrectos');
			        	var inputs = document.getElementsByTagName("input");
						for(var i=0;i<inputs.length;i++){
							inputs[i].value = "";				
				      	}
				      	this.userToLogued={}
					})
			}
		}
	}
</script>
<style>
	.box-content{
		margin-top: 100px;
	}
	.login{
		align-items: center;
		justify-content: center
	}
	.titulo{
		
		color: #FFFFFF;
		font-size :35px;
	}
	.header-titulo{
		background-color: #00D1B2;
		padding:15px;
		text-align: center;
	}
	.correo{
		margin-bottom: 45px;
	}
	.pass{
		margin-top: 25px;
		margin-bottom: 45px;
	}
	.large{
		width: 280px;
		height: 40px;
	}
</style>