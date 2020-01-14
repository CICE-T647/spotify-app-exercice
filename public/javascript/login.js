// let access_token = localStorage.getItem('access_token')
// console.log(access_token)
document.getElementById("login_form").addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("login_form").querySelector('input[name="email"]').value;
    const password = document.getElementById("login_form").querySelector('input[name="password"]').value;
    fetch("http://localhost:5000/auth/login", {
        method: 'POST', 
        body: JSON.stringify({email, password}),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        window.localStorage.setItem('access_token', response.data.token);
      });
})

