window.addEventListener("DOMContentLoaded", function () {
    pullData();
})

const base = 'https://docs.google.com/spreadsheets/d/1kYIyK5tqivC6awmTX-4XQjRGOWSEpC4yO_oPEq1-TIk/gviz/tq?';
const output = document.querySelector('.output');
let dataArry = [];

function pullData() {
    fetch(base)
        .then(res => res.text())
        .then(rep => {
            let data = JSON.parse(rep.substr(47).slice(0, -2));
            let newData = [];
            if (data.status == "ok") {
                data = data.table;             
                
                data.rows.forEach(row => {
                  let obj={
                    "ID": row.c[0].v,                  
                    "TimeStamp":row.c[1].v,                   
                    "Email":row.c[2].v,
                    "Name":row.c[3].v ,              
                    "Date":row.c[4].f,               
                    "Hour": row.c[5].f.substr(0,5),
                    "Length":row.c[6].v,                
                    "Language":row.c[7].v,             
                    "InstracturName":row.c[8].v,
                    "Tel":row.c[9].v,
                    "RegistrationLink":row.c[10].v,              
                    "ZoomLink":row.c[11].v, 
                    "ImageLink":row.c[12].v,
                    "Description":row.c[13].v,
                  }                   
                  newData.push(obj);
                });                           
                
            }
            createCards(newData);
        })

}

function createCards(newData) {
const ele=document.getElementById("cards-continer");
ele.innerHTML="";
newData.forEach(obj=>{
    const myHtml=`
    <div class="col">
    <div class="card h-100">
        <div class="overflow-hidden" style="height: 150px;">
            <img src="assets/images/others/author-image-2.png" class="card-img-top" alt="..." style="width:100%;">
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
        </ul>
        <div class="row d-flex card-footer justify-content-between align-content-between">
            <a href="${obj.RegistrationLink}" class="col col-5 card-link btn  tm-button card-reg" style="font-size: 14px;">להרשמה</a>
            <a href="${obj.ZoomLink}" class="col col-6 card-link btn tm-button card-zoom" style="font-size: 14px;">התחברות
                לזום</a>
        </div>
    </div>                        
</div>
`
    ele.innerHTML+=myHtml;
})

}
// const query = encodeURIComponent('Select A,B,C where C > 3 limit 20');
// const url = base + '&tq=' + query;
// const row = document.createElement('tr');
// output.append(row);
// data.table.cols.forEach((heading)=>{
//     const cell = document.createElement('td');
//     cell.textContent = heading.label;
//     row.append(cell);
// })
// data.table.rows.forEach((main)=>{
//     const container = document.createElement('tr');
//     output.append(container);
//     main.c.forEach((ele)=>{
//         const cell = document.createElement('td');
//         cell.textContent = ele.v;
//         container.append(cell);
//     })
// }) 