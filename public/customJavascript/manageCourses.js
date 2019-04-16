const coursesFormTemplate = `
<div class="container-fluid"> 
<div class="panel">
<div class="panel-head">
<h4>Add New Course</h4>
</div>
        <div class="panel-body">
            <form class="form-vertical" method="post" action="/addCourse" id="coursesForm">
                <div class="form-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Course Name</label>
                                <input type="text" id="course_name" name="course_name" class="form-control"
                                       placeholder="Course Name" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="col-form-label">Semester</label>
                                   <select name="semester" class="form-control" id="semester">
                                       <option value="Fall">Fall</option>
                                       <option value="Spring">Spring</option>
                                       <option value="Winter">Winter</option>
                                       <option value="Summer">Summer</option>
                                    </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="col-form-label">Year</label>
                                <input type="text" id="year" name="year" class="form-control"
                                       placeholder="Year" required>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                    <div class="row">
                        <div class="col-md-6">
                           
                                <button type="submit" id="submitBtnCourse" class="btn btn-primary btn-pill" name="submitBtnCourse"
                                    value="submit">Submit
                                </button>
                            
                        </div>
                        <div class="col-md-6">
                                <button id="cancelBtnCourse" class="btn btn-danger btn-pill" name="cancelBtnCourse" onclick="cancelCoursesForm()">Cancel
                                </button>
                           
                        </div>
                    </div>
                       
                    </div>
                </div>
            </form>
        </div>
 </div>
</div>`

const skillsFormTemplate = `
<div class="container-fluid"> 
<div class="panel">
<div class="panel-head">
<h4>Add New Skill</h4>
</div>
        <div class="panel-body">
            
            <form class="form-vertical" method="post" action="/addSkill" id="skillsForm">
                <div class="form-body">
                    <div class="row">
                        <div class="col-md-12">
                             <div class="form-group">
                                <label class="col-form-label">Course</label>
                                   <select name="courses" class="form-control" id="courses">
                                        {{#courses}}
                                        <option value="{{course_id}}">{{course_name}} ({{semester}} {{year}})</option>
                                        {{/courses}}
                                    </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Skill Name</label>
                                <input type="text" id="skillname" name="skillname" class="form-control"
                                       placeholder="Name" required>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                    <div class="row">
                        <div class="col-md-6">
                           
                                <button type="submit" id="submitBtnSkill" class="btn btn-primary btn-pill" name="submitBtnSkill"
                                    value="submit">Submit
                                </button>
                            
                        </div>
                        <div class="col-md-6">
                                <button id="cancelBtnSkill" class="btn btn-danger btn-pill" name="cancelBtnSkill" onclick="cancelSkillsForm()">Cancel
                                </button>
                           
                        </div>
                    </div>
                       
                    </div>
                </div>
            </form>
        </div>
 </div>
</div>`

