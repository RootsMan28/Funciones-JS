function register()
{
  var nombre, aPaterno, aMaterno, numero, pass, pass1, tipoG;

  nombre = document.getElementById('nombre').value;
  apellidos = document.getElementById('apellidos').value;
  usuario = document.getElementById('usuario').value;
  pass = document.getElementById('passR').value;
  pass1 = document.getElementById('passR1').value;
  tipoG = 'registro';

  // alert(nombre+apellidos+usuario+pass+pass1);

  if(nombre != '' && apellidos != '' && usuario != '' && pass != '' && pass1 != '')
  {

    if(pass == pass1)
    {
    var datos = 'nombre='+nombre+'&apellidos='+apellidos+'&usuario='+usuario+'&pass='+pass+'&pass1='+pass1+'&tipoG='+tipoG;


      $.ajax({
          url: 'view/ajax/inicio.php',
          type: 'POST',
          data: datos,
          success: function(data)
          {

          }
        })
        .done(function(data) {
            if(data != 0){
              location.reload();
             swal('Bienvenido','Sus datos han sido ingresados.','success');

            }else if(data == 0){
              swal("Error, ingrese otro usuario.","Ya existe una persona registrada con el usuario "+usuario+".","error");

            }
          })

    }else {
      swal('Error','No coinciden las contraseñas.','error');
      document.getElementById("pass1").focus();
      return 0;
    }
  }else
  {
    swal('Error','Algunos campos no están completados...','error');
    return 0;
  }
}


function login()
{
  var user, pass;

  user = document.getElementById('user').value;
  pass = document.getElementById('pass').value;

  if(user == '')
  {
    swal('Campo vacío','Ingrese su nombre de usuario.','error');
    document.getElementById("user").focus();
    return 0;
  }

  if(pass == '')
  {
    swal('Campo vacío','Inserte su contraseña.','error');
    document.getElementById("pass").focus();
    return 0;
  }

  tipoG = 'login';
  var datos = 'usuario='+user+'&password='+pass+'&tipoG='+tipoG;

  $.ajax({
      url: 'view/ajax/inicio.php',
      type: 'POST',
      data: datos,
      success: function(data)
      {

      }
    })
    .done(function(data) {
        if(data == 1){
         
            parent.location.href='?roots=home';
            swal('¡Bienvenido!','Acceso concedido.','success');
        }else if(data == 0){
          swal("Error","No existe dentro de nuestros registros.","error");

        }else if(data == 2)
        {
          swal("Error","Contraseña incorrecta.","error");

        }
      })
}

