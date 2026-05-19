from api.models.cliente_model import Cliente
from api.models.user_model import User

def get_clientes():
    return Cliente.objects.select_related("id_usu").values(

        "id",
        "COD_CLI",
        "CI_CLI",
        "FECHA_NAC_CLI",
        "TIPO_CLI",
        "NIT_CLI",
        "EST_CLI",

        "id_usu",
        "id_usu__name",
        "id_usu__NOM_2_USU",
        "id_usu__AP_PAT_USU",
        "id_usu__AP_MAT_USU",
        "id_usu__CEL_USU",
        "id_usu__email",
        "id_usu__EST_USU",
        "id_usu__AVATAR_USU",
    )