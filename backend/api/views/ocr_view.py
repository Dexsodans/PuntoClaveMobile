from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from api.middleware.jwt_auth import get_user_from_token
from api.services.ocr_service import procesar_factura_ocr


class OcrFacturaView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        user = get_user_from_token(request)

        if not user:
            return Response({"error": "No autorizado"}, status=401)

        imagen = request.FILES.get("imagen")
        id_prov = request.data.get("id_prov")

        if not imagen:
            return Response({
                "success": False,
                "error": "No se recibió ninguna imagen."
            }, status=400)

        if not id_prov:
            return Response({
                "success": False,
                "error": "Falta el id del proveedor."
            }, status=400)

        try:
            resultado = procesar_factura_ocr(imagen, int(id_prov))
            return Response(resultado)

        except Exception as e:
            return Response({
                "success": False,
                "error": f"Error procesando la imagen: {str(e)}",
                "productos": []
            }, status=500)