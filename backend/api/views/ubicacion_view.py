# api/views/proveedor_view.py

from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.ubicacion_service import *
from api.middleware.jwt_auth import get_user_from_token
from api.services.ubicacion_service import create

class UbicacionView(APIView):

        

    def get(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        
        return Response(get_all())
    
    def post(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        LATITUD_UBI = request.data.get("LATITUD_UBI")
        LONGITUD_UBI = request.data.get("LONGITUD_UBI")
        DIRECCION_UBI = request.data.get("DIRECCION_UBI")

        ubicacion = create(LATITUD_UBI, LONGITUD_UBI, DIRECCION_UBI)

        return Response({
                "message": "Ubicacion creada con exito",
                "ubicacion creada": {
                    "id": ubicacion.id,
                    "COD_UBI": ubicacion.COD_UBI,
                    "COORDENADAS": f"Latitud: {ubicacion.LATITUD_UBI} y Longitud: {ubicacion.LONGITUD_UBI}",
                    "DIRECCION_UBI": ubicacion.DIRECCION_UBI,
                }
            })
        
        

