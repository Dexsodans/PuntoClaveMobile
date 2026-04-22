# api/views/proveedor_view.py

from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.detalle_pedido_service import *
from api.middleware.jwt_auth import get_user_from_token

class DetallePedidoView(APIView):

    
    def post(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        
        id_pedi = request.data.get("id_pedi")
        id_pro = request.data.get("id_pro")
        CANT_DET_PEDI = request.data.get("CANT_DET_PEDI")
        SUB_TOTAL_DET_PEDI = request.data.get("SUB_TOTAL_DET_PEDI")

        detalle_pedido = create(id_pedi, id_pro, CANT_DET_PEDI, SUB_TOTAL_DET_PEDI)

        return Response({
                "message": "Detalle de pedido creado con exito",
                "detalle pedido creado": {
                    "id": detalle_pedido.id,
                    "COD_DET_PEDI": detalle_pedido.COD_DET_PEDI,
                    "id_pedi": detalle_pedido.id_pedi.id,
                    "id_pro": detalle_pedido.id_pro.id,
                    "CANT_DET_PEDI": detalle_pedido.CANT_DET_PEDI,
                    "SUB_TOTAL_DET_PEDI": detalle_pedido.SUB_TOTAL_DET_PEDI,
                }
            })
        
        

