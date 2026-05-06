from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.carrito_service import agregar_al_carrito, get_carrito_by_cliente_id, limpiar_carrito
from api.queries.cliente_queries import get_cliente_by_user_id
from api.middleware.jwt_auth import get_user_from_token

class CarritoView(APIView):

    def post(self, request):

        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)

        user_id = request.data.get("user_id")
        producto_id = request.data.get("producto_id")

        try:

            carrito = agregar_al_carrito(user_id, producto_id)

            return Response({
                "message": "Producto agregado al carrito",
                "carrito": {
                    "id": carrito.id,
                    "id_cli": carrito.id_cli.id,
                    "producto_id": carrito.id_pro.id,
                    "cantidad": carrito.CANT_CAR,
                    "subtotal": carrito.SUB_TOTAL_CAR
                }
            })

        except Exception as e:

            return Response({
                "error": str(e)
            }, status=400)


    def get(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        user_id = request.GET.get("user_id")

        if not user_id:
            return Response({
                "success": False,
                "message": "user_id requerido"
            }, status=400)

        cliente = get_cliente_by_user_id(user_id)

        if not cliente:
            return Response({
                "success": False,
                "message": "Cliente no encontrado"
            }, status=404)

        carrito = get_carrito_by_cliente_id(cliente.id)

        data = []

        for item in carrito:
            data.append({
                "id": item.id,
                "id_pro": item.id_pro.id,
                "NOM_PRO": item.id_pro.NOM_PRO,
                "PRECIO_VENTA_PRO": item.id_pro.PRECIO_VENTA_PRO,
                "IMAGEN_PRO": request.build_absolute_uri("/media/" + item.id_pro.IMAGEN_PRO),
                "CANT_CAR": item.CANT_CAR,
                "SUB_TOTAL_CAR": item.SUB_TOTAL_CAR,
            })

        return Response({
            "success": True,
            "data": data
        })
    def delete(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({"error": "No autorizado"}, status=401)
        user_id = request.data.get("user_id")

        if not user_id:
            return Response({
                "success": False,
                "message": "user_id requerido"
            }, status=400)

        cliente = get_cliente_by_user_id(user_id)

        if not cliente:
            return Response({
                "success": False,
                "message": "Cliente no encontrado"
            }, status=404)

        limpiar_carrito(cliente.id)

        return Response({
            "success": True,
            "message": "Carrito limpiado"
        })