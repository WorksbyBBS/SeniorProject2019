const assignCourseFormTemplate = `
<div class="container"> 
<div class="panel">
<div class="panel-head">
<h4>Assign Instructor and Students to a Course</h4>
</div>
        <div class="panel-body">
            <form class="form-vertical" method="post" action="/assign-course" id="assignCoursesForm" onsubmit="return validateOnSubmit()">
                <div class="form-body">
                     <div class="row">
                        <div class="col-md-12">
                             <div class="form-group">
                                <label class="col-form-label">Course</label>
                                   <select name="schedule_courses" class="form-control" id="schedule_courses" onchange="checkIfTrainer()">
                                   <option disabled selected value></option>
                                        {{#courses}}
                                        <option value="{{course_id}}">{{course_name}} ({{semester}} {{year}})</option>
                                        {{/courses}}
                                    </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row text-center">
                    <div class="col-md-12">
                    <span class="text-danger" id="invalid-course" style="display: none">Please choose a course first!</span>   
                    </div>
                    </div>
                    
                    
                     <div class="row text-center">
                    <div class="col-md-12">
                    <span class="text-danger" id="invalid-trainer" style="display: none">Please choose a trainer from the list</span>
                    </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12">
                             <div class="form-group">
                              

                             <input type="hidden" name="ctt_trainer_id" id="ctt_trainer_id">
                                <label class="col-form-label">Trainer</label>
                                
                                   <select name="trainers" class="form-control" id="trainers" onchange="onTrainerChange()">
                                        <option disabled selected value class="trainer-first-option"></option>
                                        {{#trainers}}
                                        <option value="{{trainer_id}}">{{first_name}} {{last_name}}</option>
                                        {{/trainers}}
                                    </select>
                            </div>
                        </div>
                    </div>
                    <div class="row text-center">
                    <div class="col-md-12">
                    <span class="text-danger" id="invalid-student" style="display: none">Cannot Add one or more selected students because they are already enrolled. Please check class enrollment again before adding</span>
                     <span class="text-danger" id="invalid-student-empty" style="display: none">Please select at least one student!</span>
     
                    </div>
                    </div>
                    <div class="row">
                        <div class="col-md-5">
                          <div class="form-group trainees_form_group">
                                <label class="col-form-label">All Trainees</label>
                                   <select multiple='multiple' name="all_trainees" class="form-control" id="all_trainees">
                                        {{#trainees}}
                                        <option value="{{trainee_id}}">{{trainee_id}} - {{first_name}} {{last_name}}</option>
                                        {{/trainees}}
                                    </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="container justify-content-center align-items-center align-content-center" id="buttonsDiv">
                                <div class="row text-center">
                                    <div class="col-sm-12">
                                     <button type="button" class="btn btn-pill btn-success btn-sm" onclick="moveTraineeToSelected()"><li class="fa fa-arrow-right"></li></button>
                                    </div>
                                </div>
                                <br>
                                <div class="row text-center">
                                    <div class="col-sm-12">
                                        <button type="button" class="btn btn-pill btn-warning btn-sm" onclick="cancelTraineeFromSelected()"><li class="fa fa-arrow-left"></li></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                             <div class="form-group trainees_form_group">
                                <label class="col-form-label">Selected Trainees</label>
                                   <select multiple='multiple' name="selected_trainees" class="form-control" id="selected_trainees">
                                    </select>
                                    <input type="hidden" name="selectedTraineesArray" id="selectedTraineesArray">
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
                                <button id="cancelBtnCourse" class="btn btn-danger btn-pill" name="cancelBtnCourse" onclick="cancelAssignCourse()">Cancel
                                </button>
                           
                        </div>
                    </div>
                       
                    </div>
                </div>
            </form>
        </div>
 </div>
</div>`;

async function assignCourse() {
    // $('#assign-trainee-course-schedule').html('');
    let dataCourses = await fetch('users/api/courses', {credentials: 'include'});
    let courses = await dataCourses.json();

    let dataTrainers = await fetch('users/api/trainers', {credentials: 'include'});
    let trainers = await dataTrainers.json();

    let dataTrainees = await fetch('users/api/trainees', {credentials: 'include'});
    let trainees = await dataTrainees.json();

    let compliedTemplate = Handlebars.compile(assignCourseFormTemplate);
    let generatedHTMLContent = compliedTemplate({courses, trainers, trainees});
    $('#assign-course-schedule').html(generatedHTMLContent);
}