const criteriaFormTemplate = `<div class="container-fluid">
    <div class="panel">
        <div class="panel-head">
            <h4>Add New Criteria</h4>
        </div>
        <div class="panel-body">

            <form class="form-vertical" method="post" action="/addCriteria" id="criteriaForm"
                  onsubmit="return validateOnSubmit()">
                <div class="form-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Course</label>
                                <select name="criteria_courses" class="form-control" id="criteria_courses"
                                        onchange="onCriteriaCourseSelection()">
                                    <option disabled selected value></option>
                                    {{#courses}}
                                    <option value="{{course_id}}">{{course_name}} ({{semester}} {{year}})</option>
                                    {{/courses}}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="formCancelButtonArea">
                            <div class="row text-center">
                                <div class="col-md-12">
                                    <button id="cancelBtnCriteria2" class="btn btn-danger btn-pill"
                                            name="cancelBtnCriteria2" onclick="cancelCriteriaForm()">Cancel
                                    </button>

                                </div>
                            </div>
                     </div>
                    
                    <div class="skills_selection" style="display: none;">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-form-label">Skill</label>
                                    <select name="criteria_skills" class="form-control" id="criteria_skills">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row range">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-form-label">How many criteria would you like to enter at
                                        once?</label> <span class="criteriaAmountRangeValue"
                                                            id="criteriaAmountRangeValue">1</span>
                                    <input type="range" name="criteriaAmountRange" min="1" max="10" value="1" step="1"
                                           class="criteriaAmountRange" id="criteriaAmountRange"
                                           onchange="onRangeChange(this)">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-form-label">Evaluation Criteria 1</label>
                                    <input type="text" id="criteria1" name="criteria1" class="form-control"
                                           placeholder="Name" required>
                                </div>
                            </div>
                            <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label>
                                            <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria1" class="custom-control-input"
                                                       name="criteriaType1" value="Essential" checked>
                                                <label for="essentialCriteria1" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria1" name="criteriaType1"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria1" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="row criteria2" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 2</label>
                                        <input type="text" id="criteria2" name="criteria2" class="form-control"
                                               placeholder="Name">
                                        <div class="invalid-feedback">Please enter criteria.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria2" class="custom-control-input"
                                                       name="criteriaType2" value="Essential" checked>
                                                <label for="essentialCriteria2" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria2" name="criteriaType2"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria2" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="row criteria3" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 3</label>
                                        <input type="text" id="criteria3" name="criteria3" class="form-control"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria3" class="custom-control-input"
                                                       name="criteriaType3" value="Essential" checked>
                                                <label for="essentialCriteria3" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria3" name="criteriaType3"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria3" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="row criteria4" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 4</label>
                                        <input type="text" id="criteria4" name="criteria4" class="form-control"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria4" class="custom-control-input"
                                                       name="criteriaType4" value="Essential" checked>
                                                <label for="essentialCriteria4" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria4" name="criteriaType4"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria4" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="row criteria5" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 5</label>
                                        <input type="text" id="criteria5" name="criteria5" class="form-control"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria5" class="custom-control-input"
                                                       name="criteriaType5" value="Essential" checked>
                                                <label for="essentialCriteria5" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria5" name="criteriaType5"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria5" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="row criteria6" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 6</label>
                                        <input type="text" id="criteria6" name="criteria6" class="form-control"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria6" class="custom-control-input"
                                                       name="criteriaType6" value="Essential" checked>
                                                <label for="essentialCriteria6" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria6" name="criteriaType6"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria6" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="row criteria7" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 7</label>
                                        <input type="text" id="criteria7" name="criteria7" class="form-control"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria7" class="custom-control-input"
                                                       name="criteriaType7" value="Essential" checked>
                                                <label for="essentialCriteria7" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria7" name="criteriaType7"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria7" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="row criteria8" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 8</label>
                                        <input type="text" id="criteria8" name="criteria8" class="form-control"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria8" class="custom-control-input"
                                                       name="criteriaType8" value="Essential" checked>
                                                <label for="essentialCriteria8" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria8" name="criteriaType8"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria8" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="row criteria9" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 9</label>
                                        <input type="text" id="criteria9" name="criteria9" class="form-control"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria9" class="custom-control-input"
                                                       name="criteriaType9" value="Essential" checked>
                                                <label for="essentialCriteria9" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria9" name="criteriaType9"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria9" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="row criteria10" style="display:none;">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Evaluation Criteria 10</label>
                                        <input type="text" id="criteria10" name="criteria10"
                                               class="form-control criteria10"
                                               placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-form-label">Type of Criteria:</label><br>
                                        <div class="text-center">
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="essentialCriteria10" class="custom-control-input"
                                                       name="criteriaType10" value="Essential" checked>
                                                <label for="essentialCriteria10" class="custom-control-label">Essential
                                                    for Pass/Fail</label>
                                            </div>
                                        
                                            <div class="custom-control custom-radio custom-radio-1">
                                                <input type="radio" id="extraCriteria10" name="criteriaType10"
                                                       value="Extra" class="custom-control-input">
                                                <label for="extraCriteria10" class="custom-control-label">Additional/Non-essential
                                                    for Pass/Fail</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <br>
                            <div class="text-center">
                                <div class="row">
                                    <div class="col-md-6">

                                        <button type="submit" id="submitBtnCriteria" class="btn btn-primary btn-pill"
                                                name="submitBtnCriteria"
                                                value="submit">Submit
                                        </button>

                                    </div>
                                    <div class="col-md-6">
                                        <button id="cancelBtnCriteria1" class="btn btn-danger btn-pill"
                                                name="cancelBtnCriteria1" onclick="cancelCriteriaForm()">Cancel
                                        </button>

                                    </div>
                                </div>

                            </div>
                        
                    </div>
            </form>
        </div>
    </div>
</div>`

function addCourse() {
    $('#add-skills-form').html('')
    $('#add-criteria-form').html('')
    let compliedTemplate = Handlebars.compile(coursesFormTemplate);
    let generatedHTMLContent = compliedTemplate({});
    $('#add-course-form').html(generatedHTMLContent);
}

async function addSkill() {

    let dataCourses = await fetch('users/api/courses', {credentials: 'include'});
    let courses = await dataCourses.json();

    $('#add-course-form').html('');
    $('#add-criteria-form').html('');

    let compliedTemplate = Handlebars.compile(skillsFormTemplate);
    let generatedHTMLContent = compliedTemplate({courses});
    $('#add-skills-form').html(generatedHTMLContent);
}

