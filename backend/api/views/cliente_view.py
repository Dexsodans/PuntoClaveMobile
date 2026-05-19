from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.cliente_service import get_clientes

class ClienteView(APIView):

    def get(self, request):
        clientes = get_clientes()
        return Response({
            "success": True,
            "clientes": list(clientes)
        })
    