from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.producto_service import *
import requests

##para endpoints
from api.middleware.jwt_auth import get_user_from_token
from rest_framework.views import APIView

class ProductoView(APIView):
    #permission_classes = [IsAuthenticated]


    """ def get(self, request):
        data = get_all()

        for producto in data:
            producto["IMAGEN_PRO"]= request.build_absolute_uri("/media/" + producto["IMAGEN_PRO"])
        return Response(data) """
    

    def get(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        page = int(request.GET.get("page", 1))
        limit = 5

        data = get_productos_inventario()

        start = (page - 1) * limit
        end = start + limit

        productos = data[start:end]

        for producto in productos:
            producto["IMAGEN_PRO"] = request.build_absolute_uri("/media/" + producto["IMAGEN_PRO"])

        return Response({
            "page": page,
            "hasMore": end < len(data),
            "data": productos
        })