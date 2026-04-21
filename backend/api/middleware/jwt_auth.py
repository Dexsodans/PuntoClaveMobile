import jwt
from django.conf import settings
from api.models.user_model import User


def get_user_from_token(request):

    auth = request.headers.get("Authorization")

    if not auth:
        return None

    try:
        token = auth.split(" ")[1]
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

        user_id = payload.get("user_id")

        return User.objects.get(id=user_id)

    except Exception:
        return None