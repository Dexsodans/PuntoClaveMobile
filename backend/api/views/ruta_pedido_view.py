from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.rutas_ubicaciones_service import get_pedidos_ruta

class RutaPedidosView(APIView):

    def get(self, request):

        id_ruta = request.GET.get("id_ruta")

        if not id_ruta:
            return Response({
                "success": False,
                "message": "Debe enviar id_ruta"
            }, status=400)

        data = get_pedidos_ruta(id_ruta)

        return Response({
            "success": True,
            "data": data
        })