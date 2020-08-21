let sidemenuItems = [{"item":"HOME","link":"home.html"},{"item":"ANNUAL ASSESSMENTS","link":"annualassessments.html"},{"item":"UNIT REPORTS","link":"#","subItems":[{"item":"Community and Economic Development","link":"communityandeconomicdevelopment.html"},{"item":"Faculty Research Development","link":"facultyresearchdevelopment.html"},{"item":"Innovation Development and Commercialization (OIDC)","link":"innovationdevelopmentandcommercialization(oidc).html"},{"item":"Regulatory and Research Compliance","link":"regulatoryandresearchcompliance.html"},{"item":"Research Foundation Human Resources","link":"researchfoundationhumanresources.html"},{"item":"Sponsored Programs Administration","link":"sponsoredprogramsadministration.html"},{"item":"Strategic Planning, Assessment, Data Analytics, and Technology","link":"strategicplanningassessmentdataanalyticsandtechnology.html"}]},{"item":"STEPS TO COMPLETION","link":"steps-to-completion.html"},{"item":"BENEFITS","link":"benifits.html"},{"item":"PRINT REPORTS","link":"print.html"},{"item":"QUESTIONS?","link":"questions.html"}]
//SideMenu Start
//What evet written  before '//SideMenu Start' will be relace with sidemenuItems in automation scripts

let addsidemenu = function(page){
    let sidemenu = document.getElementById('navigation-bar');

    for(let i = 0; i < sidemenuItems.length; i++){
        let item = sidemenuItems[i];
        var addsubmenu = false;
        if(item.hasOwnProperty('subItems')){
            if(item == page)
            {
                addsubmenu = true;
            }
            else
            {
                let subitems = item.subItems;
                subitems.forEach(element => {
                    if(element.item == page)
                    {
                        addsubmenu = true;
                        return;
                    }
                });
            }
        }

        if( addsubmenu == false)
        {
            let link = '';
            if(item.hasOwnProperty('subItems') && item.link == '#')
            {
                link = item.subItems[0].link;
            } 
            else
            {
                link = item.link;
            }

            let menuItem = document.createElement("li");
            let menuItemContent = '<a href="' + link + '">'+ item.item +'</a>'; 
            menuItem.innerHTML = menuItemContent;
            menuItem.classList.add('navigation-items');
            menuItem.classList.add('hover-highlight');
            if(page == item.item)
            {
                menuItem.setAttribute("id", "active-page");
            }
            sidemenu.appendChild(menuItem);
        }
        else
        {
            if(item == page && item.link != '#')
            {
                let menuItem = document.createElement("li");
                let menuItemContent = '<a href="' + link + '">'+ item.item +'</a>'; 
                menuItem.innerHTML = menuItemContent;
                menuItem.classList.add('navigation-items');
                menuItem.classList.add('hover-highlight');
                if(page == item.item)
                {
                    menuItem.setAttribute("id", "active-page");
                }
                sidemenu.appendChild(menuItem);
            }

            let subitems = item.subItems;
            let submenu = '<ul id="sub-navigation-bar">';
            for(var j = 0; j< subitems.length; j++)
            {
                if(j == 0)
                {
                    submenu +='<li class="first-sub-navigation-item hover-highlight"';
                    if(page == subitems[j].item)
                    {
                        submenu += ' id = "active-page"';
                    }
                    submenu += '><a href="'+ subitems[j].link +'">'+ subitems[j].item +'</a></li>';
                }
                else if(j == subitems.length-1)
                {
                    submenu +='<li class="last-sub-navigation-item hover-highlight"';
                    if(page == subitems[j].item)
                    {
                        submenu += ' id = "active-page"';
                    }
                    submenu += '><a href="'+ subitems[j].link +'">'+ subitems[j].item +'</a></li>';
                }
                else
                {
                    submenu +='<li class="sub-navigation-items hover-highlight"';
                    if(page == subitems[j].item)
                    {
                        submenu += ' id = "active-page"';
                    }
                    submenu += '><a href="'+ subitems[j].link +'">'+ subitems[j].item +'</a></li>';
                }
            }
            let menuItem = document.createElement("li");
            let menuItemContent = '<a href="' + subitems[0].link + '">'+ item.item +'</a>' + submenu; 
            menuItem.innerHTML = menuItemContent;
            menuItem.setAttribute("id", "expanded-navigation-item");
            sidemenu.appendChild(menuItem);
        }
    }
}

let generateAccordionElem = function(level, collapseId, headerId, parentId, childId, header, accordionContent){
    var headerno = level + 2;
    let accordionElem =  '<div class = "card"><div class="card-header level'+ level +'" id="'+ headerId + '">' +
                            '<button class="btn btn-link" data-toggle="collapse" data-target="#'+ collapseId + '" aria-expanded="false" aria-controls="' + collapseId + '">'+
                            '<h'+ headerno +' class = "content-header-no-margin">' + header + '<i class="fas fa-chevron-down"></i></h'+ headerno +'></button></div>'
                        + '<div id="'+ collapseId + '" class = "collapse" aria-labelledby= "'+ headerId + '" data-parent="#'+ parentId +'"> <div class = "card-body" id="'+ childId +'">'
                        + accordionContent +'</div></div></div>';  
    return accordionElem;
}

