

const passwordValue = document.getElementById("passwordValue");
const emailValue = document.getElementById("emailValue");
const logInBtn = document.getElementById("log-in-Btn");

logInBtn.addEventListener('click', async (e) => {

  const email = emailValue.value
  const password = passwordValue.value
  try {
    const {data} = await axios.post('/login', { email: email , password:password})
   console.log(data);
  } catch (error) {
    console.log(error.response)
    //formAlert.textContent = error.response.data.msg
  }
  
})