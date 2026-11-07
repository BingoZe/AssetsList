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
    
    return data.session;
}