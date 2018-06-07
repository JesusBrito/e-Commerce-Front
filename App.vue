<template>
<div>
  <nav class="navbar is-black is-fixed-top">
    <div class="navbar-brand">
      <router-link :to="{ name: 'ListaProductos' }" 
                class="navbar-item">
                Muebles Metálicos Reforma
      </router-link>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu">
      
      <div class="navbar-start" v-if="role=='Admin'">
        <router-link :to="{ name: 'Productos' }" 
              class="navbar-item">
                Productos
        </router-link>
      </div>

      <div class="navbar-start" v-else>
      
        <router-link :to="{ name: 'ListaCategorias' }" 
                class="navbar-item">
                Categorías
        </router-link>

        <router-link :to="{ name: 'ListaProductos' }" 
              class="navbar-item">
                Productos
        </router-link>
      </div>

      <div class="navbar-end" v-if="role=='Client'">
        <router-link :to="{ name: 'Carrito' }" 
                class="navbar-item" v-if="authenticated">
                <i class="fas fa-shopping-cart "></i>
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable" v-if="authenticated">
          <a class="navbar-link" >
            <i class="far fa-user"></i>
          </a>
          <div class="navbar-dropdown is-boxed">
            <router-link :to="{ name: 'DatosPersonales'}" class="navbar-item">
              Visualizar datos personales
            </router-link>
            <router-link :to="{ name: 'VisualizarComprasCliente'}" class="navbar-item">
              Visualizar compras
            </router-link>
            <router-link :to="{ name: 'ActualizarPassword'}" class="navbar-item">
              Cambiar contraseña
            </router-link>
          </div>
        </div>  

        <div class="navbar-item">
            <p class="control" v-show="authenticated">
              <button
                class="bd-tw-button button"               
                @click="logout()">
                  Cerrar sesión
              </button>
            </p>
        </div>

      </div>

      <div class="navbar-end" v-else>
        <div class="navbar-item has-dropdown is-hoverable" v-if="authenticated">
          <a class="navbar-link" >
            <i class="far fa-user"></i>
          </a>
          <div class="navbar-dropdown is-boxed">
            <router-link :to="{name: 'Clientes'}" 
                class="navbar-item">
                Visualizar clientes
            </router-link>
            <router-link :to="{ name: 'RegistrarProducto' }" 
                class="navbar-item">
                Agregar producto
            </router-link>
            <router-link :to="{ name: 'Ventas' }" 
                class="navbar-item">
                Visualizar ventas
            </router-link>
          </div>
        </div>  

        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
            <router-link :to="{ name: 'Login'}" 
                class="bd-tw-button button"
                v-if="!authenticated">
                  Iniciar sesión
              </router-link>
            </p>
            <p class="control">
              <router-link :to="{ name: 'RegistrarCliente'}" 
                class="bd-tw-button button" v-if="!authenticated">
                  Registrate
              </router-link>
            </p>
            <p class="control">
              <button
                class="bd-tw-button button"
                v-if="authenticated"
                @click="logout()">
                  Cerrar sesión
              </button>
            </p>
          </div>
        </div>
      </div>

    </div>
  </nav>
  
  <div>
    <router-view @authenticated="setAuthenticated">
    
    </router-view>
  </div>

</div>
</template>

<script>

import router from '././router'


import Vue from 'vue'
import VeeValidate from 'vee-validate'
import es from 'vee-validate/dist/locale/es'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'es'
})

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    es
  }
})


export default {
  data (){
    return {
      Producto:'',
      authenticated:'',
      role:''
    }
  },
  created:function(){
    let role=localStorage.getItem('Rol')
    if(role){
      this.authenticated=true
      this.role=role
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.authenticated=false
      alert('Sesión cerrada satisfactoriamente')
      router.replace('lista-productos')
      this.authenticated=false
      this.role=''
    },
    getDataApi(){
      router.push({ name: 'ListaProductos', params: { name: this.Producto }})
    },
    setAuthenticated(status){
      alert('Bienvenido')
      this.authenticated=status
      this.role=localStorage.getItem('Rol')
    }
  }
}
</script>

<style>

</style>
