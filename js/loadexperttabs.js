let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    let content = '';
    const expertspagejson = request.response;
    //condition for checking if browser is Internet Explorer
    let expertspage =  ((false || !!document.documentMode))? JSON.parse(expertspagejson): expertspagejson;
    let webelements = expertspage["content"];
    let logostart = true;
    let pageheaders = [];
    for(let i = 0; i < webelements.length; i++)
    {
        let element = webelements[i]; 
        let type = element.type.toLowerCase(); 
        if(type == 'ph')
        {
            pageheaders.push(element);
        }
        else if(type == 'ch')
        {
            let header = document.getElementsByClassName("content-header")[0];
            header.innerHTML = element.content.toUpperCase();
        }
        else if(type == 'p')
        {
            content += '<p>' + element.content + '</p>';
        }
        else if(type == 'img')
        {
            content += '<img src="assets/images/'+ element.content + '" alt="" style="width: 100%;">';
        }
        else if(type == 'iframe')
        {
            content += '<iframe '+ element.content +'></iframe>';
        }
        else if(type == 'ul')
        { 
            content += '<ul class="sub-list ' + element.content +'">';
        }
        else if(type == 'li')
        {
            content += '<li>'+ element.content +'</li>';
        }
        else if(type == '/ul')
        {
            content += '</ul>';
        }
        else if(type == 'a' && !element.hasOwnProperty("logo"))
        {
            content +='<a href = "'+ element.source +'">'+ element.content + '</a>';
        }
        else if(type == 'a' && element.logo != '')
        {
            if(logostart == true)
            {
                content +='<div class = "display-flex">';
                logostart = false;
            }
            content +='<div class = "col-xl-4 col-lg-6 col-md-12">'+
                        '<a target = "_blank" href = "'+ element.source +'">'+
                            '<div class = "home-logo-container">' +
                                '<img class = "home-logo" src = "assets/images/' + element.logo+ '">'+
                                '<p>'+ element.content+'</p>' +
                            '</div>'+
                        '</a>'+
                    '</div>';
            if(i+1 ==  webelements.length){
                content += '</div>';
            }
        }
    }
    addheader(pageheaders);
    let contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(contentElement);
    addfooter();
}

let addheader =  function (headers){
    let header = document.getElementById("page-header");
    let content ="";
    let image = "";
    let header1 = "";
    let header2 = "";

    content += '<div class="carousel slide carousel-fade pointer-event" data-ride="carousel">'+
                    '<div class="carousel-inner">';
    for(var i =0 ; i < headers.length; i++)
    {
        image = typeof headers[i].logo != 'undefined' && headers[i].logo != ''? headers[i].logo : image;
        header1 =  typeof headers[i].content != 'undefined' && headers[i].content != ''? headers[i].content : header1;
        header2 =  typeof headers[i].subcontent != 'undefined' && headers[i].subcontent != ''? headers[i].subcontent : header2;
        let source = 'assets/images/' + (typeof headers[i].source != 'undefined' && headers[i].source != ''? headers[i].source+'/' : '');
        if(i == 0)
        {
            content += '<div class="carousel-item active">';
        }
        else
        {
            content += '<div class="carousel-item">';
        }
        content +=  '<img src="'+ source + image +'" class="d-block w-100" alt="...">'+
                    '<div id = "landing-page-text-wrapper">'+
                        '<h1>'+ header1 +'</h1>' + 
                        '<p>' + header2 + '</p>' +      
                    '</div>'+
                '</div>';
    }
    content +=  '</div></div>';
    header.innerHTML = content;
}

let buildExpertContent = function(experts){
    let content = '';
    let tabattribute = "org"
    let distincttabs = getDistinctAttributes(experts, tabattribute);
    content = createTabNavigation(distincttabs, tabattribute);
    content += buildTabContent(distincttabs, tabattribute, experts);
}

let createTabNavigation = function(distincttabs, tabattribute)
{
    let navigationContent = '<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">';
    for(let i = 0; i< distincttabs.length; i++)
    {
        let buttonContent = '';
        let tabId = tabattribute + i.toString();
        if(i == 0)
        {
            buttonContent = '<a class="nav-link active" id="pills-'+ tabId +'-tab" data-toggle="pill" href="#pills-'+ tabId +'" role="tab" aria-controls="pills-'+ tabId +'" aria-selected="true">'+ distincttabs[i] +'</a>';
        }
        else
        {
            buttonContent = '<a class="nav-link" id="pills-'+ tabId +'-tab" data-toggle="pill" href="#pills-'+ tabId +'" role="tab" aria-controls="pills-'+ tabId +'" aria-selected="true">'+ distincttabs[i] +'</a>';
        }
       
        let linkElement = '<li class="nav-item">' + buttonContent + '</li>';
        navigationContent += linkElement;
    }
    navigationContent += '</ul>';
    return navigationContent;
}

