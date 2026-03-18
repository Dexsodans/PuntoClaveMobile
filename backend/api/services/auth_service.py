# api/services/auth_service.py
import re
import bcrypt
from api.queries.user_queries import get_user_by_email
#para roles
from api.models.user_model import User
from api.queries.role_queries import assign_role_to_user



def login_user(email, password):

    user = get_user_by_email(email)

    if not user:
        return None

    if bcrypt.checkpw(password.encode(), user.password.encode()):
        return user

    return None


##para registrar y manejar el rol
def register_user(data):
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # 🔍 VALIDACIONES

    # nombre sin números
    if re.search(r'\d', name):
        raise Exception("El nombre no debe contener números")

    # email gmail
    if not email.endswith("@gmail.com"):
        raise Exception("El email debe ser @gmail.com")

    # password mínimo
    if len(password) < 6:
        raise Exception("La contraseña debe tener al menos 6 caracteres")

    # email único
    if User.objects.filter(email=email).exists():
        raise Exception("El email ya está registrado")

    # 🔐 hashear contraseña tipo Laravel
    hashed_password = bcrypt.hashpw(
        data["password"].encode(),
        bcrypt.gensalt()
    ).decode()

    # 👤 crear usuario
    user = User.objects.create(
        name=data["name"],
        email=data["email"],
        password=hashed_password,
        AP_PAT_USU="",
        AP_MAT_USU="",
    )

    # 🎯 asignar rol Cliente (id = 5)
    assign_role_to_user(user.id, 5)

    return user