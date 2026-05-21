from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.services.producto_service import get_productos_inventario


class ProductoView(APIView):

    def get(self, request):
        try:
            page = int(request.query_params.get("page", 1))
            page_size = 5

            id_prov = request.query_params.get("id_prov")

            # obtener datos
            data = get_productos_inventario(id_prov)

            # convertir imagen a URL completa
            for producto in data:

                if producto["IMAGEN_PRO"]:
                    producto["IMAGEN_PRO"] = request.build_absolute_uri(
                        "/media/" + producto["IMAGEN_PRO"]
                    )

            # paginación manual
            start = (page - 1) * page_size
            end = start + page_size

            paginated_data = data[start:end]

            has_more = len(data) > end

            return Response({
                "page": page,
                "hasMore": has_more,
                "data": paginated_data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)