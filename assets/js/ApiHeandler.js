window.addEventListener("DOMContentLoaded", function () {    
    pullData(true);
})

const base = 'https://docs.google.com/spreadsheets/d/1kYIyK5tqivC6awmTX-4XQjRGOWSEpC4yO_oPEq1-TIk/gviz/tq?';
const output = document.querySelector('.output');
let dataArry = [];

function pullData(DomEvent) {
    fetch(base)
        .then(res => res.text())
        .then(rep => {
            let data = JSON.parse(rep.substr(47).slice(0, -2));
            let newData = [];
            if (data.status == "ok") {
                data = data.table;

                data.rows.forEach(row => {
                    let obj = {
                        "ID": row.c[0].v,
                        "TimeStamp": row.c[1].v,
                        "Email": row.c[2].v,
                        "Name": row.c[3].v,
                        "Date": row.c[4].f,
                        "Hour": row.c[5].f.substr(0, 5),
                        "Length": row.c[6].v,
                        "Language": row.c[7].v,
                        "InstracturName": row.c[8].v,
                        "Tel": row.c[9].v,
                        "RegistrationLink": row.c[10].v,
                        "ZoomLink": row.c[11].v,
                        "ImageLink": row.c[12].v.substr(33, 64),
                        "Description": row.c[13].v,
                        "Age": row.c[14].v,
                        "Tools": row.c[16].v,
                    }
                    newData.push(obj);
                    console.log(obj);
                });

            }
            if(DomEvent==true){
             createCards(newData);   
            }
            else{
                filtterCards(newData);
            }
            
        })

}

function createCards(newData) {
    const ele = document.getElementById("cards-continer");
    ele.innerHTML = "";
    newData.forEach(obj => {
        const myHtml = `
    <div class="col">
    <div class="card h-100">
        <div class="overflow-hidden" style="height: 150px;">
            <img src="https://drive.google.com/uc?export=view&id=${obj.ImageLink}" class="card-img-top" alt="..." style="width:100%; min-height:100%">
        </div>
        <div class="card-body">
            <div class="row justify-content-between d-flex">
                <p class="col card-text"><strong>תאריך: </strong><span class="card-date">${obj.Date}</span></p>
                <p class="col card-text" ><strong>שעה: </strong><span class="card-hour">${obj.Hour}</span></p>
            </div>
            <h5 class="card-title" style="font-weight: 800;"">${obj.Name}</h5>
            <p class="card-text card-discript">${obj.Description}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>משך: </strong><span class="card-len">${obj.Length}</span> דקות</li>
            <li class="list-group-item"><strong>שפת העברה: </strong><span class="card-lan">${obj.Language}</span></li>
            <li class="list-group-item"><strong>שם המדריך/ה: </strong><span class="card-instractor">${obj.InstracturName}</span></li>
            <li class="list-group-item"><strong>קהל יעד: </strong><span class="card-instractor">${obj.Age}</span></li>
            <li class="list-group-item"><strong>ציוד נדרש: </strong><span class="card-instractor">${obj.Tools}</span></li>
        </ul>
        <div class="row d-flex card-footer justify-content-between align-content-between">
            <a href="${obj.RegistrationLink}" class="col col-5 card-link btn  tm-button card-reg" style="font-size: 14px;" target="_blank">להרשמה</a>
            <a href="${obj.ZoomLink}" class="col col-6 card-link btn tm-button card-zoom" style="font-size: 14px;" target="_blank">התחברות
                לזום</a>
        </div>
    </div>                        
</div>
`
        ele.innerHTML += myHtml;
    });
}


