$(document).ready(function() {
    /* parallax code from https://stackoverflow.com/questions/46046201/how-do-i-create-a-parallax-effect-without-using-a-background-image/46158996 */
    // parallax image effect
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        $('.parallax-div').each(function(index, elem) {
            var $elem = $(elem);
            var $img_elem = $elem.find('img');
            // change these settings to make image move faster or slower
            if ($img_elem.hasClass('parallax-1')) {
                $img_elem.css('top', (0-(scrollTop - $elem.offset().top))*.2);
            } else if ($img_elem.hasClass('parallax-2')) {
                $img_elem.css('top', (0-(scrollTop - $elem.offset().top))*.4);
            } else if ($img_elem.hasClass('parallax-3')) {
                $img_elem.css('top', (0-(scrollTop - $elem.offset().top))*.65);
            }
        });
    });
    // load timeline
    loadTimeline()
});
// initial timeline sort vars
var newest = true;
var project_sort = null;
// triggered on change in date sort
$(".date-sort .btn-sort").click(function() {
    // calls updateOrder func
    updateOrder($(this).data('newest'));
    // removes active class from all buttons
    $(".date-sort .btn-sort").removeClass('active');
    // makes button active and changes button css
    $(this).addClass('active');
})
// triggered on change in type sort
$(".type-sort .btn-sort").click(function() {
    // calls updateType func
    updateType($(this).data('type'));
    // removes active class from all buttons
    $(".type-sort .btn-sort").removeClass('active');
    // makes button active and changes button css
    $(this).addClass('active');
})
// update newest var to true or false based on order param and reload timeline
function updateOrder(order) {
    newest = order;
    loadTimeline();
}
// update project_sort var to a new string or null based on order param and reload timeline
function updateType(type) {
    project_sort = type;
    loadTimeline();
}
// load object and make timeline
function loadTimeline() {
    // clear timeline space
    $(".timeline").html('');
    // counter for checking if content should be on the right or left
    var counter = 0;
    // reverses the object keys if newest is needed first
    if (newest) {
        dates = Object.keys(projects).reverse();
    } else {
        dates = Object.keys(projects);
    }
    // loops through years
    dates.forEach(function(date_key) {
        year_parallax = '';
        // tracks if there are any projects based on the sort; if this var remains false the year will not be added to the timeline
        addYear = false;
        // checks if the particular year has a parallax effect (it must for proper timeline creation)
        if (projects[date_key].hasOwnProperty('parallax')) {
            // assign year section to var
            year_parallax = `
            <div class="date">
                <div class="date-container">
                    <h3>${date_key}</h3>
                </div>
                <div class="parallax-div">
                    <img style="${projects[date_key]['parallax']['image-style']}" class="${projects[date_key]['parallax']['parallax']}" src="${projects[date_key]['parallax']['image']}" />
                </div>
            </div>
            `
        }
        // check if the particular year has months specified (it must for proper timeline creation)
        if (projects[date_key].hasOwnProperty('months')) {
            // reverses months if latest is needed first
            if (newest) {
                months = Object.keys(projects[date_key]['months']).reverse();
            } else {
                months = Object.keys(projects[date_key]['months']);
            }
            // loops through months
            months.forEach(function(month_key) {
                // checks if month has parallax effect (it must for proper timeline creation)
                if (projects[date_key]['months'][month_key].hasOwnProperty('parallax')) {
                    month_parallax = '';
                    // assigns month section to var
                    month_parallax = `
                    <div class="date">
                        <div class="date-container">
                            <h4>${month_key}</h4>
                        </div>
                        <div class="parallax-div">
                            <img style="${projects[date_key]['months'][month_key]['parallax']['image-style']}" class="${projects[date_key]['months'][month_key]['parallax']['parallax']}" src="${projects[date_key]['months'][month_key]['parallax']['image']}" />
                        </div>
                    </div>
                    `;      
                }
                // checks if month has projects specified (it must for proper timeline creation)
                if (projects[date_key]['months'][month_key].hasOwnProperty('projects')) {
                    // reverses project order if latest is needed first
                    if (newest) {
                        projects_key = Object.keys(projects[date_key]['months'][month_key]['projects']).reverse();
                    } else {
                        projects_key = Object.keys(projects[date_key]['months'][month_key]['projects']);
                    }
                    project_item_parallax = '';
                    // loops through projects
                    projects_key.forEach(function(project_item) {
                        // gets project item from array
                        project_item = projects[date_key]['months'][month_key]['projects'][project_item];
                        // checks if project type matches specified project sort
                        if (project_sort == null || project_item['type'] == project_sort) {
                            // adds projects to var if they match
                            project_item_parallax += `
                            <div class="timeline-container">
                                <a target="_blank" href="${project_item['link']}">
                                    <div class="timeline-project">
                                        <div class="timeline-item ${counter % 2 == 0 ? 'left': 'right'}">
                                            <div class="timeline-content">
                                                <h2>${project_item['title']}</h2>
                                                <p>${project_item['description']}</p>
                                            </div>
                                        </div>
                                        <div class="timeline-image">
                                            <img class="card-image-top img-thumbnail" src="${project_item['image']}" alt=""> 
                                        </div>   
                                    </div>
                                </a>
                                <div class="parallax-div">
                                    <img style="${project_item['parallax']['image-style']}" class="${project_item['parallax']['parallax']}" src="${project_item['parallax']['image']}" />
                                </div>
                            </div>
                            `;
                            // increases counter that tracks whether content is on the left or right
                            counter++;
                        }
                    });
                    // adds the year, month, and projects to the timeline if there are any projects - if not the year, month, and projects will be skipped
                    if (project_item_parallax !== '') {
                        year_parallax += month_parallax;
                        year_parallax += project_item_parallax;
                        addYear = true
                    }   
                }  
            });
        }
        // actually appends the year, month, and projects to the timeline
        if (addYear) {
            $(".timeline").append(year_parallax);
        }
    });
}