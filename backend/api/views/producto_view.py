from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.producto_service import *
from api.queries.producto_queries import get_productos_activos

class ProductoView(APIView):

    def get(self, request):
        return Response(listar_productos())