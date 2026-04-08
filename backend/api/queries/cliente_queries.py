from api.models.cliente_model import Cliente

def get_cliente_by_user_id(user_id):
    
    try:
        return Cliente.objects.get(id_usu=user_id)
    except Cliente.DoesNotExist:
        return None