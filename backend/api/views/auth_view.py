# api/views/auth_view.py

from rest_framework.views import APIView
from rest_framework.response import Response
from api.services.auth_service import login_user
#registro
from api.services.auth_service import register_user

#token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken



class LoginView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        user = login_user(email, password)

        if not user:
            return Response(
                {"error": "Credenciales incorrectas"},
                status=401
            )

        # generar JWT
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login exitoso",

            "token": str(refresh.access_token),
            "refresh": str(refresh),

            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        })
class RegisterView(APIView):

    def post(self, request):

        try:
            user = register_user(request.data)

            return Response({
                "message": "Usuario registrado correctamente",
                "user": {
                    "id": user.id,
                    "email": user.email
                }
            })

        except Exception as e:
            return Response({
                "error": str(e)
            }, status=400)