function filtterCards(newData) {
    console.log("Filtering cards");    
    let date = document.getElementById("datepicker").value;
    const lang = document.getElementById("langInput").value;
    const age = document.getElementById("ageInput").value;
    const ele = document.getElementById("cards-continer");
    let filterData=[];

    let dateOn = false;
    let langOn = false;
    let ageOn = false;

    if (date == null || date == undefined || date == "") {
        dateOn = false;
    }
    else {
        dateOn = true;
    }

    if (lang == "בחירת שפה") {
        langOn = false;
    }
    else {
        langOn = true;
    }

    if (age == "בחירת קהל יעד") {
        ageOn = false;
    }
    else {
        ageOn = true;
    }

    if (langOn == true || dateOn == true || ageOn == true) {        
        let AddE;
        const dateArry=date.split(`/`);
        date=dateArry[1]+`/`+dateArry[0]+`/`+dateArry[2];        

        newData.forEach(el => { 
            AddE=true;       

                    

            if (dateOn == true) {
                
              
                if (el.Date != date) {
                    AddE = false;
                }
               
            }

            if (langOn == true) {
                if (el.Language != lang) {
                    AddE = false;
                }                
               
            }
           
            if (ageOn == true) {   
                  
                let AgeOK=false;
                let Ages;
                if(el.Age.includes(', ')){
                   Ages = el.Age.split(', ');                  
                   for (let i = 0; i < Ages.length; i++) {                   
                    if(Ages[i]==age){
                        AgeOK=true;
                      
                    }                  
                }
                }
                else{                  
                    if(el.Age==age){
                        AgeOK=true;
                       
                    }                  
                }                      
                
               
                if(AgeOK==false){
                    AddE = false;
                }   
                           
               
            }            

            if (AddE == true) {
                filterData.push(el);                             
            }

        });

       

        ele.innerHTML = "";
        if(filterData.length>0){
        filterData.forEach(obj => {
            const myHtml = 
            `<div class="col">
                <div class="card h-100">
                    <div class="overflow-hidden" style="height: 150px;">
                        <img src="https://drive.google.com/uc?export=view&id=${obj.ImageLink}" class="card-img-top" alt="..." style="width:100%; min-height:100%">
                    </div>
                    <div class="card-body">
                        <div class="row justify-content-between d-flex">
                            <p class="col card-text"><strong>תאריך: </strong><span class="card-date">${obj.Date}</span></p>
                            <p class="col card-text" ><strong>שעה: </strong><span class="card-hour">${obj.Hour}</span></p>
                        </div>
                        <h5 class="card-title" style="font-weight: 800;"">${obj.Name}</h5>
                        <p class="card-text card-discript">${obj.Description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>משך: </strong><span class="card-len">${obj.Length}</span> דקות</li>
                        <li class="list-group-item"><strong>שפת העברה: </strong><span class="card-lan">${obj.Language}</span></li>
                        <li class="list-group-item"><strong>שם המדריך/ה: </strong><span class="card-instractor">${obj.InstracturName}</span></li>
                        <li class="list-group-item"><strong>קהל יעד: </strong><span class="card-instractor">${obj.Age}</span></li>
                        <li class="list-group-item"><strong>ציוד נדרש: </strong><span class="card-instractor">${obj.Tools}</span></li>
                    </ul>
                    <div class="row d-flex card-footer justify-content-between align-content-between">
                        <a href="${obj.RegistrationLink}" class="col col-5 card-link btn  tm-button card-reg" style="font-size: 14px;" target="_blank">להרשמה</a>
                        <a href="${obj.ZoomLink}" class="col col-6 card-link btn tm-button card-zoom" style="font-size: 14px;" target="_blank">התחברות
                            לזום</a>
                    </div>
                </div>                        
            </div>`
            ele.innerHTML += myHtml;
        });
        
    }
    else{
        ele.innerHTML +=`<p class="text-center w-100">לצערנו אין סדנה שעונה על הסינון המבוקש, אולי את/ה תרצה/י להעביר אחת כזו בעצמך?
        </br> כדי להירשם להעברת סדנה,לחצ/י על הכפתור המופיע בהמשך העמוד.</p>`;
    }


    }
    else {
        alert("יש לבחור קריטריונים לסינון לפני לחיצה על הכפתור");
    }
}



