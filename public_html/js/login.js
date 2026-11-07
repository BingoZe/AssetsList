async function signInWithEmail(){
    console.log("Clicou no botao");
    const userEmail = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;
    
    const{data,error} = await supabaseClient.auth.signInWithPassword({
        email:userEmail,
        password: userPassword
    });
    if(error){
        console.log(error);
        console.log("Erro na autenticacao");
    } else{
        console.log("Usuario autenticado");
    }
    
};

//fazer sign out