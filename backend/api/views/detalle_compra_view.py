# api/views/proveedor_view.py

from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.detalle_compra_service import *
from api.middleware.jwt_auth import get_user_from_token

class DetalleCompraView(APIView):

    
    def post(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        
        id_com = request.data.get("id_com")
        id_pro = request.data.get("id_pro")
        CANT_DET_COMPRA = request.data.get("CANT_DET_COMPRA")
        SUB_TOTAL_DET_COMPRA = request.data.get("SUB_TOTAL_DET_COMPRA")

        detalle_compra = create(id_com, id_pro, CANT_DET_COMPRA, SUB_TOTAL_DET_COMPRA)

        return Response({
                "message": "Detalle de compra creado con exito",
                "detalle compra creado": {
                    "id": detalle_compra.id,
                    "COD_DET_COMPRA": detalle_compra.COD_DET_COM,
                    "id_com": detalle_compra.id_com.id,
                    "id_pro": detalle_compra.id_prod.id,
                    "CANT_DET_COMPRA": detalle_compra.CANT_DET_COM,
                    "SUB_TOTAL_DET_COMPRA": detalle_compra.SUB_TOTAL_DET_COM,
                }
            })
        
        