let buildTabContent = function(distincttabs, tabattribute, experts){
    let tabContent = '<div class="tab-content" id="pills-tabContent">';
    
    for(let i = 0; i< distincttabs.length; i++)
    {
        let tabId = tabattribute + i.toString();
        let tabexperts = experts.filter(function(expert){
            return expert[tabattribute] == distincttabs[i];
        });

        if(i == 0)
        {
            tabContent +='<div class="tab-pane fade show active" id="pills-'+ tabId +'" role="tabpanel" aria-labelledby="pills-'+ tabId +'-tab">';
        }
        else
        {
            tabContent +='<div class="tab-pane fade" id="pills-'+ tabId +'" role="tabpanel" aria-labelledby="pills-'+ tabId +'-tab">';
        }
        tabContent += '<div class="tab-title-container"><h3 class="tab-title"><img class="logo" src="assets/images/'+ tabexperts[0][tabattribute].toLowerCase() +'.png">'+ tabexperts[0][tabattribute].toString() +'</h3></div>';
        tabContent += buildExperts(tabId, tabexperts);
        tabContent += '</div>';

    }
    tabContent += '</div>';
    return tabContent;
}

//Start with level1 accordion and build one by one the levels going down.
//this is nestted accordion that can go upto 4 levels
let buildExperts = function(tabId, tabexperts){
    let counter = 1; 
    let contactElem = '';
    contactElem += '<div id = "' + tabId + '">';
    let level1s = tabexperts.filter(function(expert){
        return expert.level2 == '';
    });
    //if there is no level2 then it is a simple list
    if(level1s.length > 0)
    {
        contactElem += buildExpertElement(level1s);
    }
    //if there is level 2 then it is accordion
    let level1as = agencycontacts.filter(function(contact){
        return contact.level2 != '';
    });

    if(level1as.length > 0)
    {
        let distinctLevel1s = getDistinctAttributes(level1as, 'level1');
        distinctLevel1s.forEach(function(level1) {
            let collapseId1 = "collapse" + counter;
            let headerId1 = "heading" + counter;
            let childId1 = "child" + counter;
            counter++;
            let level2Elem = '';
            //filter level2s
            let level2s = level1as.filter(function(expert){
                return expert.level1 == level1;
            }); 
            //build accordion
            if(level2s.length > 0)
            {
                let distinctLevel2s = getDistinctAttributes(level2s, 'level2');
                distinctLevel2s.forEach(function(level2){
                    let collapseId2 = "collapse" + counter;
                    let headerId2 = "heading" + counter;
                    let childId2 = "child" + counter;
                    counter++;
                    //filter level3 without level4
                    let level3s = level2s.filter(function(expert){
                        return expert.level1 == level1 && expert.level2 == level2;
                    });
                    //for level3s with out level4 build simple list
                    if(level3s.length > 0)
                    {
                        level3Elem+= buildExpertElement(level3s);
                    }
                    level2Elem+= generateAccordionSubElem(2, collapseId2, headerId2, childId1, childId2, level, level3Elem);
                });
                //end level2 accordion
            }  
            contactElem+= generateAccordionSubElem(1, collapseId1, headerId1, agencyId, childId1, level, level2Elem);
        });
    }
    contactElem += '</div>';
    //end level1 accordion
    return contactElem;
}

let buildExpertElement = function(experts){
    let content = '';
    for(var i=0; i< experts.lenght; i++){
        let fulldepartment = (school != 'College of Emergency Preparedness, Homeland Security and Cybersecurity')? department + ', ' + school : school;
        let institution = (faculty.facultyType == 'researcher')? faculty.department : fulldepartment;
        content += '<div class = "search-container faculty-info"><img class = "faculty-image" src = "'+ faculty.photo+'"/> <h2 class = "content-header-no-margin">' +
                    '<a class = "no-link-decoration" href = ' + faculty.facultyLink + '>' + faculty.fullName + '</a></h2><h5 class = "content-header-no-margin faculty-title">'+ faculty.title + ',<br>'+
                    institution + '</h5>'+ generateLogoContent(faculty) +'<p class = "faculty-description"><strong>Email: </strong> <a class = "email-link" href = mailto:' + faculty.email + 
                    '>'+ faculty.email+ '</a><br><strong>Phone: </strong>'+ faculty.contact + '<br><strong>Research Interests: </strong>'+ faculty.researchInterest + '</p><p>' + 
                    faculty.researchDescription +'</p>'+ generateCovidResearchContent(faculty.covidProjects) +'</div>';
    }
    return content;
}

let generateAccordionSubElem = function(level, collapseId, headerId, parentId, childId, header, accordionContent){
    var headerno = level + 2;
    let accordionElem =  '<div class = "card"><div class="card-header level'+ level +'" id="'+ headerId + '">' +
                          '<button class="btn btn-link" data-toggle="collapse" data-target="#'+ collapseId + '" aria-expanded="false" aria-controls="' + collapseId + '">'+
                            '<h'+ headerno +' class = "content-header-no-margin">' + header + '<i class="fas fa-chevron-down"></i></h'+ headerno +'></button></div>'
                        + '<div id="'+ collapseId + '" class = "collapse" aria-labelledby= "'+ headerId + '" data-parent="#'+ parentId +'"> <div class = "card-body" id="'+ childId +'">'
                        + accordionContent +'</div></div></div>';  
    return accordionElem;
}

$('.carousel').carousel({pause: false});