function add_product()
{    
  (function() {
  
  function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }


  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }

  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
  var producto, linea, numero_parte, codigo_sat, precio_paquete, precio_unitario, precio_unitario_tienda, cantidad, unidad_medida, 
  multiplo_venta, proveedor, tipo_producto, descripcion, iva,ivaF,ivaBool,suma,n,m,existencia, unitario_tiendaA, unitario_tiendaF,
  porcent_extra, suma_b;

  producto = document.getElementById('producto').value;
  linea = document.getElementById('linea').value;
  numero_parte = document.getElementById('numero_parte').value;
  codigo_sat = document.getElementById('codigo_sat').value;
  precio_paquete = document.getElementById('precio_paquete').value;
  cantidad = document.getElementById('cantidad').value;
  unidad_medida = document.getElementById('unidad_medida').value;
  multiplo_venta = document.getElementById('multiplo_venta').value;
  proveedor = document.getElementById('proveedor').value;
  tipo_producto = document.getElementById('tipo_producto').value;
  descripcion = document.getElementById('descripcion').value;
  iva = document.getElementById('iva').checked;

  if(producto == '' || linea == '' || numero_parte == '' || codigo_sat == '' || 
    precio_unitario == '' || precio_paquete == '' || cantidad == '' || unidad_medida == 0 || multiplo_venta == ''
    || proveedor == 0 || tipo_producto == 0 || descripcion == '')
  {
    swal("Error","Faltan campos por llenar.","error");
  }else{

        var ImagenName = document.getElementById("txtImagen1").value;
        var filename;
        if (ImagenName==""){
         swal("Error al guardar", "Debe seleccionar una Imagen", "error");
                document.getElementById("txtImagen1").focus();
                return 0;
            }else{
              filename = ImagenName.replace(/^.*\\/, "");
            }

    existencia = multiplo_venta*cantidad;
    porcent_extra = parseFloat(porcent_extra);
    precio_paquete = parseFloat(precio_paquete);

        if(iva)
        { 
          ivaF = precio_paquete*0.40; n=parseFloat(ivaF); m=parseFloat(precio_paquete); suma = n+m;
          suma_b = Math.ceil10(suma,1);
          ivaBool="Sí";

          if(suma == suma_b)
          {
            suma_b = suma_b+10;
          }
          suma=suma_b;

          precio_unitario=precio_paquete/multiplo_venta;
          unitario_tiendaA=suma/multiplo_venta;
          unitario_tiendaF=Math.ceil10(unitario_tiendaA,1);

          if(unitario_tiendaA == unitario_tiendaF)
          {
           unitario_tiendaF=unitario_tiendaF+10;
          }

     
        }else{ 
          ivaF = precio_paquete*0.16; n=parseFloat(ivaF); m=parseFloat(precio_paquete); suma = n+m;
          porcent_extra = suma*0.40;
          suma=suma+porcent_extra;
          suma_b=Math.ceil10(suma,1);
          ivaBool="No";

          if(suma == suma_b)
          {
            suma_b = suma_b+10;
          }
          suma=suma_b;

          precio_unitario=precio_paquete/multiplo_venta;
          unitario_tiendaA=suma/multiplo_venta;
          unitario_tiendaF=Math.ceil10(unitario_tiendaA,1);

          if(unitario_tiendaA == unitario_tiendaF)
          {
           unitario_tiendaF=unitario_tiendaF+10;
          }
          n = precio_paquete*0.16;
        }
  
    var datos = 'producto='+producto+'&linea='+linea+'&numero_parte='+numero_parte+'&codigo_sat='+codigo_sat
    +'&precio_paquete='+precio_paquete+'&precio_unitario='+precio_unitario+'&precio_unitario_tienda='+unitario_tiendaF+'&cantidad='+cantidad+'&existencia='+existencia+'&unidad_medida='+unidad_medida+'&multiplo_venta='+multiplo_venta
    +'&proveedor='+proveedor+'&tipo_producto='+tipo_producto+'&descripcion='+descripcion+'&ivaBool='+ivaBool+'&ivaAdd='+suma+'&ivaDesglose='+n+'&imagen='+filename;
// alert(datos);
     document.frm1.Mov1.value='Guardar1';
     document.frm1.submit();
    $.ajax({
      url: 'view/ajax/agregar_inventario.php',
      type: 'POST',
      data: datos,
      success: function(data)
      {

      }
    })
    .done(function(data) {
        if(data == 1){
         
            location.reload();
            swal('Añadido!','Producto agregado con éxito.','success');
        }else if(data == 0)
        {
          swal("Error","No se pudo agregar el producto.","error");

        }
      })

  }
}