async function addCriteria() {
    $('#add-course-form').html('')
    $('#add-skills-form').html('')

    let dataCourses = await fetch('users/api/courses', {credentials: 'include'});
    let courses = await dataCourses.json();


    let compliedTemplate = Handlebars.compile(criteriaFormTemplate);
    let generatedHTMLContent = compliedTemplate({courses});
    $('#add-criteria-form').html(generatedHTMLContent);
}

async function onCriteriaCourseSelection() {

    let course_dropdown = document.getElementById('criteria_courses');
    let course_id = course_dropdown.options[course_dropdown.selectedIndex].value;
    console.log(course_id);

    let dataSkills = await fetch(`users/api/course/${course_id}/skills`, {credentials: 'include'});
    let skills = await dataSkills.json();
    console.log(skills);
    let options = '';
    for (let i = 0; i < skills.length; i++) {
        options += "<option value='" + skills[i].skill_id + "'>" + skills[i].skill_name + "</option>";
    }
    console.log(options);
    let skill_dropdown = document.getElementById('criteria_skills');
    skill_dropdown.innerHTML = options;
    if (options.length > 0) {
        $('.skills_selection').show();
        $('.formCancelButtonArea').hide();
    } else {
        $('.skills_selection').hide();
        $('.formCancelButtonArea').show();
    }


}

function cancelCoursesForm() {
    $('#add-course-form').html('');
    document.getElementById('courses-form').reset();
}

function cancelSkillsForm() {
    $('#add-skills-form').html('');
    document.getElementById('skills-form').reset();
}

function cancelCriteriaForm() {
    $('#add-criteria-form').html('')
    document.getElementById('criteria-form').reset();
}

function toggleSkills() {
    $('.skillCategory').fadeToggle('fast');
}

function onRangeChange(elem) {
    //change value
    let rangeValueSpan = document.getElementById('criteriaAmountRangeValue');
    rangeValueSpan.textContent = elem.value;
    //hide text boxes based on value
    if (elem.value === '1') {
        $('.criteria2').hide();
        $('.criteria3').hide();
        $('.criteria4').hide();
        $('.criteria5').hide();
        $('.criteria6').hide();
        $('.criteria7').hide();
        $('.criteria8').hide();
        $('.criteria9').hide();
        $('.criteria10').hide();

    } else if (elem.value === '2') {
        $('.criteria2').show();
        $('.criteria3').hide();
        $('.criteria4').hide();
        $('.criteria5').hide();
        $('.criteria6').hide();
        $('.criteria8').hide();
        $('.criteria7').hide();
        $('.criteria9').hide();
        $('.criteria10').hide();
    } else if (elem.value === '3') {
        $('.criteria2').show();
        $('.criteria3').show();
        $('.criteria4').hide();
        $('.criteria5').hide();
        $('.criteria6').hide();
        $('.criteria7').hide();
        $('.criteria8').hide();
        $('.criteria9').hide();
        $('.criteria10').hide();
    } else if (elem.value === '4') {
        $('.criteria2').show();
        $('.criteria3').show();
        $('.criteria4').show();
        $('.criteria5').hide();
        $('.criteria6').hide();
        $('.criteria7').hide();
        $('.criteria8').hide();
        $('.criteria9').hide();
        $('.criteria10').hide();
    } else if (elem.value === '5') {
        $('.criteria2').show();
        $('.criteria3').show();
        $('.criteria4').show();
        $('.criteria5').show();
        $('.criteria6').hide();
        $('.criteria7').hide();
        $('.criteria8').hide();
        $('.criteria9').hide();
        $('.criteria10').hide();
    } else if (elem.value === '6') {
        $('.criteria2').show();
        $('.criteria3').show();
        $('.criteria4').show();
        $('.criteria5').show();
        $('.criteria6').show();
        $('.criteria7').hide();
        $('.criteria8').hide();
        $('.criteria9').hide();
        $('.criteria10').hide();
    } else if (elem.value === '7') {
        $('.criteria2').show();
        $('.criteria3').show();
        $('.criteria4').show();
        $('.criteria5').show();
        $('.criteria6').show();
        $('.criteria7').show();
        $('.criteria8').hide();
        $('.criteria9').hide();
        $('.criteria10').hide();
    } else if (elem.value === '8') {
        $('.criteria2').show();
        $('.criteria3').show();
        $('.criteria4').show();
        $('.criteria5').show();
        $('.criteria6').show();
        $('.criteria7').show();
        $('.criteria8').show();
        $('.criteria9').hide();
        $('.criteria10').hide();
    } else if (elem.value === '9') {
        $('.criteria2').show();
        $('.criteria3').show();
        $('.criteria4').show();
        $('.criteria5').show();
        $('.criteria6').show();
        $('.criteria7').show();
        $('.criteria8').show();
        $('.criteria9').show();
        $('.criteria10').hide();
    } else if (elem.value === '10') {
        $('.criteria2').show();
        $('.criteria3').show();
        $('.criteria4').show();
        $('.criteria5').show();
        $('.criteria6').show();
        $('.criteria7').show();
        $('.criteria8').show();
        $('.criteria9').show();
        $('.criteria10').show();
    }

}

