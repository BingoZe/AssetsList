/*session.js
│
├── Existe sessão?
├── Obter utilizador atual
├── Proteger rotas
└── Redirecionamentos*/

async function getSession() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.log(error);
        return;
    }
    
    console.log("Autenticado. Sessao ativa.");
    return data.session;
}