let createTabNavigation = function(distincttabs, tabname)
{
    let navigationContent = '<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">';
    for(let i = 0; i< distincttabs.length; i++)
    {
        let buttonContent = '';
        let tabId = tabname + i.toString();
        if(i == 0)
        {
            buttonContent = '<a class="nav-link active" id="pills-'+ tabId +'-tab" data-toggle="pill" href="#pills-'+ tabId +'" role="tab" aria-controls="pills-'+ tabId +'" aria-selected="true">'+ distincttabs[i] +'</a>';
        }
        else
        {
            buttonContent = '<a class="nav-link" id="pills-'+ tabId +'-tab" data-toggle="pill" href="#pills-'+ tabId +'" role="tab" aria-controls="pills-'+ tabId +'" aria-selected="true">'+ distincttabs[i] +'</a>';
        }
        
        let linkElement = '<li class="nav-item">' + buttonContent + '</li>';
        navigationContent = navigationContent + linkElement;
    }
    navigationContent += '</ul>';
    return navigationContent;
}

let buildTabContent = function(distincttabs, tabname, tabContent){
    let content = '<div class="tab-content" id="pills-tabContent">';
    
    for(let i = 0; i< distincttabs.length; i++)
    {
        let tabId = tabname + i.toString();
        if(i == 0)
        {
            content +='<div class="tab-pane fade show active" id="pills-'+ tabId +'" role="tabpanel" aria-labelledby="pills-'+ tabId +'-tab">';
        }
        else
        {
            content +='<div class="tab-pane fade" id="pills-'+ tabId +'" role="tabpanel" aria-labelledby="pills-'+ tabId +'-tab">';
        }
        content += tabContent[i];
        content += '</div>';
    }
    content += '</div>';
    return content;
}

function getDate(serial){
    let utc_days  = Math.floor(serial - 25569);
    let utc_value = utc_days * 86400;                                        
    let date_info = new Date(utc_value * 1000);
    return (parseInt(date_info.getMonth(),10) + 1) + '/' + (parseInt(date_info.getDate(),10) + 1) + '/' + date_info.getFullYear();//, 0, minutes, seconds);
}

addfooter = function(){
    let footer = document.getElementById("footer");
    let content = "";
    content +='<div id="footer-content" class = "display-flex">'+
                    '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">'+
                        '<div class="footer-logo-wrapper">'+
                            '<a href="https://www.albany.edu/">'+
                                '<img class="footer-logo" src="assets/images/logo.png" />'+
                            '</a>'+
                        '</div>'+
                        '<address>'+
                            '<a href="https://www.google.com/maps/place/1400+Washington+Ave,+Albany,+NY+12222/@42.6859115,-73.8287166,17z/data=!3m1!4b1!4m5!3m4!1s0x89de0b3ce5c93e45:0x4cdbe8d7b52fa412!8m2!3d42.6859115!4d-73.8265279"'+
                            'target="_blank">'+
                            '1400 Washington Avenue <br>'+
                            'Albany, NY 12222'+
                            '</a>'+
                            '<br>Undergraduate Admissions: <a href="tel:5184425435">(518) 442-5435</a>'+
                            '<br>Graduate Admissions: <a href="tel:5184423980">(518) 442-3980</a>'+
                            '<br>Main: <a href="tel:5184423300">(518) 442-3300</a>'+
                        '</address>'+
                    '</div>'+
                    '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">'+
                        '<p class="footer-navigation-header">RESOURCES</p>'+
                        '<ul class="footer-navigation">'+
                            '<li><a href="https://wiki.albany.edu/display/middlestates2020/Middle+States+2020+Home" target="_self" rel="">Accreditation</a></li>'+
                            '<li><a href="http://police.albany.edu/ASR.shtml">Campus Safety Report</a></li>'+
                            '<li><a href="http://www.albany.edu/contact-ualbany">Contact Us</a></li>'+
                            '<li><a href="http://www.albany.edu/main/employment.shtml">Jobs</a></li>'+
                            '<li><a href="http://www.albany.edu/emergency/index.php">UAlbany Alert</a></li>'+
                        '</ul>'+
                    '</div>'+
                    '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">'+
                        '<p class="footer-navigation-header">TOPICS</p>'+
                        '<ul class="footer-navigation">'+
                            '<li><a href="http://www.albany.edu/diversityandinclusion/">Diversity and Inclusion</a></li>'+
                            '<li><a href="http://www.albany.edu/strategicplan/">Strategic Planning &amp; Initiatives</a></li>'+
                            '<li><a href="http://www.albany.edu/gogreen/">Sustainability</a></li>'+
                            '<li><a href="http://www.albany.edu/equity-compliance/">Title IX</a></li>'+
                            '<li><a href="http://www.albany.edu/accessible-web/">Web Accessibility</a></li>'+   
                        '</ul>'+
                    '</div>'+
                '</div>'+
                '<section id="copyright-content">'+
                    '<p>© 2019&nbsp;University at Albany</p>'+
                '</section>';
    footer.innerHTML = content;
}

let getDistinctAttributes = function(objects, attribute){
    let mappedAttributes = objects.map(function(object){
        return object[attribute];
    });
    let distinctAttributes = mappedAttributes.filter(function(v, i, a){
        return a.indexOf(v) === i;
     });

    return distinctAttributes;
}