function validateOnSubmit(){
    let rangeSliderValue = document.getElementById('criteriaAmountRange').value;

    let fieldValue2=document.getElementById('criteria2').value;
    let fieldValue3=document.getElementById('criteria3').value;
    let fieldValue4=document.getElementById('criteria4').value;
    let fieldValue5=document.getElementById('criteria5').value;
    let fieldValue6=document.getElementById('criteria6').value;
    let fieldValue7=document.getElementById('criteria7').value;
    let fieldValue8=document.getElementById('criteria8').value;
    let fieldValue9=document.getElementById('criteria9').value;
    let fieldValue10=document.getElementById('criteria10').value;

     if (rangeSliderValue === '2') {
         if(fieldValue2==null ||fieldValue2==="") {
            alert('Please Enter Missing Criteria');
             return false;
         }
    } else if (rangeSliderValue === '3') {
         if(fieldValue2==null ||fieldValue2==="" || fieldValue3==null ||fieldValue3==="") {
             alert('Please Enter Missing Criteria');
             return false;
         }
    } else if (rangeSliderValue=== '4') {
         if(fieldValue2==null ||fieldValue2==="" || fieldValue3==null ||fieldValue3===""|| fieldValue4==null ||fieldValue4==="") {
             alert('Please Enter Missing Criteria');
             return false;
         }
    } else if (rangeSliderValue === '5') {
         if(fieldValue2==null ||fieldValue2==="" || fieldValue3==null ||fieldValue3===""
             || fieldValue4==null ||fieldValue4===""|| fieldValue5==null ||fieldValue5==="") {
             alert('Please Enter Missing Criteria');
             return false;
         }
    } else if (rangeSliderValue === '6') {

         if(fieldValue2==null ||fieldValue2==="" || fieldValue3==null ||fieldValue3===""
             || fieldValue4==null ||fieldValue4===""|| fieldValue5==null ||fieldValue5===""
             || fieldValue6==null ||fieldValue6==="") {
             alert('Please Enter Missing Criteria');
             return false;
         }
    } else if (rangeSliderValue === '7') {
         if(fieldValue2==null ||fieldValue2==="" || fieldValue3==null ||fieldValue3===""
             || fieldValue4==null ||fieldValue4===""|| fieldValue5==null ||fieldValue5===""
             || fieldValue6==null ||fieldValue6===""|| fieldValue7==null ||fieldValue7==="") {
             alert('Please Enter Missing Criteria');
             return false;
         }
    } else if (rangeSliderValue === '8') {
         if(fieldValue2==null ||fieldValue2==="" || fieldValue3==null ||fieldValue3===""
             || fieldValue4==null ||fieldValue4===""|| fieldValue5==null ||fieldValue5===""
             || fieldValue6==null ||fieldValue6===""|| fieldValue7==null ||fieldValue7===""
             || fieldValue8==null ||fieldValue8==="") {
             alert('Please Enter Missing Criteria');
             return false;
         }
    } else if (rangeSliderValue === '9') {
         if(fieldValue2==null ||fieldValue2==="" || fieldValue3==null ||fieldValue3===""
             || fieldValue4==null ||fieldValue4===""|| fieldValue5==null ||fieldValue5===""
             || fieldValue6==null ||fieldValue6===""|| fieldValue7==null ||fieldValue7===""
             || fieldValue8==null ||fieldValue8===""|| fieldValue9==null ||fieldValue9==="") {
             alert('Please Enter Missing Criteria');
             return false;
         }
    } else if (rangeSliderValue === '10') {
         if(fieldValue2==null ||fieldValue2==="" || fieldValue3==null ||fieldValue3===""
             || fieldValue4==null ||fieldValue4===""|| fieldValue5==null ||fieldValue5===""
             || fieldValue6==null ||fieldValue6===""|| fieldValue7==null ||fieldValue7===""
             || fieldValue8==null ||fieldValue8===""|| fieldValue9==null ||fieldValue9===""
             || fieldValue10==null ||fieldValue10==="") {
             alert('Please Enter Missing Criteria');
             return false;
         }
    }
}
