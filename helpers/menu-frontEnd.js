
const getMenuFrontEnd = (role = 'USER_ROLE') => {
    
    const menu = [
      { titulo: 'Mi Perfil', icono: 'mdi mdi-account-alert', url: '/dashboard/perfil' },
      //{ titulo: 'Mis Documentos', icono: 'mdi mdi-folder-lock-open', url: '/dashboard/documentos/mis-documentos' },
       //{ titulo: 'Usuarios', icono: 'ti-user', url: '/dashboard/usuarios' },
       //{ titulo: 'Nuevo Documento', icono: 'mdi mdi-folder-lock-open', url: '/dashboard/nuevo-documento' },
       //{ titulo: 'Documentos Generales', icono: 'mdi mdi-folder-lock-open', url: '/dashboard/documentos' },    
  ];

  if( role === 'ADMIN_ROLE' ) {
    menu.unshift({ titulo: 'Documentos Generales', icono: 'mdi mdi-folder-lock-open', url: '/dashboard/documentos' });
    menu.unshift({ titulo: 'Nuevo Documento', icono: 'mdi mdi-clipboard-text', url: '/dashboard/nuevo-documento' });
    menu.unshift({ titulo: 'Usuarios', icono: 'mdi mdi-account-settings', url: '/dashboard/usuarios' });
  }

  return menu;

}

module.exports = {
    getMenuFrontEnd
}