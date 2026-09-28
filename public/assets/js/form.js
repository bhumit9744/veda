$(document).ready(function () {

    /**
     * Initialize all forms with validation and AJAX submission
     * @param {string} formSelector - Selector for forms (e.g., '.ajaxForm')
     */
    function initForms(formSelector) {
        $(formSelector).each(function () {
            const $form = $(this);
            const $btn = $form.find('button[type="submit"], input[type="submit"]').first();

            $form.validate({
                rules: {
                    name: { required: true, minlength: 4 },
                    email: { required: true, email: true },
                    mobile: { required: true, minlength: 10, maxlength: 10 },
                    checkbox: { required: true }
                },
                errorElement: "span",
                errorClass: "error text-danger",
                messages: {
                    name: { minlength: "Name must be at least 4 characters" },
                    email: { email: "Please enter a valid email address" },
                    mobile: {
                        minlength: "Please enter a valid 10-digit mobile number",
                        maxlength: "Please enter a valid 10-digit mobile number"
                    },
                    checkbox: { required: "Accept this term" },
                },
                submitHandler: function () {
                    // Prevent multiple clicks
                    if ($btn.data('submitting')) return;
                    submitForm($form, $btn);
                }
            });
        });
    }

    /**
     * Submit form via AJAX
     * @param {jQuery} $form
     * @param {jQuery} $btn
     */
    function submitForm($form, $btn) {
        const data = $form.serialize();
        const originalText = $btn.html();

        setButtonLoading($btn, true);

// 🔥 Force UI update before AJAX
setTimeout(() => {

    $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: data,
        dataType: 'json',
        success: function (response) {
            setButtonLoading($btn, false, originalText);

            if (!response || !response.status) {
                showAlert('error', 'Unexpected response from server.');
                return;
            }

            if (response.status === 'error') {
                showAlert('error', response.message || 'Something went wrong.');
            } else if (response.status === 'success') {
                $form[0].reset();

                if(response.source != 'Contact Form'){
                    hideModal($form);
                }

                showAlert('success', response.message, 2000);

                setTimeout(() => {
                    window.location.replace('thank-you.php');
                }, 2000);
            } else {
                showAlert('error', response.message || 'Unexpected response from server.');
            }
        },
        error: function () {
            setButtonLoading($btn, false, originalText);
            showAlert('error', 'Network or server error. Please try again.');
        }
    });

}, 100); // 👈 small delay (important)
    }

    /**
     * Set button loading/reset state
     * @param {jQuery} $btn
     * @param {boolean} isLoading
     * @param {string} originalText
     */
    function setButtonLoading($btn, isLoading, originalText = 'Submit') {
    if (isLoading) {
        $btn.data('submitting', true)
            .prop('disabled', true)
            .css({
                'cursor': 'not-allowed',
                'opacity': '0.7'
            })
            .html('<span class="spinner-border spinner-border-sm me-2"></span> Processing...');
    } else {
        $btn.data('submitting', false)
            .prop('disabled', false)
            .css({
                'cursor': 'pointer',
                'opacity': '1'
            })
            .html(originalText);
    }
}

    /**
     * Show SweetAlert message
     * @param {string} type - 'success' or 'error'
     * @param {string} message
     * @param {boolean} showConfirmButton
     * @param {number|null} timer
     */
    function showAlertss(type, message, showConfirmButton = true, timer = null) {
        Swal.fire({
            icon: type,
            title: type === 'success' ? 'Success' : 'Error',
            html: message,
            showConfirmButton: showConfirmButton,
            timer: timer
        });
    }

    function showAlert(type, message, duration = 3000) {
    Swal.fire({
        toast: true,               // Enable toast mode
        position: 'center',      // Position of the toast
        icon: type,                // 'success', 'error', 'warning', 'info'
        title: message,            // Message to show
        showConfirmButton: false,  // No confirm button
        timer: duration,           // Auto close after milliseconds
        timerProgressBar: true,    // Show progress bar
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer); // Pause on hover
            toast.addEventListener('mouseleave', Swal.resumeTimer); // Resume on leave
        }
    });
}


    /**
     * Hide the modal that contains the form
     * @param {jQuery} $form
     */
    function hideModal($form) {
        const $modal = $form.closest('.modal');
        if ($modal.length) $modal.modal('hide');
    }

    /**
     * Optional: Cookie setter (used if needed)
     */
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }

    // Initialize all forms with class 'ajaxForm'
    initForms('.ajaxForm');

});