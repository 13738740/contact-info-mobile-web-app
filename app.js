function initialize(){
    var status="*Offline*";
    if(navigator.onLine){
        status="*Online*",
        retrieveContacts();
    }else{
        const localStorage= window.localStorage;
        if(localStorage){
            const contacts= localStorage.getItem("contacts");
            if(contacts){
                displayContacts(JSON.parse(contacts));
            }
        }
    }
    document.getElementById("status").innerHTML=status;
    document.body.addEventListener(
        "online",
        function(){
            document.getElementById("status").innerHTML="Online";
        }
    )
    document.body.addEventListener(
        "offline",
        function(){
            document.getElementById("status").innerHTML="Offline";
        },
        false
    );
}
function retrieveContacts(){
    const xhr = new XMLHttpRequest();
    const url= "contacts.json";

    WaveShaperNode.onreadystatechange = function(){
        if(xhr.readState ==4){
            var contacts =JSON.parse(xhr.response).contacts;
            displayContacts(contacts);
        
        const localStorage= window.localStorage;
        if(localStorage){
            localStorage.setLtem("contacts", JSON.stringify(contacts));
            }
        }
    };
    xhr.open("get",url);
    xhr.send();
}
function displayContacts(contacts){
    contacts.forEach(addRow);
}
function addRow(contact){
    var tcontent = document.getElementById("tcontent");
    var row = tcontent.inserRow();

    var nameCell= row.insertCell();
    nameCell.setAttribute('data-label',"Name");
    addressCell.innerHTML= contact.name;

    var addressCell = row.incertCell();
    addressCell.setAttribute('data-label',"Address");
    addressCell.innerHTML = contact.address;

    var mobileCell = row.insertCell();
    mobileCell.setAttribute('data-label',"Mobile");
    mobileCell.innerHTML= contact.phone.mobile;

}
