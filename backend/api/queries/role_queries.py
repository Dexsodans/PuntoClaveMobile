# api/queries/role_queries.py

from django.db import connection

def assign_role_to_user(user_id, role_id):

    with connection.cursor() as cursor:
        cursor.execute("""
            INSERT INTO model_has_roles (role_id, model_type, model_id)
            VALUES (%s, %s, %s)
        """, [role_id, "App\\Models\\User", user_id])