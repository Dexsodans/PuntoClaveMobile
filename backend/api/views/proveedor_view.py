# api/views/proveedor_view.py

from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.proveedor_service import *

class ProveedorView(APIView):

    def get(self, request):
        return Response(get_all())

    def post(self, request):
        try:
            proveedor = create(request.data)
            return Response({"message": "Creado"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class ProveedorDetailView(APIView):

    def put(self, request, id):
        try:
            update(id, request.data)
            return Response({"message": "Actualizado"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def delete(self, request, id):
        delete(id)
        return Response({"message": "Eliminado"})