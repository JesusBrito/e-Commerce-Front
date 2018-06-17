import Vue from 'vue'
import Router from 'vue-router'
import ListaProductos from '@/components/ListaProductos'
import Categorias from '@/components/Categorias'
import DetalleProducto from '@/components/DetalleProducto'
import RegistrarProducto from '@/components/RegistrarProducto'
import DetalleProductoAdmin from '@/components/DetalleProductoAdmin'
import Productos from '@/components/Productos'
import Clientes from '@/components/Clientes'
import Ventas from '@/components/Ventas'
import DetalleVentaAdmin from '@/components/DetalleVentaAdmin'
import RegistrarCliente from '@/components/RegistrarCliente'
import Carrito from '@/components/Carrito'
import Login from '@/components/Login'
import DatosPersonales from '@/components/DatosPersonales'
import ProductosCategoria from '@/components/ProductosCategoria'
import ActualizarPassword from '@/components/ActualizarPassword'
import RecuperarPassword from '@/components/RecuperarPassword'
import VisualizarComprasCliente from '@/components/VisualizarComprasCliente'
import ActualizarStock from '@/components/ActualizarStock'
import RegistrarAlmacen from '@/components/RegistrarAlmacen'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/datos-personales',
      name: 'DatosPersonales',
      component: DatosPersonales
    },
    {
      path: '/',
      redirect: '/lista-productos',
      component:ListaProductos
    },
    {
      path: '/lista-productos',
      name:'ListaProductos',
      component:ListaProductos
    },
    {
      path: '/detalle-producto',
      name:'DetalleProducto',
      component:DetalleProducto
    },
    {
      path: '/categorias',
      name:'ListaCategorias',
      component:Categorias
    },
    {
      path: '/registrar-producto',
      name:'RegistrarProducto',
      component:RegistrarProducto
    },
    {
      path: '/detalle-producto-admin',
      name:'DetalleProductoAdmin',
      component:DetalleProductoAdmin
    },
    {
      path: '/productos',
      name:'Productos',
      component:Productos
    },
    {
      path: '/clientes',
      name:'Clientes',
      component:Clientes
    },
    {
      path: '/ventas',
      name:'Ventas',
      component:Ventas
    },
    {
      path: '/detalle-venta-admin',
      name:'DetalleVentaAdmin',
      component:DetalleVentaAdmin
    },
    {
      path: '/registrar-cliente',
      name: 'RegistrarCliente',
      component: RegistrarCliente
    },{
      path:'/carrito',
      name:'Carrito',
      component: Carrito
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/productos-categoria',
      name:'ProductosCategoria',
      component: ProductosCategoria
    },
    {
      path:'/actualizar-password',
      name:'ActualizarPassword',
      component: ActualizarPassword
    },
    {
      path:'/recuperar-contraseña',
      name:'RecuperarPassword',
      component: RecuperarPassword
    },
    {
      path:'/visualizar-compras',
      name:'VisualizarComprasCliente',
      component: VisualizarComprasCliente
    },
    {
      path:'/actualiza-stock',
      name:'ActualizarStock',
      component: ActualizarStock
    },
    {
      path:'/registrar-almacen',
      name:'RegistrarAlmacen',
      component: RegistrarAlmacen
    }
  ]
})

export default router
