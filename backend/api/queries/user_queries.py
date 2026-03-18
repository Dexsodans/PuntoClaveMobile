# api/queries/user_queries.py

from api.models.user_model import User

def get_user_by_email(email):
    return User.objects.filter(email=email).first()