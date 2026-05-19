# api/views/proveedor_view.py

from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.compra_service import *
from api.middleware.jwt_auth import get_user_from_token
from api.models.user_model import User

class CompraView(APIView):

    """ def get(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)

        user_id = request.GET.get("user_id")
        compras = get_for_cliente(user_id)

        if pedidos is None:
            return Response({
                "success": False,
                "message": "Cliente no encontrado"
            }, status=404)

        return Response(pedidos) """
    
    def post(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        
        id_usu = User.objects.get(id=request.data.get("id_usu"))
        #id_usu = request.data.get("id_usu")
        FACTURA_COMPRA = request.data.get("FACTURA_COMPRA")
        TOTAL_COM = request.data.get("TOTAL_COM")
        FECHA_COM = request.data.get("FECHA_COM")

        compra = create(id_usu, FACTURA_COMPRA, TOTAL_COM, FECHA_COM)

        return Response({
                "message": "Compra creada con exito",
                "compra creada": {
                    "id": compra.id,
                    "FACTURA_COMPRA": compra.FACTURA_COMPRA,
                    "COD_COMPRA": compra.COD_COM,
                    "TOTAL_COM": compra.TOTAL_COM,
                    "FECHA_COM": compra.FECHA_COM,
                    "id_admin": compra.id_admin.id
                }
            })
        
        

