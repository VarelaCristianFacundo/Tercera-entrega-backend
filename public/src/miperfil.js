function main(){
    const url = '/login';
    const options = {
        method: "GET"
    }
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) { 
            let perfil;
            data.isAdmin ? perfil = "Admin" : perfil = "Usuario"
            let x = document.getElementById("usuarioLogin");
            x.innerHTML = `${data.user}` 
            let h = document.getElementById("usuarioProfile");
            h.innerHTML = `${data.user}` 
            let d = document.getElementById("perfilProfile");
            d.innerHTML = `${perfil}` 
            let y = document.getElementById("usuarioAvatar");
            y.innerHTML = `<img src = './avatars/${data.avatar}' width="40"height="40" style="border-radius: 20px;"></img>`
            let z = document.getElementById("usuarioPerfil");
            z.innerHTML = `<img src = './avatars/${data.avatar}' width="200"height="200" style="border-radius: 20px;"></img>`
            
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}