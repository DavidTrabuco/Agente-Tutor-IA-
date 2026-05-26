import { FooterStyles} from "./FooterStyles";

export  const integrantes: { nome: string; id: number }[] = [
        { nome: 'David Trabuco', id: 1 },
        { nome: 'João Uderman', id: 2 },
        { nome: 'Davi Marshal', id: 3 },
        { nome: 'Caio Cesar ', id: 4 },
        {nome: 'Felipe Sobral', id: 5 },
        {nome: 'Filipe Silva', id: 6 },
        {nome:'Alexandre ' , id: 7 },
        

    ];

export default function Footer() {

   

    return (
        <footer className={FooterStyles.footerSection}>
            <div className={FooterStyles.footerCard}>
                <p className={FooterStyles.footerText}>CopyRight 2026 - TutorIA</p>
                <p className={FooterStyles.footerText}>
                    Desenvolvido por: {integrantes.map((i) => i.nome).join(', ')}
                </p>
            </div>
        </footer>
    )
}