async function assignTraineeCourse() {
    $('#assign-instructor-course-schedule').html('');

    let dataCourses = await fetch('users/api/courses', {credentials: 'include'});
    let courses = await dataCourses.json();

    let dataTrainees = await fetch('users/api/trainees', {credentials: 'include'});
    let trainees = await dataTrainees.json();

    let compliedTemplate = Handlebars.compile(assignTraineeCourseFormTemplate);
    let generatedHTMLContent = compliedTemplate({courses, trainees});
    $('#assign-trainee-course-schedule').html(generatedHTMLContent);
}

function cancelAssignCourse() {
    $('#assign-course-schedule').html('');
    document.getElementById('assignCoursesForm').reset();
}

async function moveTraineeToSelected() {
    $('#invalid-student').hide();
    $('#invalid-student-empty').hide();
    let value = $('#schedule_courses option:selected').val();
    if (value === '') {
        $('#invalid-course').show();
    } else {
        $('#invalid-course').hide();
        let dataCTT = await fetch('users/api/ctt', {credentials: 'include'});
        let ctt = await dataCTT.json();
        let selectedTrainees = [];
        $('#all_trainees option:selected').each(function () {
            selectedTrainees.push($(this).val());
        });

        for (let i = 0; i < selectedTrainees.length; i++) {
            let found = ctt.some(item => (item.course_id === parseInt(value) && item.trainee_id === parseInt(selectedTrainees[i])));
            if (found) {

                $("#all_trainees option[value='" + parseInt(selectedTrainees[i]) + "']").removeAttr('selected');
                $('#invalid-student').show();
            }
        }


        return !$('#all_trainees option:selected').remove().appendTo('#selected_trainees');
    }

}

function cancelTraineeFromSelected() {
    $('#invalid-student').hide();
    return !$('#selected_trainees option:selected').remove().appendTo('#all_trainees');
}

function validateOnSubmit() {

    let selectedTrainees = [];
    $('#selected_trainees option').each(function () {
        selectedTrainees.push($(this).val());
    });

    $('#selectedTraineesArray').val(selectedTrainees);

    let courseValue = $('#schedule_courses option:selected').val();
    let trainerValue = $('#trainers option:selected').val();
    //console.log(courseValue);

    let submitStudentOkay=false;
    let submitCourseOkay=false;
    let submitTrainerOkay=false;
    if (selectedTrainees.length === 0) {
        $('#invalid-student-empty').show();
        submitStudentOkay = false;
    } else {
        submitStudentOkay = true;
    }

    if (courseValue === '') {
        $('#invalid-course').show();
        submitCourseOkay = false;
    } else {
        submitCourseOkay = true;
    }

    if (trainerValue === '') {
        $('#invalid-trainer').show();
        submitTrainerOkay = false;
    } else {
        submitTrainerOkay = true;
    }

    if(submitCourseOkay && submitStudentOkay && submitTrainerOkay) {
        $('#invalid-student-empty').hide();
        $('#invalid-trainer').hide();
        $('#invalid-course').hide();
        return true;
    } else {
        return false;
    }
}

async function checkIfTrainer() {
    let value = $('#schedule_courses option:selected').val();
    $('#invalid-course').hide();
    $('#invalid-student').hide();
    let dataCTT = await fetch('users/api/ctt', {credentials: 'include'});
    let ctt = await dataCTT.json();

    const found = ctt.some(item => item.course_id === parseInt(value));
    //if this course already has trainers and students and exists in CTT
    if (found) {
        const ctt_found = ctt.find(function (element) {
            return element.course_id === parseInt(value);
        });

        console.log(ctt_found);


        $("#ctt_trainer_id").val(ctt_found.trainer_id).change();

        $(document).ready(function () {
            $("#trainers option[value='" + ctt_found.trainer_id + "']").prop('selected', true);
            // you need to specify id of combo to set right combo, if more than one combo
        });

        $("#trainers option[value='" + ctt_found.trainer_id + "']").attr('disabled', true).siblings().attr('disabled', true);
    } else {
        $("#trainers option").siblings(':not(.trainer-first-option)').attr('disabled', true).removeAttr('disabled');
    }
}

function onTrainerChange() {
    let value = $('#trainers option:selected').val();
    $('#invalid-trainer').hide();
    //console.log(value);
    if (value === '') {
        alert('Please choose a valid Trainer, not an empty option')
    }
    $("#ctt_trainer_id").val(value).change();
}