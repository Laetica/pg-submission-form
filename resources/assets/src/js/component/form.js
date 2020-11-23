var validationFunc = function() {

    var inputs = $('input[type="text"][required], input[type="email"][required]'),
        radios = $('input[type="radio"]'),
        submitButton = $('.button.submit'),
        isInputValid,
        isRadioValid;

    radios.on('click', function() {
        var isChecked = $('input[type="radio"]').is(':checked');

        isChecked ? isRadioValid = true : isRadioValid = false;

        isAllValid();
    });


    inputs.on('input', function() {
        var emptyFields = inputs.filter(function(){
            return !$(this).val();
        }).length;

        emptyFields === 0 ? isInputValid = true : isInputValid = false;

        isAllValid();
    });


    var isAllValid = function() {
        if (!radios.length) {
            if (isInputValid) {
                submitButton.removeAttr('disabled');
            } else {
                submitButton.attr('disabled', 'disabled');
            }
        } else {
            if (isInputValid && isRadioValid) {
                submitButton.removeAttr('disabled');
            } else {
                submitButton.attr('disabled', 'disabled');
            }
        }

    }
};


validationFunc();