function update_Product(n)
{
  (function() {
  
  function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }


  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }

  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();



  var cantidadSource = document.getElementById("cantidadHidden").value;
  var multiplo_ventaSource = document.getElementById("multiplo_ventaHidden").value;
  var existenciaSource = document.getElementById("existenciaHidden").value;
  var ivaSource = document.getElementById("ivaHidden").value;
  var precio_compraSource = document.getElementById("precio_compraHidden").value;
  var precio_unitario_compraSource = document.getElementById("precio_unitario_compraHidden").value;
  var ivaValueSource = document.getElementById("ivaValueHidden").value;
  

// alert(productoSource+" - "+cantidadSource+" - "+unidad_medidaSource+" - "+multiplo_ventaSource
//   +" - "+lineaSource+" - "+numero_parteSource+" - "+codigo_satSource+" - "+precio_paqueteSource+" - "+
//   precio_unitarioSource);

  var id_producto, producto, cantidad, multiplo_venta, linea, numero_parte, codigo_sat, precio_paquete, precio_unitario, descripcion;

  id_producto = n;
  producto = document.getElementById("productoE").value;
  cantidad = document.getElementById("cantidadE").value;
  linea = document.getElementById("lineaE").value;
  numero_parte = document.getElementById("numero_parteE").value;
  codigo_sat = document.getElementById("codigo_satE").value;
  precio_compra = document.getElementById("precio_compraE").value;
  precio_unitario_compra = document.getElementById("precio_unitario_compraE").value;
  descripcion = document.getElementById("descripcionE").value;
  var iva = document.getElementById('ivaE').checked;
  var existenciaNew, existenciaAdd, cantidadNew, cantidadAdd, precio_compraNew, precio_compraP, precio_unitario_compraNew, precio_unitario_compraP, ivaNew, ivaBoolNew, porcent_extra;

  // alert(producto+" - "+cantidad+" - "+unidad_medida+" - "+multiplo_venta
  // +" - "+linea+" - "+numero_parte+" - "+codigo_sat+" - "+precio_paquete+" - "+
  // precio_unitario+" - "+descripcion);
  
  cantidadSource = parseFloat(cantidadSource);
  cantidad = parseFloat(cantidad);
  cantidadNew = parseFloat(cantidadNew);
  existenciaSource = parseInt(existenciaSource);
  existenciaNew = parseInt(existenciaNew);
  multiplo_ventaSource = parseFloat(multiplo_ventaSource);
 
      if(cantidad == cantidadSource)
      {
        cantidadNew = cantidadSource;
        existenciaNew = existenciaSource;

      }else{
        //Sacando cantidad añadida
        cantidadAdd = cantidad-cantidadSource;
        //Cantidad total nueva
        cantidadNew = cantidadSource+cantidadAdd;
         
        //Piezas por unidad de medida añadida
        existenciaAdd = multiplo_ventaSource*cantidadAdd;

        //Existencia de acuerdo a la cantidad de unidades de medida incrementadas
        existenciaNew = existenciaSource+existenciaAdd;
      }

      //alert(cantidadNew + " "+existenciaNew);

      precio_compra = parseFloat(precio_compra);
      precio_compraSource = parseFloat(precio_compraSource);
      precio_unitario_compra = parseFloat(precio_unitario_compra);
      precio_unitario_compraSource = parseFloat(precio_unitario_compraSource);


      if(precio_compra == precio_compraSource)
      {
        precio_compraNew = precio_compraSource;
        precio_unitario_compraNew = precio_unitario_compraSource;
        ivaNew = ivaValueSource;
        ivaBoolNew = ivaSource;
        
      }else{
        ivaNew = parseFloat(ivaNew);

        if(iva)
        {
          
          ivaBoolNew = "Sí";
          ivaNew = precio_compra*0.40;
          precio_compraP = precio_compra+ivaNew;
          precio_compraNew = Math.ceil10(precio_compraP,1);

          if(precio_compraP == precio_compraNew)
          {
            precio_compraNew = precio_compraNew+10;
          }

          precio_unitario_compraP = parseFloat(precio_unitario_compraP);
          precio_unitario_compraNew = parseFloat(precio_unitario_compraNew);

          precio_unitario_compraP = precio_compraNew/multiplo_ventaSource;
          precio_unitario_compraNew = Math.ceil10(precio_unitario_compraP,1);
          

            if(precio_unitario_compraNew == precio_unitario_compraP)
            {
              precio_unitario_compraNew = precio_unitario_compraNew+10;
            }

        }else{
          porcent_extra = parseFloat(porcent_extra);
          ivaBoolNew = "No";
          ivaNew = precio_compra*0.16;
          precio_compraP = precio_compra+ivaNew;
          porcent_extra = precio_compraP*0.40;
          precio_compraP = precio_compraP+porcent_extra;
          precio_compraNew = Math.ceil10(precio_compraP,1);

          if(precio_compraP == precio_compraNew)
          {
            precio_compraNew = precio_compraNew+10;
          }

          precio_unitario_compraNew = parseFloat(precio_unitario_compraNew);
          precio_unitario_compraP = parseFloat(precio_unitario_compraP);

          precio_unitario_compraP = precio_compraNew/multiplo_ventaSource;
          precio_unitario_compraNew = Math.ceil10(precio_unitario_compraP,1);

          if(precio_unitario_compraNew == precio_unitario_compraP)
            {
              precio_unitario_compraNew = precio_unitario_compraNew+10;
            }

            ivaNew = precio_compraNew*0.16;
        }
      }

      alert(cantidadNew+" - "+existenciaNew+" - "+precio_compraNew+" - "+precio_unitario_compraNew+" - "+ivaBoolNew+" - "+ivaNew);

  swal({
  title: "¿Seguro que desea guardar los cambios?",
  type: "warning",
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  confirmButtonClass: "btn-danger",
  confirmButtonText: "¡Seguro!",
  closeOnConfirm: false
},
function(){
  precio_unitario_new = precio_paquete/multiplo_venta;
  precio_unitario_new = Math.ceil(precio_unitario_new);

  var datos = 'id_producto='+id_producto+'&producto='+producto+'&cantidad='+cantidad+'&linea='+linea+
  '&numero_parte='+numero_parte+'&codigo_sat='+codigo_sat+'&precio_paquete='+precio_paquete+'&descripcion='+descripcion;

  swal("¡Cambios guardados!", precio_unitario_new, "success");
});

 }

function delete_Product(id)
{
  var identificador = id;
  var datos = 'identificador='+identificador;

  $.ajax({
      url: 'view/ajax/delete_producto.php',
      type: 'POST',
      data: datos,
      success: function(data)
      {

      }
    })
    .done(function(data) {
        if(data == 1){
         
            location.reload();
            swal('Eliminado!','Producto eliminado con éxito.','success');
        }else if(data == 0)
        {
          swal("Error","No se pudo eliminar el producto.","error");

        }
      })
}

