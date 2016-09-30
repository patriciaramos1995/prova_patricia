document.getElementById("novoContato").addEventListener("click", criarContato);
document.getElementById("listaContatos").addEventListener("click", listarContatos);
document.getElementById("listaDuplicados").addEventListener("click", listarDuplicados);
document.getElementById("novoContact").addEventListener("click", exibeNovo);


function exibeNovo(){
	document.getElementById("novo").style.display = "block";
	document.getElementById("contato").style.display = "none";
}
var nome = document.getElementById("nome");
var telefone = document.getElementById("telefone");

function criarContato() {
	
   var novoContato = navigator.contacts.create({"displayName": nome.value});
   var telefones = [];
   telefones[1] = new ContactField('mobile', telefone.value, true);
   novoContato.phoneNumbers = telefones;
   novoContato.save(ok, erro);
    
   function ok() {
      alert("Contato Salvo!")
	  listarContatos();
	  document.getElementById("novo").style.display = "none";
	  document.getElementById("nome").value="";
	  document.getElementById("telefone").value="";
   }
  
   function erro(message) {
      alert('falha: ' + message);
   }
  
}

function listarContatos() {
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;

   fields = ["displayName", "phoneNumbers"];
   navigator.contacts.find(fields, sucesso, falha, options);
    
   contatoDiv = document.querySelector("#contato");
   contatoDiv.innerHTML = "";
   function sucesso(contacts) {
      for (var i = 0; i < contacts.length; i++) {
         contatoDiv.innerHTML += "<b>" + contacts[i].displayName+"</b><br/>"+contacts[i].phoneNumbers[0].value+"<br/>";
		 
		 	document.getElementById("novo").style.display = "none";
			document.getElementById("contato").style.display = "block";
			
      }
   }
  
   function falha(message) {
      alert('Falha: ' + message);
   }
  
}

function listarDuplicados(){
	
	document.getElementById("novo").style.display = "none";
	document.getElementById("contato").style.display = "block";
	
	var cont =0;
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	
	fields = ["displayName","phoneNumbers"];
	navigator.contacts.find(fields,sucesso,falha,options);
	
	contatoDiv = document.querySelector("#contato");
	contatoDiv.innerHTML = "";

function sucesso(contacts){
	for(var i = 0; i < contacts.length; i++){
		cont =0;
		
		for(var j =0; j < contacts.length; j++){
			if(contacts[i].displayName == contacts[j].displayName){
				cont++;
			}
		}
		
		if(cont > 1){
			contatoDiv.innerHTML += "<b>" +
			contacts[i].displayName + "</b>" +
			contacts[i].phoneNumbers[0].value + "<br/>"
		}
	}
}

function falha(message){
	alert('Falha:' + message);
}
}