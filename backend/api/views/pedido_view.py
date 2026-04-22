# api/views/proveedor_view.py

from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.pedido_service import *
from api.middleware.jwt_auth import get_user_from_token

class PedidoView(APIView):

    def get(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)

        user_id = request.GET.get("user_id")
        pedidos = get_for_cliente(user_id)

        if pedidos is None:
            return Response({
                "success": False,
                "message": "Cliente no encontrado"
            }, status=404)

        return Response(pedidos)
    
    def post(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        
        id_usu = request.data.get("id_usu")
        id_ubi = request.data.get("id_ubi")
        TOTAL_PEDI = request.data.get("TOTAL_PEDI")

        pedido = create(id_usu, id_ubi, TOTAL_PEDI)

        return Response({
                "message": "Pedido creado con exito",
                "pedido creado": {
                    "id": pedido.id,
                    "COD_PEDI": pedido.COD_PEDI,
                    "id_cli": pedido.id_cli.id,
                    "id_ubi": pedido.id_ubi.id,
                    "TOTAL_PEDI": pedido.TOTAL_PEDI,
                }
            })
        
        

