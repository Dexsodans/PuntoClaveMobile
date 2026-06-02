import { useState } from "react";

import PasoEntrega from "@/components/puntoclave/validacion/PasoEntrega";
import PasoCodigo from "@/components/puntoclave/validacion/PasoCodigo";

interface Props {
    params: any;
}

export default function ValidacionScreen({ params }: Props) {

    const [paso, setPaso] = useState(1);

    if (paso === 1) {
        return (
            <PasoEntrega
                params={params}
                onEntregar={() => setPaso(2)}
            />
        );
    }

    return (
        <PasoCodigo />
    );
}