function validarImagenPer(obj, nombre){ 
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
     swal("Error", "El navegador no soporta la lectura de archivos", "error");
        return;
    }if (!(/\.(png|jpg|jpeg)$/i).test(uploadFile.name)) {
     swal("Error", "Porfavor, cargue solamente archivo .pnG, .jpg, .jpeg", "error");
        document.getElementById(nombre).value='';
    }else {
      document.getElementById(nombre).focus();
        var img = new Image();
        var images = document.getElementById('txtImagen1').value;
        if (uploadFile.size > 10000000)
        {
         swal("Error", "El peso del archivo debe ser menos a 10 MB", "error");
            document.getElementById(nombre).value='';
            document.getElementById(nombre).focus();
        }else {
            // alert('Imagen correcta :)')
        }
        // };
        // 
        //alert(uploadFile.size);
        img.src = URL.createObjectURL(uploadFile);
    }
}

function add_proveedor()
{
  var nombre_prove, no_cuenta, telefono, email;

  nombre_prove = document.getElementById('nombre_prove').value;
  no_cuenta = document.getElementById('no_cuenta').value;
  telefono = document.getElementById('telefono').value;
  email = document.getElementById('email').value;

  if(nombre_prove == '' || no_cuenta == '' || 
    telefono == '' || email == '')
  {
    swal({
      title: 'Error',
      text: 'Faltan campos por llenar',
      type: 'error'
  });
  }else{
    console.log(datos);
    var datos = 'nombre_prove='+nombre_prove+'&no_cuenta='+no_cuenta+'&telefono='+telefono+'&email='+email;

    $.ajax({
      url: 'view/ajax/agregar_proveedor.php',
      type: 'POST',
      data: datos,
      success: function(data)
      {

      }
    })
    .done(function(data) {
        if(data == 1){
         
            location.reload();
            swal({
              title: 'Añadido!',
              text: 'El proveedor agregado correctamente',
              type: 'success'
          });
            // swal('Añadido!','Producto agregado con éxito.','success');
        }else if(data == 0)
        {
          swal({
            title: 'Error',
            text: 'Hubo un error',
            type: 'error'
        });
          // swal("Error","No se pudo agregar el producto.","error");

        }
      })

  }
}

function add_factura_proveedor()
{

 var nombre_distribuidor, fecha, no_factura, 
 cuenta_pagar_total, desc_porcentual, desc_favor, fecha_limite, 
 id_proveedor;

  nombre_distribuidor = document.getElementById('nombre_distribuidor').value;
  fecha = document.getElementById('fecha').value;
  no_factura = document.getElementById('no_factura').value;
  cuenta_pagar_total = document.getElementById('cuenta_pagar_total').value;
  desc_porcentual = document.getElementById('desc_porcentual').value;
  desc_favor = document.getElementById('desc_favor').value;
  fecha_limite = document.getElementById('fecha_limite').value;
  id_proveedor = document.getElementById('id_proveedor').value;

  if(nombre_distribuidor == '' || fecha == '' || no_factura == '' || cuenta_pagar_total == '' || 
    desc_porcentual == '' || desc_favor == '' || fecha_limite == '' || id_proveedor == '')
  {
    swal("Error","Faltan campos por llenar.","error");
  }else{
    
    var datos = 'nombre_distribuidor='+nombre_distribuidor+'&fecha='+fecha+'&no_factura='+no_factura+
                '&cuenta_pagar_total='+cuenta_pagar_total+'&desc_porcentual='+desc_porcentual+'&desc_favor='+desc_favor+
                '&fecha_limite='+fecha_limite+'&id_proveedor='+id_proveedor;

//alert(datos);
console.log(datos);
    $.ajax({
      url: 'view/ajax/agregar_factura_proveedor.php',
      type: 'POST',
      data: datos,
      success: function(data)
      {

      }
    })
    .done(function(data) {
        if(data == 1){
         
            location.reload();
            swal('Añadido!','Registro de factura proveedor con éxito.','success');
        }else if(data == 0)
        {
          swal("Error","No se pudo agregar la Factura proveedor.","error");

        }
      })

  }
}

function reporte()
{
  var dataTable = document.getElementById('buscador').value;

  if(dataTable == '')
  {
    window.open('?roots=reporteProveedor', '_blank');
  }else{
    var datos = "proveedor="+dataTable;
    
    $.ajax({
      url: 'view/ajax/proveedorData.php',
      type: 'POST',
      data: datos,
      success: function(data)
      {

      }
    })
    .done(function(data) {
        if(data == 1){
         
            window.open('?roots=reporteProveedor&search='+dataTable, '_blank');
            
        }else if(data == 0){
          swal("Error","No existe Proveedor con el nombre "+dataTable+".","error");

        }
      })
  }
  // 
}
