# api/views/proveedor_view.py

from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.caja_service import *
from api.middleware.jwt_auth import get_user_from_token

class CajaView(APIView):

    def get(self, request):
        """ user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401) """

        user_id = request.GET.get("user_id")
        
        caja = get_for_ruteador(user_id)
        data = []
        for item in caja:
            data.append({
                "id": item.id,
                "COD_CAJA": item.COD_CAJA,
                "id_usu": item.id_usu.id,
                "id_ruta": item.id_ruta.id,
                "nombre_ruta": item.id_ruta.NOM_RUTA,
                "EST_CAJA": item.EST_CAJA,
                "EVIDENCIA_CAJA": item.EVIDENCIA_CAJA,
                "FECHA_CREACION_CAJA": item.FECHA_CREACION_CAJA
            })
        return Response(data)

        
        

